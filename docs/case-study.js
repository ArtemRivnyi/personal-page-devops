// Case Study Interactive Navigation, Smart Dock & Top Scroll Handling
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Back Navigation (returns to exact prior scroll position in history)
    const handleBackNavigation = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
            window.history.back();
        } else {
            window.location.href = '../index.html#case-study';
        }
    };

    document.querySelectorAll('.back-link, .bottom-back-link, .cs-back-trigger').forEach((btn) => {
        btn.addEventListener('click', handleBackNavigation);
    });

    // 2. Smooth Back to Top
    const handleScrollToTop = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('.back-to-top-text-btn, .cs-top-trigger').forEach((btn) => {
        btn.addEventListener('click', handleScrollToTop);
    });

    // 3. Floating Quick-Exit & Top Dock with Smart Footer Hiding
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
        floatingTopBtn.addEventListener('click', handleScrollToTop);
    }

    const footerElement = document.querySelector('.case-study-footer-actions') || document.querySelector('.author-card');
    let isFooterVisible = false;

    const updateFloatingDock = () => {
        if (window.scrollY > 280 && !isFooterVisible) {
            floatingDock.classList.add('visible');
        } else {
            floatingDock.classList.remove('visible');
        }
    };

    if (footerElement && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                isFooterVisible = entry.isIntersecting;
                updateFloatingDock();
            });
        }, { threshold: 0.1 });
        observer.observe(footerElement);
    }

    window.addEventListener('scroll', updateFloatingDock, { passive: true });
    updateFloatingDock();

    // 4. Ensure fresh case study articles always start from the top
    try {
        // Clear any old/stale case study scroll keys from previous sessions
        Object.keys(sessionStorage).forEach((key) => {
            if (key.startsWith('cs_scroll_')) {
                sessionStorage.removeItem(key);
            }
        });
    } catch {
        // ignore
    }

    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});
