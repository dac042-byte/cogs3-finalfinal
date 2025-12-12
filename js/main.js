/* ============================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   ============================================ */

(function() {
    'use strict';

    /* ============================================
       DOM READY
       ============================================ */
    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initWorkItemReveal();
        initMobileNav();
        removeLoadingState();
    });

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if just "#"
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                // Close mobile nav if open
                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) toggler.click();
                }

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ============================================
       WORK ITEMS REVEAL ON SCROLL
       Reveals work items with animation as they enter viewport
       ============================================ */
    function initWorkItemReveal() {
        const workItems = document.querySelectorAll('.work-item');
        if (!workItems.length) return;

        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        // Add delay based on item index
                        const delay = entry.target.dataset.aosDelay || 0;
                        setTimeout(function() {
                            entry.target.classList.add('revealed');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            workItems.forEach(function(item) {
                observer.observe(item);
            });
        } else {
            // Fallback for older browsers - reveal all immediately
            workItems.forEach(function(item) {
                item.classList.add('revealed');
            });
        }
    }

    /* ============================================
       MOBILE NAVIGATION
       ============================================ */
    function initMobileNav() {
        const toggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');

        if (!toggler || !navCollapse) return;

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (navCollapse.classList.contains('show') &&
                !navCollapse.contains(e.target) &&
                !toggler.contains(e.target)) {
                toggler.click();
            }
        });
    }

    /* ============================================
       REMOVE LOADING STATE
       Removes loading class after page load
       ============================================ */
    function removeLoadingState() {
        document.body.classList.remove('loading');
    }

    /* ============================================
       UTILITY FUNCTIONS
       ============================================ */

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

})();
