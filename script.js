
    // AOS Init
    AOS.init({ duration: 800, once: true });

    // Typed strings
    new Typed('#typed-text', {
        strings: ['Web Developer','Cloud Computing Enthusiast','Machine Learning Learner','Frontend Developer'],
        typeSpeed: 70, backSpeed: 40, loop: true
    });
    new Typed('#dynamic-heading', {
        strings: ["Hi, I'm Esha 👋","Exploring the Future of Technology","Learning • Building • Innovating","English · Hindi · Tamil"],
        typeSpeed: 50, backSpeed: 30, loop: true
    });

    // Theme logic
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon  = themeToggle.querySelector('i');

    function applyTheme(isLight) {
        document.body.classList.toggle('light-mode', isLight);
        if (isLight) {
            toggleIcon.className = 'fas fa-sun';
        } else {
            toggleIcon.className = 'fas fa-moon';
        }
    }

    applyTheme(localStorage.getItem('theme') === 'light');

    themeToggle.addEventListener('click', () => {
        const goLight = !document.body.classList.contains('light-mode');
        localStorage.setItem('theme', goLight ? 'light' : 'dark');
        applyTheme(goLight);
    });

    // Filtering Stacks
    document.querySelectorAll('.skill-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            document.querySelectorAll('.skill-card-wrapper').forEach(c =>
                c.classList.toggle('hide', f !== 'all' && c.dataset.category !== f)
            );
        });
    });

    // Load projects grid logic
    document.getElementById('loadMoreProjectsBtn')?.addEventListener('click', function () {
        document.querySelectorAll('.extended-project').forEach(p => p.classList.add('show'));
        AOS.refresh();
        this.closest('.load-more-container').style.display = 'none';
    });

    // View tracking highlights
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActive() {
        let cur = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    }
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    // Custom smooth anchor routing
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
            }
        });
    });

    // Responsive collapse handle
    const navCollapse = document.getElementById('navbarNav');
    const bsNav = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
    navLinks.forEach(l => l.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) bsNav.hide();
    }));

    // Resume click placeholder
    // Resume click handle (Google Drive Cloud reference)
    document.getElementById('resumeBtn')?.addEventListener('click', function(e) {
    this.setAttribute('href', 'Esha Sagar.pdf');
    this.setAttribute('target', '_blank'); // Opens your resume safely in a fresh browser tab
    });

    // Dynamic Certificates Array and Injection Setup
    const certificates = [
        { title: "Python Using AI ",img: "certificate/AI for Techies 2026.jpeg" },
        { title: "IEEE Research Paper",img: "certificate/IEEE Research Paper 2026.jpeg" },
        { title: "Soft Skills and Personality",img: "certificate/NPTEL SoftSkills 2026.jpeg" },
        { title: "Career Essentials in Gen AI",img: "certificate/Career Essentials Linkedin 2026.jpeg" },
        { title: "Introduction To Python",img: "certificate/Intro Of Python SA 2025.jpeg" },
        { title: "Datasience for Everyone",img: "certificate/Datascience For Everyone 2025.jpeg" },
        { title: "AI for All",img: "certificate/AI for All 2025.jpeg" },
        { title: "Web Design & Development",img: "certificate/Web Dev 2025.jpeg" },
        { title: "Cloud Computing Concept",img: "certificate/Cloud Computing Linkedin 2025.jpeg" },
        { title: "Intro to Algorithm & Analysis",img: "certificate/NPTEL Intro to Alg 2025.jpeg" },
        { title: "HITS AI/ML Internship",img: "certificate/HITS Intership 2025.jpeg" },
        { title: "CodeAlpha Intership",img: "certificate/CodeAlpha Online Intern 2025.jpg" },
        { title: "Cloud Computing",img: "certificate/NPTEL Cloud Computing 2025.jpeg" },
        { title: "MongoDB Basic for Student",img: "certificate/MongoDB Badge.png" },
        { title: "AWS Educate Badge",img: "certificate/AWS Educate Badge.png" },
        { title: "Python Libraries for DataScience",img: "certificate/Python Data Science 2024.jpeg" },
        { title: "GitHub Bootcamp Course",img: "certificate/Github 2024.png" },
        { title: "Scaler Java Course",img: "certificate/Scaler Java 2024.png" },
        { title: "Scaler Python Beginner",img: "certificate/Python Course Beginner 2024.png" },
        { title: "Naan Mudhalvan MicroSoft Office",img: "certificate/NM MS365 2023.jpeg" },
        { title: "Great Learning Java Programming",img: "certificate/GL Java 2023.jpg" },
        { title: "Pantech E-learning DataScience ",img: "certificate/Pantech DataScience 2022.jpeg" }
    ];

    const certificatesGrid = document.getElementById('certificatesGrid');
    const certModal  = new bootstrap.Modal(document.getElementById('certificateModal'));
    const modalImg   = document.getElementById('modalCertImage');
    const modalTitle = document.getElementById('modalCertTitle');

    // Build the certificates layout programmatically 
    certificates.forEach((cert) => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';
        
        col.innerHTML = `
            <div class="certificate-gallery-item">
                <img class="certificate-img" src="${cert.img}" alt="${cert.title}">
                <div class="certificate-title">${cert.title}</div>
            </div>
        `;

        // Handle Click Event directly via JS to activate the Bootstrap Lightbox Modal Preview
        col.querySelector('.certificate-gallery-item').addEventListener('click', () => {
            modalImg.src = cert.img;
            modalTitle.innerText = cert.title;
            certModal.show();
        });

        certificatesGrid.appendChild(col);
    });

    // AJAX post pipeline handling
    const contactForm = document.getElementById('portfolioContactForm');
    const successMsg  = document.getElementById('successMessage');
    const submitBtn   = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        const baseHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                successMsg.style.display = 'flex';
                contactForm.reset();
            } else {
                alert('Oops! Submission error pipeline. Re-verify connectivity attributes.');
            }
        } catch (error) {
            alert('Network execution dropped.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = baseHtml;
        }
    });