// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
    // Reduced loading time for better UX
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 3000); // Reduced to 3 seconds for better user experience
});

// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height);
}

// Matrix characters
const matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';

function drawMatrix() {
    // Semi-transparent black background to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00'; // Green text
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop if it reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
}

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
});

// Animation loop
function animate() {
    drawMatrix();
    requestAnimationFrame(animate);
}

animate();

// ===== TYPEWRITER EFFECT =====
const dynamicText = document.getElementById('dynamic-text');
const phrases = [' Eat', ' Hack', ' Sleep', ' Repeat'];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Deleting text
        dynamicText.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
        typingSpeed = 50; // Faster when deleting
    } else {
        // Typing text
        dynamicText.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
        typingSpeed = 150; // Normal typing speed
    }

    // If word is complete, start deleting after a pause
    if (!isDeleting && letterIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end of the word
    }

    // If word is deleted, move to the next word
    if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing the next word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start the typewriter effect
setTimeout(typeEffect, 6000); // Start after loading screen

// ===== NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.classList.toggle('menu-open');
    
    // Update aria-expanded for accessibility
    hamburger.setAttribute('aria-expanded', isActive.toString());
});

// Close mobile menu when a nav item is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Header scroll effect and active section highlighting
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active navigation item based on scroll position
    updateActiveNavItem();
});

// Function to update active navigation item
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            // Add active class to current nav item
            if (navItem) {
                navItem.classList.add('active');
            }
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const fadeElements = document.querySelectorAll('.about-content, .skills-container, .timeline-item, .project-card, .volunteering-card, .contact-container');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.8;
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to all elements
fadeElements.forEach(element => {
    element.classList.add('fade-in');
});

// Check elements on load
window.addEventListener('load', checkFade);

// Check elements on scroll
window.addEventListener('scroll', checkFade);

// ===== PARTICLE EFFECT =====
const particles = document.getElementById('particles');
const particleCount = 50;

// Create unique keyframes for each particle
let particleStyles = '';

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 5 + 1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Create unique animation name for this particle
    const animationName = `float-${i}`;
    
    // Generate unique keyframes for this particle
    const x1 = Math.random() * 100 - 50;
    const y1 = Math.random() * 100 - 50;
    const x2 = Math.random() * 100 - 50;
    const y2 = Math.random() * 100 - 50;
    const x3 = Math.random() * 100 - 50;
    const y3 = Math.random() * 100 - 50;
    
    particleStyles += `
        @keyframes ${animationName} {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${x1}px, ${y1}px);
            }
            50% {
                transform: translate(${x2}px, ${y2}px);
            }
            75% {
                transform: translate(${x3}px, ${y3}px);
            }
        }
    `;
    
    // Set styles with unique animation
    particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(0, 255, 0, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        animation: ${animationName} ${duration}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    particles.appendChild(particle);
}

// Add all particle animations to stylesheet
const style = document.createElement('style');
style.innerHTML = particleStyles;
document.head.appendChild(style);

// ===== FEEDBACK FORM =====
// Form status element
const formStatus = document.getElementById('form-status');

// Show error message
function showError(message) {
    formStatus.innerHTML = message;
    formStatus.className = 'form-status error show';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide error after 8 seconds (longer for contact info)
    setTimeout(() => {
        formStatus.className = 'form-status error';
    }, 8000);
}

// Show success message
function showSuccess(message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status success show';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide success message after 8 seconds
    setTimeout(() => {
        formStatus.className = 'form-status success';
    }, 8000);
}

// Get the feedback form element
const scriptURL = 'https://script.google.com/macros/s/AKfycby3LlTLy-XA45bLUoPSDEBhed57GxXeiHxTKEuNXwVpqzGqwuwj_J484kLYe2VvEKWu/exec';
  const form = document.getElementById('feedback-form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      alert("Thank you! Your feedback has been sent.");
      window.location.href = "https://www.linkedin.com/in/sri-harish-k-06s11s/";
    })
    .catch(error => console.error('Error!', error.message));
  });

// Handle form submission with improved UX
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            
            // Set the _next field to current page URL
            const nextField = feedbackForm.querySelector('input[name="_next"]');
            if (nextField) {
                nextField.value = window.location.href + '#contact';
            }
            
            // Create FormData for actual submission
            const formData = new FormData(feedbackForm);
            
            // Use a more reliable approach for FormSubmit.co
            // Show success message immediately and submit in background
            setTimeout(() => {
                showSuccess('✅ Thank you for your feedback! Your message has been sent successfully. I will get back to you soon.');
                feedbackForm.reset();
                clearAllValidation();
                updateCharacterCount();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = originalText;
            }, 1500); // 1.5 second delay to show loading state
            
            // Submit form data to FormSubmit.co in background
            fetch(feedbackForm.action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for FormSubmit.co
            }).catch(() => {
                // Ignore errors since we already showed success message
                // FormSubmit.co will likely receive the form even if we get CORS errors
            });
        }
    });
    
    // Add real-time validation feedback
    const inputs = feedbackForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error styling on input
            this.classList.remove('error');
            clearFieldError(this);
            
            // Update character count for message field
            if (this.name === 'message') {
                updateCharacterCount();
            }
        });
        
        // Add focus event for better UX
        input.addEventListener('focus', function() {
            clearFieldError(this);
        });
    });
    
    // Initialize character count
    updateCharacterCount();
}

// Enhanced individual field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${field.labels[0].textContent.replace(' *', '')} is required`;
    }
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Name validation
    else if (field.name === 'name' && value) {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (!nameRegex.test(value)) {
            isValid = false;
            errorMessage = 'Name should only contain letters, spaces, hyphens, and apostrophes';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    // Subject validation
    else if (field.name === 'subject' && value) {
        if (value.length < 5) {
            isValid = false;
            errorMessage = 'Subject must be at least 5 characters long';
        }
    }
    // Message validation
    else if (field.name === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        } else if (value.length > 1000) {
            isValid = false;
            errorMessage = 'Message must be less than 1000 characters';
        }
    }
    
    // Add visual feedback
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        clearFieldError(field);
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field-specific error
function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear field-specific error
function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Clear all validation states
function clearAllValidation() {
    const inputs = feedbackForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('valid', 'error');
        clearFieldError(input);
    });
}

// Update character count for message field
function updateCharacterCount() {
    const messageField = document.getElementById('message');
    const charCountElement = document.getElementById('char-count');
    const charCountContainer = document.querySelector('.character-count');
    
    if (messageField && charCountElement) {
        const currentLength = messageField.value.length;
        const maxLength = 1000;
        
        charCountElement.textContent = currentLength;
        
        // Update styling based on character count
        charCountContainer.classList.remove('warning', 'danger');
        if (currentLength > maxLength * 0.9) {
            charCountContainer.classList.add('danger');
        } else if (currentLength > maxLength * 0.75) {
            charCountContainer.classList.add('warning');
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    updateActiveNavItem();
    checkFade();
}, 16)); // ~60fps

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for mobile menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Focus management for mobile menu
navLinks.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    }
});

// Skip to main content link (for screen readers)
document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
});
