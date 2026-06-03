AOS.init({ duration: 1000, once: true, offset: 100 });


    // FIX 1: Smooth scroll — skips empty/external hrefs
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // skip plain # links
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 255, 255, 0.1)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Typing animation for name
    const nameStr = "Esha Sagar";
    const nameSpan = document.getElementById("dynamicName");
    if (nameSpan) {
        let currentText = "", index = 0, isTyping = true;
        let timeoutId = null, pauseTimer = null;
        const TYPE_SPEED = 100, ERASE_SPEED = 60, PAUSE_BEFORE_ERASE = 1500, PAUSE_BEFORE_RETYPE = 500;

        function clearTypingTimers() {
            if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
            if (pauseTimer) { clearTimeout(pauseTimer); pauseTimer = null; }
        }
        function updateDisplay() { nameSpan.textContent = currentText; }
        function typeNextChar() {
            if (!isTyping) return;
            if (index < nameStr.length) {
                currentText = nameStr.substring(0, index + 1);
                updateDisplay(); index++;
                timeoutId = setTimeout(typeNextChar, TYPE_SPEED);
            } else {
                currentText = nameStr; updateDisplay();
                clearTypingTimers();
                pauseTimer = setTimeout(() => { isTyping = false; eraseNextChar(); }, PAUSE_BEFORE_ERASE);
            }
        }
        function eraseNextChar() {
            if (isTyping) return;
            if (index > 0) {
                currentText = nameStr.substring(0, index - 1);
                updateDisplay(); index--;
                timeoutId = setTimeout(eraseNextChar, ERASE_SPEED);
            } else {
                currentText = ""; updateDisplay();
                clearTypingTimers();
                pauseTimer = setTimeout(() => {
                    isTyping = true; index = 0; currentText = ""; updateDisplay(); typeNextChar();
                }, PAUSE_BEFORE_RETYPE);
            }
        }
        setTimeout(() => { clearTypingTimers(); index = 0; isTyping = true; currentText = ""; updateDisplay(); typeNextChar(); }, 300);
    }

   
    // FIX 2: contactBtn scrolls to #contact section
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Typed.js for about section heading
    new Typed('#dynamic-heading', {
        strings: ['Hi, I\'m Esha 👋', 'Exploring, Learning, and Building in Tech'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // About image opens lightbox
    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
        aboutImage.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('successMessage');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {

            successMessage.classList.add('show-success');

            setTimeout(() => {
                successMessage.classList.remove('show-success');
            }, 4000);
        });
    }


    //Project modal
    const projectModal = document.getElementById('projectModal');
    projectModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const title = button.getAttribute('data-title');
        const desc  = button.getAttribute('data-desc');
        const tech  = button.getAttribute('data-tech');
        const link  = button.getAttribute('data-link');

        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalDesc').innerText  = desc;

        const modalLink = document.getElementById('modalLink');
        modalLink.href = link;
        modalLink.setAttribute('target', '_blank');
        modalLink.setAttribute('rel', 'noopener noreferrer');

        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        tech.split(',').forEach(item => {
            const span = document.createElement('span');
            span.innerText = item.trim();
            techContainer.appendChild(span);
        });
    });

    
    // FIX 4: Explore Project links 
    
    document.querySelectorAll('.modern-project-card').forEach(card => {
        const button      = card.querySelector('.view-btn');
        const exploreLink = card.querySelector('.project-link');
        if (button && exploreLink) {
            const githubLink = button.getAttribute('data-link');
            if (githubLink) {
                exploreLink.href = githubLink;
                exploreLink.setAttribute('target', '_blank');
                exploreLink.setAttribute('rel', 'noopener noreferrer');
                // Prevent the smooth-scroll listener from swallowing the click
                exploreLink.addEventListener('click', function (e) {
                    e.stopPropagation();
                    window.open(this.href, '_blank');
                });
            }
        }
    });

    // Certificates
    const certificates = [
        { title: "GitHub Foundations",          img: "certificate/Github-certificate 24 Aug 2024.png" },
        { title: "AI for All",                   img: "certificate/AI for All Nov 22,2025.jpeg" },
        { title: "Java Programming",  img: "certificate/Java 24,August,2024.png" },
        { title: "Java Programming",  img: "certificate/Java Jan 2023.jpg" },
        { title: "Naan Mudhalvan",               img: "certificate/NM Apr 15,2023.jpeg" },
        { title: "Cloud Computing",        img: "certificate/NPTEL CC Jan 2025.jpeg" },
        { title: "Intro to Algorithms",    img: "certificate/NPTEL Intro to Alg Jul 2025.jpeg" },
        { title: "Pantech Data Science",         img: "certificate/Pantech DataScience 30 Days Nov 20,2022.jpeg" },
        { title: "Python for Beginners",         img: "certificate/Python Course Beg 15 Aug ,2024.png" },
        { title: "Python Data Science",          img: "certificate/Python Data Science Dec 29,2024.jpeg" },
        { title: "Web Development",              img: "certificate/Web Dev Nov 22,2025.jpeg" },
        { title: "Enhancing Soft Skills",              img: "certificate/NPTEL SoftSkills.jpeg" },
    ];

    const gridContainer = document.getElementById('certificatesGrid');

    function renderAllCertificates() {
        if (!gridContainer) return;
        gridContainer.innerHTML = '';
        certificates.forEach((cert, idx) => {
            const card = document.createElement('div');
            card.className = 'cert-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (idx % 5 * 50).toString());
            card.innerHTML = `
                <div class="cert-img-wrapper">
                    <img src="${cert.img}" class="cert-img" alt="${cert.title}" loading="lazy">
                    <div class="img-overlay">
                        <button class="view-btn" data-img-src="${cert.img}">🔍 View Certificate</button>
                    </div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">${cert.title}</div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
        attachLightboxEvents();
        AOS.refresh();
    }

    window.openLightbox = function (imageSrc) {
        const lightbox    = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImage');
        lightboxImg.src   = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function () {
        document.getElementById('lightboxModal').classList.remove('active');
        document.body.style.overflow = '';
    };

    function attachLightboxEvents() {
        document.querySelectorAll('.cert-card .view-btn').forEach(btn => {
            btn.removeEventListener('click', btn._listener);
            const handler = (e) => {
                e.stopPropagation();
                const imgSrc = btn.getAttribute('data-img-src');
                if (imgSrc) openLightbox(imgSrc);
            };
            btn.addEventListener('click', handler);
            btn._listener = handler;
        });
        document.querySelectorAll('.cert-card').forEach(card => {
            card.removeEventListener('click', card._cardClick);
            const cardClickHandler = (e) => {
                if (!e.target.closest('.view-btn')) {
                    const imgElem = card.querySelector('.cert-img');
                    if (imgElem && imgElem.src) openLightbox(imgElem.src);
                }
            };
            card.addEventListener('click', cardClickHandler);
            card._cardClick = cardClickHandler;
        });
    }

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => { if (e.target === lightboxModal) closeLightbox(); });
    }

    renderAllCertificates();

