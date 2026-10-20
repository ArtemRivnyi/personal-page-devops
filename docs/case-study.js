// Case Study Interactive Navigation & Scroll Restoration
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Back Navigation (returns to exact prior scroll position in history)
    const handleBackNavigation = (e) => {
        if (window.history.length > 1) {
            e.preventDefault();
            window.history.back();
        }
    };

    document.querySelectorAll('.back-link, .bottom-back-link').forEach((btn) => {
        btn.addEventListener('click', handleBackNavigation);
    });

    // 2. Back to Top text buttons
    document.querySelectorAll('.back-to-top-text-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // 3. Floating Quick-Exit & Top Dock
    let floatingDock = document.querySelector('.floating-case-dock');
    if (!floatingDock) {
        floatingDock = document.createElement('nav');
        floatingDock.className = 'floating-case-dock';
        floatingDock.setAttribute('aria-label', 'Floating quick navigation');
        floatingDock.innerHTML = `
            <button type="button" class="floating-case-btn floating-case-back" aria-label="Back to Portfolio" title="Back to Portfolio">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
            </button>
            <div class="floating-case-divider" aria-hidden="true"></div>
            <button type="button" class="floating-case-btn floating-case-top" aria-label="Scroll to top" title="Scroll to top">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                <span>Top</span>
            </button>
        `;
        document.body.appendChild(floatingDock);
    }

    const floatingBackBtn = floatingDock.querySelector('.floating-case-back');
    if (floatingBackBtn) {
        floatingBackBtn.addEventListener('click', handleBackNavigation);
    }

    const floatingTopBtn = floatingDock.querySelector('.floating-case-top');
    if (floatingTopBtn) {
        floatingTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const updateFloatingDock = () => {
        if (window.scrollY > 280) {
            floatingDock.classList.add('visible');
        } else {
            floatingDock.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', updateFloatingDock, { passive: true });
    updateFloatingDock();

    // 4. Case Study Reading Position Preservation
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
