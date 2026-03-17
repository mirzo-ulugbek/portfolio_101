document.addEventListener('DOMContentLoaded', () => {
    // Reveal text elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Language Toggle Feature
    const langToggle = document.getElementById('lang-toggle');
    const langTexts = document.querySelectorAll('.lang-text');
    let currentLang = 'en';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ko' : 'en';
            langToggle.innerHTML = currentLang === 'en' ? '🇺🇸 EN' : '🇰🇷 KR';

            langTexts.forEach(el => {
                const text = el.getAttribute(`data-${currentLang}`);
                if (text) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = text;
                    } else {
                        el.textContent = text;
                    }
                }
            });
            document.documentElement.lang = currentLang;
        });
    }

    // Parallax Effect for Hero Scene
    const heroCard = document.querySelector('.hero-card');
    const skyBackground = document.querySelector('.sky-background');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        if (heroCard) {
            heroCard.style.transform = `translate(${x}px, ${y}px)`;
        }

        if (skyBackground) {
            skyBackground.style.transform = `translate(${-x * 2}px, ${-y * 2}px)`;
        }
    });

    // Contact Form "Send to Clouds" Animation
    const contactForm = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');

    if (contactForm && sendBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual submission

            sendBtn.classList.add('sending');

            // Revert after animation
            setTimeout(() => {
                sendBtn.classList.remove('sending');

                const btnText = sendBtn.querySelector('.btn-text');
                btnText.textContent = "Sent ✓";
                btnText.style.opacity = 1;

                // Clear form
                contactForm.reset();

                setTimeout(() => {
                    btnText.textContent = "Send Message";
                    sendBtn.querySelector('.paper-plane').style.opacity = 1;
                    sendBtn.querySelector('.paper-plane').style.transform = "translate(0, 0) scale(1)";
                }, 3000);
            }, 600);
        });
    }
});
