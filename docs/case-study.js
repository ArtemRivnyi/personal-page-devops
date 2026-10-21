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

    // 5. Code Window Interactive Clipboard Copy
    document.querySelectorAll('.code-copy-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const codeWindow = btn.closest('.code-window');
            if (!codeWindow) return;
            const codeEl = codeWindow.querySelector('pre code') || codeWindow.querySelector('pre');
            if (!codeEl) return;

            const textToCopy = codeEl.innerText || codeEl.textContent;
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const textarea = document.createElement('textarea');
                    textarea.value = textToCopy;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }

                btn.classList.add('copied');
                const copyText = btn.querySelector('.copy-text');
                const origText = copyText ? copyText.textContent : 'Copy';
                if (copyText) copyText.textContent = 'Copied!';

                setTimeout(() => {
                    btn.classList.remove('copied');
                    if (copyText) copyText.textContent = origText;
                }, 2000);
            } catch (err) {
                // Clipboard copy failed silently
            }
        });
    });

    // 6. Interactive Architecture Flow Simulation Engine
    const isDualLLM = window.location.pathname.includes('dual-llm');

    document.querySelectorAll('.arch-flow-card').forEach((card) => {
        const header = card.querySelector('.arch-flow-header');
        if (!header) return;

        let playBtn = card.querySelector('.arch-flow-play-btn');
        if (!playBtn) {
            let actionsWrap = header.querySelector('.arch-flow-header-actions');
            if (!actionsWrap) {
                actionsWrap = document.createElement('div');
                actionsWrap.className = 'arch-flow-header-actions';
                const statusPill = header.querySelector('.arch-flow-status');
                if (statusPill) {
                    statusPill.parentNode.insertBefore(actionsWrap, statusPill);
                    actionsWrap.appendChild(statusPill);
                } else {
                    header.appendChild(actionsWrap);
                }
            }

            playBtn = document.createElement('button');
            playBtn.type = 'button';
            playBtn.className = 'arch-flow-play-btn';
            playBtn.setAttribute('aria-label', 'Simulate Live Request Flow');
            playBtn.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Simulate Live Flow</span>
            `;
            actionsWrap.insertBefore(playBtn, actionsWrap.firstChild);
        }

        let isRunning = false;

        const clearSimulationStates = () => {
            card.querySelectorAll('.sim-active, .sim-fail, .sim-success').forEach((el) => {
                el.classList.remove('sim-active', 'sim-fail', 'sim-success');
            });
            card.querySelectorAll('.sim-packet-badge').forEach((badge) => badge.remove());
        };

        const createBadge = (text, type = 'info') => {
            const badge = document.createElement('span');
            badge.className = `sim-packet-badge ${type}`;
            badge.textContent = text;
            return badge;
        };

        playBtn.addEventListener('click', () => {
            if (isRunning) return;
            isRunning = true;
            clearSimulationStates();

            playBtn.classList.add('simulating');
            const playText = playBtn.querySelector('span');
            if (playText) playText.textContent = 'Simulating...';

            const nodes = card.querySelectorAll('.arch-node');
            const branchPrimary = card.querySelector('.arch-branch-card.primary');
            const branchFallback = card.querySelector('.arch-branch-card.fallback');

            // Timeline Steps
            // Step 1: Ingress
            setTimeout(() => {
                if (nodes[0]) {
                    nodes[0].classList.add('sim-active');
                    nodes[0].appendChild(createBadge('Step 1: Request Ingress (200 OK)'));
                }
            }, 100);

            // Step 2: Gateway / Rate Limit
            setTimeout(() => {
                if (nodes[1]) {
                    nodes[1].classList.add('sim-active');
                    nodes[1].appendChild(createBadge('Step 2: Token Bucket Check (Allowed)'));
                }
            }, 850);

            // Step 3: Inference / Processing Engine
            setTimeout(() => {
                if (nodes[2]) {
                    nodes[2].classList.add('sim-active');
                    nodes[2].appendChild(createBadge('Step 3: Schema Enforced'));
                }
            }, 1650);

            // Step 4: Routing Branches
            setTimeout(() => {
                const primaryHeader = branchPrimary ? (branchPrimary.querySelector('.arch-branch-header') || branchPrimary) : null;
                const fallbackHeader = branchFallback ? (branchFallback.querySelector('.arch-branch-header') || branchFallback) : null;

                if (isDualLLM) {
                    if (branchPrimary && primaryHeader) {
                        branchPrimary.classList.add('sim-fail');
                        primaryHeader.appendChild(createBadge('>1.2s Timeout Exceeded', 'warning'));
                    }
                    setTimeout(() => {
                        if (branchFallback && fallbackHeader) {
                            branchFallback.classList.add('sim-success');
                            fallbackHeader.appendChild(createBadge('Hot-Standby Fallback (32ms)', 'success'));
                        }
                    }, 500);
                } else {
                    if (branchPrimary && primaryHeader) {
                        branchPrimary.classList.add('sim-success');
                        primaryHeader.appendChild(createBadge('Route Executed', 'success'));
                    }
                    if (branchFallback && fallbackHeader) {
                        branchFallback.classList.add('sim-success');
                        fallbackHeader.appendChild(createBadge('Processed', 'success'));
                    }
                }
            }, 2450);

            // Step 5: Final Delivery / Metrics
            setTimeout(() => {
                const finalNode = nodes[nodes.length - 1];
                if (finalNode) {
                    finalNode.classList.add('sim-active');
                    finalNode.appendChild(createBadge('Final: HTTP 200 OK + Metrics Saved', 'success'));
                }
            }, 3550);

            // Completion
            setTimeout(() => {
                playBtn.classList.remove('simulating');
                playBtn.classList.add('completed');
                if (playText) playText.textContent = '✓ Flow Verified';

                setTimeout(() => {
                    clearSimulationStates();
                    playBtn.classList.remove('completed');
                    if (playText) playText.textContent = 'Simulate Live Flow';
                    isRunning = false;
                }, 2800);
            }, 4600);
        });
    });
});

