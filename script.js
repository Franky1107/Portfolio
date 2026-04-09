// ── LOADER ──
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
                }, 800);
            }, 1000);
        } else {
            loaderBar.style.width = percentage + '%';
            loaderPct.innerText = Math.floor(percentage) + '%';
        }
    }, interval);
});

// ── NAV SCROLL ──
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

// ── MOBILE MENU ──
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

// ── REVEAL ON SCROLL ──
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

// ── PROJECT FILTER ──
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

// ── FORM SUBMIT ──
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

// ── SMOOTH SCROLL (Locomotive Scroll + GSAP) ──
const scrollContainer = document.querySelector('#main-container');

const locoScroll = new LocomotiveScroll({
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
    onLocoScroll(args.scroll.y);
});

// Refresh ScrollTrigger and Locomotive Scroll on window load/resize
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();

// Anchor link smooth scroll via Locomotive Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            locoScroll.scrollTo(target);
        }
    });
});

// Scroll to top helper (called from the #scroll-top button)
function scrollToTop() {
    locoScroll.scrollTo(0);
}

// ── HERO STAGGERED ENTRANCE ──
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