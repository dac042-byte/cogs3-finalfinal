(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initWorkItemReveal();
        initMobileNav();
        removeLoadingState();
    });

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) toggler.click();
                }

                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }


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
            workItems.forEach(function(item) {
                item.classList.add('revealed');
            });
        }
    }

        document.addEventListener('click', function(e) {
            if (navCollapse.classList.contains('show') &&
                !navCollapse.contains(e.target) &&
                !toggler.contains(e.target)) {
                toggler.click();
            }
        });
    }

    function removeLoadingState() {
        document.body.classList.remove('loading');
    }

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
