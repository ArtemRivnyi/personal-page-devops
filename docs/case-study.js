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
    const path = window.location.pathname.toLowerCase();
    const isDualLLM = path.includes('dual-llm');
    const isCarScout = path.includes('car-scout');
    const isS3Sim = path.includes('s3-simulator');
    const isAIEmail = path.includes('ai-email');

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

        const updateTicker = (message, pulseType = 'info') => {
            const ticker = card.querySelector('.arch-live-ticker');
            if (!ticker) return;
            ticker.classList.add('active-trace');
            const pulse = ticker.querySelector('.ticker-pulse');
            const text = ticker.querySelector('.ticker-text');
            if (pulse) {
                pulse.className = `ticker-pulse ${pulseType}`;
            }
            if (text) {
                text.textContent = message;
            }
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
                    nodes[0].appendChild(createBadge('Step 1: Active'));
                    if (isDualLLM) {
                        updateTicker('[TRACE 00.1s] POST /api/v1/classify ➔ Nginx Ingress received payload (HTTP 200)');
                    } else if (isCarScout) {
                        updateTicker('[TRACE 00.1s] User Search Initiated ➔ React 18 / Vite SPA Client dispatched query');
                    } else if (isS3Sim) {
                        updateTicker('[TRACE 00.1s] AWS SDK (boto3) ➔ S3 v4 REST request sent to container endpoint');
                    } else if (isAIEmail) {
                        updateTicker('[TRACE 00.1s] Inbound Email Event ➔ IMAP Webhook payload ingested into Flask');
                    } else {
                        updateTicker('[TRACE 00.1s] Client request initiated ➔ Ingress pipeline active');
                    }
                }
            }, 100);

            // Step 2: Gateway / Cache / Engine
            setTimeout(() => {
                if (nodes[1]) {
                    nodes[1].classList.add('sim-active');
                    nodes[1].appendChild(createBadge('Step 2: Processed'));
                    if (isDualLLM) {
                        updateTicker('[TRACE 00.9s] Redis Token Bucket Rate-Limiter ➔ Allowed (12 req/min budget)');
                    } else if (isCarScout) {
                        updateTicker('[TRACE 00.9s] Express API ➔ Redis Cache hit checked (<240ms response budget)');
                    } else if (isS3Sim) {
                        updateTicker('[TRACE 00.9s] MinIO S3 Engine & Flask API ➔ S3 v4 signature verified (<1.4s boot)');
                    } else if (isAIEmail) {
                        updateTicker('[TRACE 00.9s] Flask API ➔ Dispatched HTTP 202 ACK (<15ms) to Redis Task Broker (RQ)');
                    } else {
                        updateTicker('[TRACE 00.9s] Ingestion gateway verified ➔ Token budget approved');
                    }
                }
            }, 850);

            // Step 3: Engine / Schema / Retrieval
            setTimeout(() => {
                if (nodes[2]) {
                    nodes[2].classList.add('sim-active');
                    nodes[2].appendChild(createBadge('Step 3: Verified'));
                    if (isDualLLM) {
                        updateTicker('[TRACE 01.7s] FastAPI Inference Service ➔ Enforcing strict Pydantic JSON contract');
                    } else if (isCarScout) {
                        updateTicker('[TRACE 01.7s] Multi-Tier Orchestrator: Cheerio Fast HTTP & Puppeteer Stealth Pool active');
                    } else if (isS3Sim) {
                        updateTicker('[TRACE 01.7s] S3 Engine Ingestion: Writing object data chunks to local Docker volume');
                    } else if (isAIEmail) {
                        updateTicker('[TRACE 01.7s] Decoupled Worker ➔ FAISS vector retrieval matched verified store policies');
                    } else {
                        updateTicker('[TRACE 01.7s] Processing contract validated ➔ Schema enforced');
                    }
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
                        updateTicker('[TRACE 02.5s] ⚠️ Primary Gemini 2.0 Flash: Timeout >1,200ms budget breached ➔ Breaker Tripped!', 'failover');
                    }
                    setTimeout(() => {
                        if (branchFallback && fallbackHeader) {
                            branchFallback.classList.add('sim-success');
                            fallbackHeader.appendChild(createBadge('Hot-Standby Fallback (32ms)', 'success'));
                            updateTicker('[TRACE 03.1s] 🔄 Hot-Standby Engaged: OpenAI GPT-4o-mini resolved ticket in 32ms!', 'success');
                        }
                    }, 600);
                } else {
                    if (branchPrimary && primaryHeader) {
                        branchPrimary.classList.add('sim-success');
                        primaryHeader.appendChild(createBadge('Route Verified', 'success'));
                        if (isCarScout) {
                            updateTicker('[TRACE 02.5s] Static Portals Scraped via Cheerio (<150ms) + Cloudflare Bypassed');
                        } else if (isS3Sim) {
                            updateTicker('[TRACE 02.5s] Observability Stack: Prometheus metrics scraped + Promtail streaming to Loki');
                        } else if (isAIEmail) {
                            updateTicker('[TRACE 02.5s] Private Local Ollama (Gemma 7B): Intent classified (100% on-premise)');
                        }
                    }
                    if (branchFallback && fallbackHeader) {
                        branchFallback.classList.add('sim-success');
                        fallbackHeader.appendChild(createBadge('Telemetry OK', 'success'));
                    }
                }
            }, 2450);

            // Step 5: Final Delivery / Metrics
            setTimeout(() => {
                const finalNode = nodes[nodes.length - 1];
                if (finalNode) {
                    finalNode.classList.add('sim-active');
                    finalNode.appendChild(createBadge('Final: Verified', 'success'));
                    if (isDualLLM) {
                        updateTicker('[TRACE 03.9s] 📊 Prometheus metrics recorded: llm_failover_total++ ➔ Response Delivered (HTTP 200 OK)', 'success');
                    } else if (isCarScout) {
                        updateTicker('[TRACE 03.9s] 💶 Irish Revenue Tax Engine: Live FX + VRT + Customs + VAT 23% computed', 'success');
                    } else if (isS3Sim) {
                        updateTicker('[TRACE 03.9s] 📊 Autoprovisioned Grafana Dashboard: Live metrics updated ($0.00 cloud egress)', 'success');
                    } else if (isAIEmail) {
                        updateTicker('[TRACE 03.9s] 🛡️ Customer Dispatch: 99.4% grounded response ready (Zero PII leakage)', 'success');
                    } else {
                        updateTicker('[TRACE 03.9s] Execution complete ➔ Result delivered to client (HTTP 200 OK)', 'success');
                    }
                }
            }, 3650);

            // Completion
            setTimeout(() => {
                playBtn.classList.remove('simulating');
                playBtn.classList.add('completed');
                if (playText) playText.textContent = '✓ Flow Verified';

                if (isDualLLM) {
                    updateTicker('✅ Execution Trace Complete: Zero Outage Achieved (Failover latency <48ms)', 'success');
                } else if (isCarScout) {
                    updateTicker('✅ Multi-Portal Scrape Complete: 6 Classifieds Synced & Priced in <1.2s', 'success');
                } else if (isS3Sim) {
                    updateTicker('✅ S3 Emulation Complete: 100% AWS Specification Pass (Sub-1.4s Boot)', 'success');
                } else if (isAIEmail) {
                    updateTicker('✅ Private AI Pipeline Complete: Zero PII Leakage & 99.4% Policy Grounding', 'success');
                } else {
                    updateTicker('✅ System Architecture Verified: All Ingress & Worker Stages Passed', 'success');
                }

                setTimeout(() => {
                    clearSimulationStates();
                    playBtn.classList.remove('completed');
                    if (playText) playText.textContent = 'Simulate Live Flow';
                    updateTicker('Telemetry Trace: Standby • Click "Simulate Live Flow" to trace real-time execution flow');
                    isRunning = false;
                }, 3400);
            }, 4750);
        });
    });
});

