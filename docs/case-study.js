// Case Study Interactive Navigation, Smart Dock & Top Scroll Handling
document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Back Navigation (guarantees direct return to Portfolio)
    const handleBackNavigation = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const referrer = document.referrer ? document.referrer.toLowerCase() : '';
        const currentHost = window.location.host.toLowerCase();
        // ONLY use history.back() if the direct previous page was the portfolio root (NOT another case study in /docs/)
        const isDirectFromPortfolioRoot = referrer.includes(currentHost) && !referrer.includes('/docs/');

        if (window.history.length > 1 && isDirectFromPortfolioRoot) {
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
            } catch {
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

        const setNodeStatus = (node, statusText, statusClass = 'sim-status-active') => {
            if (!node) return;
            node.classList.add('sim-active');
            const tag = node.querySelector('.arch-node-tag');
            if (tag) {
                if (!tag.hasAttribute('data-orig-text')) {
                    tag.setAttribute('data-orig-text', tag.textContent.trim());
                }
                tag.textContent = statusText;
                tag.className = `arch-node-tag ${statusClass}`;
            }
        };

        const setBranchStatus = (branchCard, badgeText, badgeClass = 'success') => {
            if (!branchCard) return;
            const badge = branchCard.querySelector('.arch-branch-badge');
            if (badge) {
                if (!badge.hasAttribute('data-orig-text')) {
                    badge.setAttribute('data-orig-text', badge.textContent.trim());
                }
                badge.textContent = badgeText;
                badge.className = `arch-branch-badge ${badgeClass}`;
            }
        };

        const clearSimulationStates = () => {
            card.querySelectorAll('.sim-active, .sim-fail, .sim-success').forEach((el) => {
                el.classList.remove('sim-active', 'sim-fail', 'sim-success');
            });
            card.querySelectorAll('.arch-node-tag').forEach((tag) => {
                if (tag.hasAttribute('data-orig-text')) {
                    tag.textContent = tag.getAttribute('data-orig-text');
                    tag.className = 'arch-node-tag';
                }
            });
            card.querySelectorAll('.arch-branch-card').forEach((cardEl) => {
                const badge = cardEl.querySelector('.arch-branch-badge');
                if (badge && badge.hasAttribute('data-orig-text')) {
                    badge.textContent = badge.getAttribute('data-orig-text');
                    const isPrimary = cardEl.classList.contains('primary');
                    badge.className = `arch-branch-badge ${isPrimary ? 'primary' : 'fallback'}`;
                }
            });
            card.querySelectorAll('.sim-packet-badge').forEach((badge) => badge.remove());
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
            const hasFourNodes = nodes.length >= 4;

            // Step 1: Ingress
            setTimeout(() => {
                if (nodes[0]) {
                    setNodeStatus(nodes[0], 'Step 1: Active', 'sim-status-active');
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

            // Step 2: Gateway / Broker / Cache
            setTimeout(() => {
                if (nodes[1]) {
                    setNodeStatus(nodes[1], 'Step 2: Processed', 'sim-status-active');
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

            if (hasFourNodes) {
                // Step 3 (For 4-node topologies like Dual-LLM)
                setTimeout(() => {
                    if (nodes[2]) {
                        setNodeStatus(nodes[2], 'Step 3: Verified', 'sim-status-active');
                        if (isDualLLM) {
                            updateTicker('[TRACE 01.7s] FastAPI Inference Service ➔ Enforcing strict Pydantic JSON contract');
                        }
                    }
                }, 1650);

                // Step 4: Dual-Branch Routing & Circuit Breaker
                setTimeout(() => {
                    if (branchPrimary) {
                        branchPrimary.classList.add('sim-fail');
                        setBranchStatus(branchPrimary, '>1.2s Timeout Exceeded', 'warning');
                        updateTicker('[TRACE 02.5s] ⚠️ Primary Gemini 2.0 Flash: Timeout >1,200ms budget breached ➔ Breaker Tripped!', 'failover');
                    }
                    setTimeout(() => {
                        if (branchFallback) {
                            branchFallback.classList.add('sim-success');
                            setBranchStatus(branchFallback, 'Fallback Active (32ms)', 'success');
                            updateTicker('[TRACE 03.1s] 🔄 Hot-Standby Engaged: OpenAI GPT-4o-mini resolved ticket in 32ms!', 'success');
                        }
                    }, 600);
                }, 2450);

                // Step 5: Final Delivery
                setTimeout(() => {
                    const finalNode = nodes[nodes.length - 1];
                    if (finalNode) {
                        setNodeStatus(finalNode, 'Final: Verified', 'sim-status-success');
                        updateTicker('[TRACE 03.9s] 📊 Prometheus metrics recorded: llm_failover_total++ ➔ Response Delivered (HTTP 200 OK)', 'success');
                    }
                }, 3650);
            } else {
                // Step 3 (For 3-node topologies: Branch Processing)
                setTimeout(() => {
                    if (branchPrimary) {
                        branchPrimary.classList.add('sim-success');
                        if (isCarScout) {
                            setBranchStatus(branchPrimary, 'Static Scraped (<150ms)', 'success');
                            updateTicker('[TRACE 01.7s] Cheerio Fast HTTP: Sub-150ms extraction complete for static portals');
                        } else if (isS3Sim) {
                            setBranchStatus(branchPrimary, 'Metrics Scraped', 'success');
                            updateTicker('[TRACE 01.7s] Observability Stack: Prometheus metrics scraped + Promtail streaming');
                        } else if (isAIEmail) {
                            setBranchStatus(branchPrimary, 'Vector Matched', 'success');
                            updateTicker('[TRACE 01.7s] Decoupled Worker ➔ FAISS vector retrieval matched verified store policies');
                        }
                    }
                    if (branchFallback) {
                        branchFallback.classList.add('sim-success');
                        if (isCarScout) {
                            setBranchStatus(branchFallback, 'Cloudflare Bypassed', 'success');
                        } else if (isS3Sim) {
                            setBranchStatus(branchFallback, 'Logs Streamed', 'success');
                        } else if (isAIEmail) {
                            setBranchStatus(branchFallback, 'Intent Classified', 'success');
                        }
                    }
                }, 1750);

                // Step 4 (For 3-node topologies: Final Delivery)
                setTimeout(() => {
                    const finalNode = nodes[nodes.length - 1];
                    if (finalNode) {
                        setNodeStatus(finalNode, 'Final: Verified', 'sim-status-success');
                        if (isCarScout) {
                            updateTicker('[TRACE 02.8s] 💶 Irish Revenue Tax Engine: Live FX + VRT + Customs + VAT 23% computed', 'success');
                        } else if (isS3Sim) {
                            updateTicker('[TRACE 02.8s] 📊 Autoprovisioned Grafana Dashboard: Live metrics updated ($0.00 cloud egress)', 'success');
                        } else if (isAIEmail) {
                            updateTicker('[TRACE 02.8s] 🛡️ Customer Dispatch: 99.4% grounded response ready (Zero PII leakage)', 'success');
                        } else {
                            updateTicker('[TRACE 02.8s] Pipeline complete ➔ Result delivered (HTTP 200 OK)', 'success');
                        }
                    }
                }, 2850);
            }

            // Completion
            const completionDelay = hasFourNodes ? 4750 : 3950;
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
                }, 3200);
            }, completionDelay);
        });
    });
});

