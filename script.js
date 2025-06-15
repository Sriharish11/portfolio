// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a, .social-icons-left .scroll-up, .social-links-bottom .scroll-up').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add smooth scrolling to the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Intersection Observer for smooth reveal animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections and their children
document.querySelectorAll('section, section > *').forEach(element => {
    observer.observe(element);
});

// Typewriter effect for job titles
function initTypewriter() {
    const textElement = document.getElementById('text');
    if (!textElement) return; // Guard clause if element doesn't exist

    const titles = [
        'Cyber Security Engineer',
        'Digital Forensics Analyst',
        'Ethical Hacker',
        'Penetration Tester',
        'CTF Developer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in milliseconds
    let pauseTime = 2000; // Time to pause after typing complete word

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Deleting text
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deletion speed
        } else {
            // Typing text
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // If word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = pauseTime; // Pause before starting to delete
        }
        // If word is completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Move to next title
            typingSpeed = 500; // Pause before starting next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start the typewriter effect
    typeWriter();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    addAnimationClasses();
    revealOnScroll();

    // Initial hide of scroll-up buttons
    const scrollUpButtons = document.querySelectorAll('.scroll-up');
    scrollUpButtons.forEach(button => {
        button.style.display = 'none';
        button.style.opacity = '0';
    });
});

// Skills Filtering
const skillFilters = document.querySelectorAll('.skill-filter');
const skillsGrid = document.querySelector('.skills-grid');
const allSkills = skillsGrid ? Array.from(skillsGrid.children) : [];

skillFilters.forEach(filterBtn => {
    filterBtn.addEventListener('click', function() {
        skillFilters.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;
        
        allSkills.forEach(skillCard => {
            const category = skillCard.dataset.category;
            if (filter === 'all' || category === filter) {
                skillCard.style.display = 'flex';
            } else {
                skillCard.style.display = 'none';
            }
        });
    });
});

// Scroll-to-top button functionality
const scrollUpButtons = document.querySelectorAll('.scroll-up');

// Add click event to scroll to top
scrollUpButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight;
        const sectionHeight = section.clientHeight;
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
});

// Enhanced Scroll Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-up, section > *, .home-section > *, .about-content > *, .education-grid > *, .skills-grid > *, .projects-grid > *, .contact-container > *');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add animation classes to elements
function addAnimationClasses() {
    // Add fade-up to section headings
    document.querySelectorAll('section h2').forEach(heading => {
        heading.classList.add('fade-up');
    });

    // Add fade-left to odd elements
    document.querySelectorAll('.skill-card:nth-child(odd), .card:nth-child(odd)').forEach(element => {
        element.classList.add('fade-left');
    });

    // Add fade-right to even elements
    document.querySelectorAll('.skill-card:nth-child(even), .card:nth-child(even)').forEach(element => {
        element.classList.add('fade-right');
    });

    // Add scale-up to images
    document.querySelectorAll('.profile-image-container, .about-image-container').forEach(element => {
        element.classList.add('scale-up');
    });

    // Add delays to create staggered effect
    document.querySelectorAll('.skill-card, .card').forEach((element, index) => {
        element.classList.add(`delay-${(index % 4) + 1}`);
    });
}

// Check for elements in view on scroll
window.addEventListener('scroll', revealOnScroll);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Show success message
                contactForm.reset(); // Clear the form
            } else {
                alert(`Error: ${data.message}`); // Show error message
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Could not connect to the server. Please try again later.');
        }
    });
}
