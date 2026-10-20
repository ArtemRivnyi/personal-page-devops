// Case Study Interactive Navigation & Scroll Restoration
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Back Navigation (returns to exact prior scroll position in history)
    const backBtn = document.querySelector('.back-link');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
        });
    }

    // 2. Case Study Reading Position Preservation
    const pageKey = 'cs_scroll_' + window.location.pathname.split('/').pop();

    // Save scroll on unload / link clicks
    const saveReadingPos = () => {
        try {
            sessionStorage.setItem(pageKey, String(window.scrollY));
        } catch {
            // ignore
        }
    };

    window.addEventListener('beforeunload', saveReadingPos);
    document.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', saveReadingPos);
    });

    // Restore position if returning to this article
    try {
        const savedPos = sessionStorage.getItem(pageKey);
        if (savedPos !== null && !isNaN(Number(savedPos)) && Number(savedPos) > 60 && !window.location.hash) {
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: Number(savedPos),
                    behavior: 'instant'
                });
            });
        }
    } catch {
        // ignore
    }
});
