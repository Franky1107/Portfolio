// =========================================
// START SECTION: LOADER
// =========================================
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPct = document.getElementById('loaderPct');

    let percentage = 0;
    // Simulate loading time (faster, ~800ms total)
    const duration = 800;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    // Use setInterval to increment percentage progressively
    const timer = setInterval(() => {
        percentage += increment;

        // Add some random variation for a more natural feel
        if (Math.random() > 0.8) {
            percentage += (Math.random() * 5);
        }

        if (percentage >= 100) {
            percentage = 100;
            clearInterval(timer);

            // Finish animation
            loaderBar.style.width = '100%';
            loaderPct.innerText = '100%';

            // Let the 100% sit for a tiny bit, then slide up loader
            setTimeout(() => {
                loader.classList.add('hidden');

                // Allow CSS transition to finish before triggering scroll-reveal animations
                setTimeout(() => {
                    triggerReveal();
                    animateHeroEntrance();
                    
                    // 🚀 INIT HERE (not before)
                    initLoco();
                }, 800);
            }, 1000);
        } else {
            loaderBar.style.width = percentage + '%';
            loaderPct.innerText = Math.floor(percentage) + '%';
        }
    }, interval);
});

// =========================================
// END SECTION: LOADER
// =========================================

// =========================================
// START SECTION: NAV SCROLL
// =========================================
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scroll-top');
const fabMenu = document.getElementById('fabMenu');
const heroSection = document.getElementById('hero');
let lastScrollY = 0;
let currentScrollY = 0;

// This function is called by Locomotive Scroll's on('scroll') event
function onLocoScroll(y) {
    currentScrollY = y;
    navbar.classList.toggle('scrolled', y > 50);
    scrollTop.classList.toggle('visible', y > 400);
    updateActiveNav(y);

    // FAB & Nav Hide Logic
    const heroHeight = heroSection ? heroSection.offsetHeight - 100 : 500;
    const isScrollingUp = y < lastScrollY;

    if (y > heroHeight) {
        // Past hero section
        navbar.classList.add('hidden-nav');

        if (isScrollingUp) {
            fabMenu.classList.add('visible');
        } else {
            fabMenu.classList.remove('visible');
        }
    } else {
        // Inside hero section
        navbar.classList.remove('hidden-nav');
        fabMenu.classList.remove('visible');
    }

    lastScrollY = y;
}

function updateActiveNav(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(s => {
        if (scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

// =========================================
// END SECTION: NAV SCROLL
// =========================================

// =========================================
// START SECTION: MOBILE MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    if (fabMenu) fabMenu.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileMenu);
if (fabMenu) fabMenu.addEventListener('click', toggleMobileMenu);

function closeMobileMenu() {
    hamburger.classList.remove('open');
    if (fabMenu) fabMenu.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// =========================================
// END SECTION: MOBILE MENU
// =========================================

// =========================================
// START SECTION: REVEAL ON SCROLL
// =========================================
function triggerReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                // Animate skill bars when visible
                e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            } else {
                e.target.classList.remove('visible');
                // Reset skill bars when scrolled away
                e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = '0%';
                });
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// =========================================
// END SECTION: REVEAL ON SCROLL
// =========================================

// =========================================
// START SECTION: PROJECT FILTER
// =========================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeUp 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// =========================================
// END SECTION: PROJECT FILTER
// =========================================

// =========================================
// START SECTION: FORM SUBMIT
// =========================================
function handleFormSubmit(btn) {
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#219ebc';
        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
}

// =========================================
// END SECTION: FORM SUBMIT
// =========================================

// =========================================
// START SECTION: SMOOTH SCROLL (Locomotive Scroll + GSAP)
// =========================================
let locoScroll;

function initLoco() {
    const scrollContainer = document.querySelector('#main-container');

    locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 1,
        lerp: 0.08,
        smartphone: { smooth: false },
        tablet: { smooth: true, breakpoint: 768 },
    });

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger to use Locomotive Scroll's scroll position
    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: scrollContainer.style.transform ? 'transform' : 'fixed',
    });

    // Sync: update ScrollTrigger & nav logic whenever Locomotive Scroll updates
    locoScroll.on('scroll', (args) => {
        ScrollTrigger.update();
        if (typeof onLocoScroll === 'function') {
            onLocoScroll(args.scroll.y);
        }
    });

    // Refresh ScrollTrigger and Locomotive Scroll on window load/resize
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();

    // Hook in our extra scroll features now that locoScroll exists
    if (typeof initScrollVelocity === 'function') initScrollVelocity();
    if (typeof initScrollSnapping === 'function') initScrollSnapping();
}
// =========================================
// END SECTION: SMOOTH SCROLL (Locomotive Scroll + GSAP)
// =========================================

// =========================================
// START SECTION: AUTO-UPDATE OBSERVERS
// =========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        if (locoScroll) locoScroll.update();
    }, 300);
});
// =========================================
// END SECTION: AUTO-UPDATE OBSERVERS
// =========================================

// =========================================
// START SECTION: NAV SPLASH TRANSITION
// =========================================
const navSplash = document.getElementById('navSplash');
const splashWords = document.querySelectorAll('.splash-word');
let isSplashActive = false;

function showNavSplash(targetEl, callback) {
    if (isSplashActive) return;
    isSplashActive = true;

    // Reset all words
    splashWords.forEach(w => {
        w.classList.remove('active', 'exit');
    });

    // Show first word and activate overlay
    splashWords[0].classList.add('active');
    navSplash.classList.remove('closing');
    navSplash.classList.add('active');

    let currentWord = 0;
    const totalWords = splashWords.length;
    const wordInterval = 250; // ms per word

    // Cycle through greetings
    const cycleTimer = setInterval(() => {
        // Exit current word
        splashWords[currentWord].classList.remove('active');
        splashWords[currentWord].classList.add('exit');

        currentWord++;

        if (currentWord >= totalWords) {
            clearInterval(cycleTimer);

            // Scroll to target while splash is still visible
            if (targetEl) {
                locoScroll.scrollTo(targetEl, { duration: 0, disableLerp: true });
            } else if (callback) {
                callback();
            }

            // Brief pause then close the splash
            setTimeout(() => {
                navSplash.classList.add('closing');
                navSplash.classList.remove('active');

                // Clean up after close animation finishes
                setTimeout(() => {
                    navSplash.classList.remove('closing');
                    splashWords.forEach(w => w.classList.remove('active', 'exit'));
                    isSplashActive = false;

                    // Update loco scroll after navigation
                    locoScroll.update();
                }, 600);
            }, 200);
        } else {
            // Show next word
            splashWords[currentWord].classList.add('active');
        }
    }, wordInterval);
}

// Anchor link click → splash transition → scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }

        if (target) {
            showNavSplash(target);
        }
    });
});

// Scroll to top with splash
function scrollToTop() {
    showNavSplash(null, () => {
        locoScroll.scrollTo(0, { duration: 0, disableLerp: true });
    });
}

// =========================================
// END SECTION: NAV SPLASH TRANSITION
// =========================================

// =========================================
// START SECTION: HERO STAGGERED ENTRANCE
// =========================================
function animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-eyebrow-v2', {
        opacity: 1,
        y: 0,
        duration: 0.7,
    })
        .to('.hero-iam-v2', {
            opacity: 1,
            y: 0,
            duration: 0.6,
        }, '-=0.3')
        .to('.hero-name-huge-v2', {
            opacity: 1,
            y: 0,
            duration: 0.9,
        }, '-=0.35')
        .to('.hero-title-small-v2', {
            opacity: 1,
            y: 0,
            duration: 0.7,
        }, '-=0.4')
        .to('.hero-tagline-small-v2', {
            opacity: 1,
            y: 0,
            duration: 0.7,
        }, '-=0.35');
}

// =========================================
// END SECTION: HERO STAGGERED ENTRANCE
// =========================================

// =========================================
// START SECTION: SCROLL VELOCITY
// =========================================
function initScrollVelocity() {
    const scrollers = document.querySelectorAll('.scroller');

    if (scrollers.length > 0) {
        let scrollVelocity = 0;
        let targetVelocity = 0;
        
        // Hook into Locomotive Scroll to get real-time velocity
        locoScroll.on('scroll', (args) => {
            targetVelocity = args.speed || 0;
        });

        // Prepare state for each scroller
        const scrollerData = Array.from(scrollers).map(scroller => {
            const span = scroller.querySelector('span'); // Get one child to measure width
            return {
                el: scroller,
                baseX: 0,
                baseVelocity: parseFloat(scroller.getAttribute('data-base-velocity')) || 1,
                directionFactor: 1,
                getSpanWidth: () => span ? span.offsetWidth : 0 // recalculate on fly for resizes
            };
        });

        function wrap(min, max, v) {
            const range = max - min;
            const mod = (((v - min) % range) + range) % range;
            return mod + min;
        }

        let lastTime = performance.now();

        function renderVelocity(time) {
            const delta = time - lastTime;
            lastTime = time;

            // Smooth out the target velocity to prevent jitter/bouncing
            scrollVelocity += (targetVelocity - scrollVelocity) * 0.1;
            targetVelocity *= 0.9; // decay target so it stops if scrolling stops

            const velocityFactor = scrollVelocity * 0.15; // tweak multiplier for intensity

            scrollerData.forEach(data => {
                // Apply a threshold to prevent microscopic bounces causing sudden direction flips
                if (velocityFactor < -0.05) {
                    data.directionFactor = -1; // scrolling up reverses direction
                } else if (velocityFactor > 0.05) {
                    data.directionFactor = 1;  // scrolling down goes natural direction
                }

                // Normal delta-based movement
                let moveBy = data.directionFactor * data.baseVelocity * (delta / 16); 
                
                // Exact React equation:
                moveBy += data.directionFactor * moveBy * velocityFactor;

                data.baseX += moveBy;

                const maxW = data.getSpanWidth();
                if (maxW > 0) {
                    // Seamless wrap around exactly one span minus gap length
                    const wrappedX = wrap(-maxW, 0, data.baseX);
                    data.baseX = wrappedX; // store wrapped value so we don't float to infinity
                    data.el.style.transform = `translate3d(${wrappedX}px, 0, 0)`;
                }
            });

            requestAnimationFrame(renderVelocity);
        }

        requestAnimationFrame(renderVelocity);
    }
}
// =========================================
// END SECTION: SCROLL VELOCITY
// =========================================

// =========================================
// START SECTION: SCROLL SNAPPING
// =========================================
function initScrollSnapping() {
    let snapTimeout;

    locoScroll.on('scroll', (args) => {
        clearTimeout(snapTimeout);
        
        // Only engage snapping if the user has essentially stopped scrolling fast
        if (Math.abs(args.speed) > 2) return; 

        // Wait slightly to make sure scroll movement has actually finished
        snapTimeout = setTimeout(() => {
            const currentY = args.scroll.y;
            let closestSection = null;
            let minDistance = Infinity;
            
            // How close before the magnet activates?
            const magnetThreshold = 250;
            
            document.querySelectorAll('[data-snap-section]').forEach(section => {
                // offsetTop works perfectly because Locomotive translates the container relatively
                const targetY = section.offsetTop;
                const distance = Math.abs(currentY - targetY);
                
                if (distance < magnetThreshold && distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });
            
            // If we found a marked section and we're not perfectly on it already
            if (closestSection && minDistance > 5) {
                locoScroll.scrollTo(closestSection, {
                    duration: 800,
                    disableLerp: false,
                    easing: [0.25, 0.00, 0.35, 1.00]
                });
            }
        }, 150); // delay before snapping
    });
}
// =========================================
// END SECTION: SCROLL SNAPPING
// =========================================
