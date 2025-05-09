document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const animatedNameSpan = document.querySelector('#about h2 .animated-name');
    const fullName = animatedNameSpan ? animatedNameSpan.textContent : '';
    if (animatedNameSpan) {
        animatedNameSpan.textContent = '';
    }
    let nameAnimationTimeout;

    function animateName() {
        if (!animatedNameSpan) return;
        animatedNameSpan.textContent = '';
        for (let i = 0; i < fullName.length; i++) {
            setTimeout(() => {
                animatedNameSpan.textContent += fullName.charAt(i);
            }, 150 * (i + 1));
        }
    }

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    function handleScroll() {
        setActiveLink();
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            if (section.id === 'about' && sectionTop < scrollPosition + windowHeight - 200) {
                if (!nameAnimationTimeout) {
                    nameAnimationTimeout = setTimeout(animateName, 500);
                }
            } else if (section.id === 'about') {
                clearTimeout(nameAnimationTimeout);
                nameAnimationTimeout = null;
                if (animatedNameSpan) {
                    animatedNameSpan.textContent = '';
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    setActiveLink(); // Set active link on initial load

    // Basic smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});