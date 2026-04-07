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
        if(Math.random() > 0.8) {
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
                }, 800);
            }, 300);
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
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    scrollTop.classList.toggle('visible', y > 400);
    updateActiveNav();
    
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
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
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
    if(fabMenu) fabMenu.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMobileMenu);
if(fabMenu) fabMenu.addEventListener('click', toggleMobileMenu);

function closeMobileMenu() {
    hamburger.classList.remove('open');
    if(fabMenu) fabMenu.classList.remove('open');
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

// ── SMOOTH SCROLL (Lenis + GSAP) ──
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Update GSAP ScrollTrigger whenever Lenis updates scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis requestAnimationFrame
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing to avoid jumps during scroll
gsap.ticker.lagSmoothing(0);

// Update native Anchor link functionality to use Lenis smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});