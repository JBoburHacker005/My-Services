// JBN Ecosystem - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeMobileNav();
    initializeFloatingCards();
    initializeServiceCards();
    initializeAnimations();
    initializeContactForm();
    initializeParticleSystem();
    initializeScrollEffects();
    initializeGoogleSearch();
    initializeSignIn();
    checkUserLoginStatus();
    initializeTelegramContact();
    initializeGlobalClickEffects();
    initializeTechnologyCards();
    initializeLiveClock();
    initializeWeather();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile navigation (hamburger) toggle
function initializeMobileNav() {
    const toggleBtn = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('is-open');
        if (navActions) {
            if (isOpen) {
                navActions.classList.add('is-open');
            } else {
                navActions.classList.remove('is-open');
            }
        }
        // small tap animation
        toggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => (toggleBtn.style.transform = ''), 120);
    });
}

// Floating cards animation
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
        
        // Add click effects and navigation
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Get service name from card text
            const serviceName = this.querySelector('span').textContent.trim();
            
            // Navigate to the service
            navigateToServiceSection(serviceName);
        });
        
        // Add cursor pointer to indicate clickability
        card.style.cursor = 'pointer';
    });
}

// Service cards interaction
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceBtns = document.querySelectorAll('.service-btn');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 30px 80px rgba(0, 242, 254, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click event to navigate to sections
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.querySelector('h3').textContent;
            navigateToServiceSection(serviceName);
        });
    });
    
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            showServiceModal(serviceName);
        });
    });
}

// Navigate to service sections
function navigateToServiceSection(serviceName) {
    const serviceUrls = {
        'JBN VIDEO': 'https://youtube.com',
        'JBN NEWS': 'https://kun.uz', 
        'JBN MAIL': 'https://gmail.com',
        'JBN MESSENGER': 'https://telegram.org',
        'JBN MAP': 'https://maps.google.com',
        'JBN GAMES': 'https://yandex.com/games',
        'JBN MARKET': 'https://uzum.uz',
        'JBN MUSIC': 'https://music.yandex.com',
        'JBN EDU': 'https://ibratacademy.uz',
        'JBN AI': 'https://chat.openai.com',
        'JBN PAY': 'https://click.uz',
        'JBN INT TEST': 'https://fast.com'
    };
    
    const targetUrl = serviceUrls[serviceName];
    if (targetUrl) {
        if (targetUrl.startsWith('#')) {
            // Internal navigation
            const element = document.querySelector(targetUrl);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                showNotification(`Navigating to ${serviceName}...`, 'info');
            }
        } else {
            // External navigation
            window.open(targetUrl, '_blank');
            showNotification(`Opening ${serviceName}...`, 'info');
        }
    } else {
        // Fallback for unknown services
        showNotification(`Service ${serviceName} not found.`, 'error');
    }
}

// Service modal functionality
function showServiceModal(serviceName) {
    const serviceInfo = getServiceInfo(serviceName);
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${serviceName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-preview">
                        <div class="preview-icon">
                            <i class="fas fa-${getServiceIcon(serviceName)}"></i>
                        </div>
                        <div class="preview-content">
                            <h4>${serviceInfo.title}</h4>
                            <p>${serviceInfo.description}</p>
                            <div class="preview-features">
                                ${serviceInfo.features.map(feature => `<span>${feature}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="openService('${serviceName}')">Open Service</button>
                        <button class="btn-secondary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .service-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }
        .modal-content {
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(30, 60, 114, 0.9) 100%);
            border-radius: 25px;
            max-width: 600px;
            width: 100%;
            border: 1px solid rgba(0, 242, 254, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid rgba(0, 242, 254, 0.2);
        }
        .modal-header h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 700;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #ffffff;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            color: #00f2fe;
            transform: scale(1.1);
        }
        .modal-body {
            padding: 2rem;
        }
        .service-preview {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .preview-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .preview-content h4 {
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .preview-content p {
            color: #b0b0b0;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .preview-features {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .preview-features span {
            background: rgba(0, 242, 254, 0.1);
            color: #00f2fe;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            border: 1px solid rgba(0, 242, 254, 0.3);
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .modal-actions .btn-primary,
        .modal-actions .btn-secondary {
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }
        .modal-actions .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .modal-actions .btn-secondary {
            background: transparent;
            color: #00f2fe;
            border: 2px solid #00f2fe;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }
    });
}

// Get service icon based on service name
function getServiceIcon(serviceName) {
    const iconMap = {
        'JBN VIDEO': 'play',
        'JBN NEWS': 'newspaper',
        'JBN MAIL': 'envelope',
        'JBN MESSENGER': 'comments',
        'JBN MAP': 'map-marker-alt',
        'JBN GAMES': 'gamepad',
        'JBN MARKET': 'shopping-cart',
        'JBN MUSIC': 'music',
        'JBN EDU': 'graduation-cap',
        'JBN AI': 'brain',
        'JBN PAY': 'credit-card',
        'JBN INT TEST': 'tachometer-alt'
    };
    return iconMap[serviceName] || 'star';
}

// Get detailed service information
function getServiceInfo(serviceName) {
    const serviceData = {
        'JBN VIDEO': {
            title: 'Video Platform',
            description: 'Access YouTube - the world\'s largest video sharing platform with millions of videos, live streams, and educational content.',
            features: ['Video Streaming', 'Live Broadcasts', 'Educational Content', 'Entertainment']
        },
        'JBN NEWS': {
            title: 'News Portal',
            description: 'Stay updated with the latest news from Kun.uz - Uzbekistan\'s leading news website covering politics, economy, and society.',
            features: ['Latest News', 'Political Updates', 'Economic News', 'Social Issues']
        },
        'JBN MAIL': {
            title: 'Email Service',
            description: 'Access Gmail - Google\'s powerful email service with 15GB of free storage and advanced features.',
            features: ['15GB Storage', 'Spam Protection', 'Mobile Sync', 'Advanced Search']
        },
        'JBN MESSENGER': {
            title: 'Messaging App',
            description: 'Connect with Telegram - a secure messaging app with end-to-end encryption and cloud storage.',
            features: ['Secure Messaging', 'File Sharing', 'Group Chats', 'Voice Calls']
        },
        'JBN MAP': {
            title: 'Navigation Service',
            description: 'Navigate with Google Maps - the world\'s most comprehensive mapping service with real-time traffic.',
            features: ['GPS Navigation', 'Real-time Traffic', 'Street View', 'Local Discovery']
        },
        'JBN GAMES': {
            title: 'Gaming Platform',
            description: 'Play games on Yandex Games - a collection of free online games and browser-based entertainment.',
            features: ['Free Games', 'Browser Gaming', 'Multiplayer', 'No Download Required']
        },
        'JBN MARKET': {
            title: 'E-commerce Platform',
            description: 'Shop on Uzum.uz - Uzbekistan\'s leading online marketplace with millions of products.',
            features: ['Wide Product Range', 'Secure Payments', 'Fast Delivery', 'Customer Support']
        },
        'JBN MUSIC': {
            title: 'Music Streaming',
            description: 'Listen to music on Yandex Music - a music streaming service with millions of songs and playlists.',
            features: ['Music Streaming', 'Playlists', 'Offline Mode', 'High Quality Audio']
        },
        'JBN EDU': {
            title: 'Educational Platform',
            description: 'Learn on Ibrat Academy - Uzbekistan\'s premier online education platform with courses and certifications.',
            features: ['Online Courses', 'Certifications', 'Expert Instructors', 'Flexible Learning']
        },
        'JBN AI': {
            title: 'AI Assistant',
            description: 'Chat with ChatGPT - OpenAI\'s advanced AI assistant for conversations, writing, and problem-solving.',
            features: ['AI Conversations', 'Text Generation', 'Problem Solving', 'Creative Writing']
        },
        'JBN PAY': {
            title: 'Payment System',
            description: 'Make payments with Click.uz - Uzbekistan\'s leading digital payment platform for online transactions.',
            features: ['Secure Payments', 'Mobile Banking', 'Bill Payments', 'Money Transfer']
        },
        'JBN INT TEST': {
            title: 'Speed Test',
            description: 'Test your internet speed with Fast.com - Netflix\'s internet speed testing service.',
            features: ['Speed Testing', 'Real-time Results', 'No Ads', 'Accurate Measurements']
        }
    };
    
    return serviceData[serviceName] || {
        title: 'Service Information',
        description: 'This service provides essential functionality for your digital needs.',
        features: ['Advanced Features', 'User Friendly', 'Secure', 'Reliable']
    };
}

// Initialize animations
function initializeAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .contact-info, .floating-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

// Form submission handling
function handleFormSubmission() {
    const formData = new FormData(document.querySelector('.form'));
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const message = document.querySelector('textarea').value;
    
    if (name && email && message) {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        document.querySelector('.form').reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .notification-success {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
        .notification-error {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .notification-info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 4000);
}

// Particle system
function initializeParticleSystem() {
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        // Create additional particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
            heroParticles.appendChild(particle);
        }
    }
}

// Scroll effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-background');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Update floating cards based on scroll
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform += ` translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Add smooth scrolling to all anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.service-modal');
        modals.forEach(modal => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        });
    }
});

// Performance optimization
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update header background based on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (scrolled > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 30px 80px rgba(0, 242, 254, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Google Search functionality
function initializeGoogleSearch() {
    const searchInput = document.getElementById('googleSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        // Search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performGoogleSearch();
            }
        });
        
        // Search suggestions on input
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.length > 2) {
                    showSearchSuggestions(this.value);
                } else {
                    hideSearchSuggestions();
                }
            }, 300);
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                hideSearchSuggestions();
            }
        });
    }
}

// Perform Google search
function performGoogleSearch() {
    const searchInput = document.getElementById('googleSearch');
    const query = searchInput.value.trim();
    
    if (query) {
        // Create Google search URL
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        // Open in new tab
        window.open(googleSearchUrl, '_blank');
        
        // Show success notification
        showNotification(`Searching for "${query}" on Google...`, 'info');
        
        // Clear input
        searchInput.value = '';
        hideSearchSuggestions();
    } else {
        showNotification('Please enter a search term.', 'error');
    }
}

// Show search suggestions
function showSearchSuggestions(query) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (!searchSuggestions) return;
    
    // Mock suggestions based on query
    const suggestions = [
        { icon: 'search', text: `Search for "${query}"` },
        { icon: 'images', text: `Images of ${query}` },
        { icon: 'video', text: `Videos of ${query}` },
        { icon: 'news', text: `News about ${query}` },
        { icon: 'map', text: `Maps for ${query}` }
    ].filter(suggestion => 
        suggestion.text.toLowerCase().includes(query.toLowerCase())
    );
    
    if (suggestions.length > 0) {
        searchSuggestions.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="selectSuggestion('${suggestion.text}')">
                <i class="fas fa-${suggestion.icon} suggestion-icon"></i>
                <span>${suggestion.text}</span>
            </div>`
        ).join('');
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
}

// Hide search suggestions
function hideSearchSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

// Select suggestion
function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('googleSearch');
    searchInput.value = suggestion;
    hideSearchSuggestions();
    performGoogleSearch();
}

// Sign In functionality
function initializeSignIn() {
    const signInBtn = document.querySelector('.btn-secondary');
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSignInModal();
        });
    }
}

// Show Sign In modal
function showSignInModal() {
    const modal = document.createElement('div');
    modal.className = 'signin-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-logo">
                        <div class="logo-icon">
                            <div class="logo-circle">
                                <img src="./Airbrush-Image-Enhancer-1761540581476-Photoroom.png" alt="My Services logo">
                            </div>
                        </div>
                        <span>My Services</span>
                    </div>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="signin-content">
                        <h3>Welcome Back!</h3>
                        <p>Sign in to your My Services account</p>
                        <form class="signin-form">
                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" placeholder="Enter your password" required>
                            </div>
                            <div class="form-options">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                    Remember me
                                </label>
                                <a href="#" class="forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit" class="signin-btn">Sign In</button>
                        </form>
                        <div class="signin-divider">
                            <span>or</span>
                        </div>
                        <div class="social-signin">
                            <button class="social-btn google-btn">
                                <i class="fab fa-google"></i>
                                Continue with Google
                            </button>
                            <button class="social-btn facebook-btn">
                                <i class="fab fa-facebook"></i>
                                Continue with Facebook
                            </button>
                        </div>
                        <div class="signup-link">
                            <p>Don't have an account? <a href="#" class="signup-link-text">Sign up here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .signin-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }
        .modal-content {
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(30, 60, 114, 0.95) 100%);
            border-radius: 25px;
            max-width: 500px;
            width: 100%;
            border: 1px solid rgba(0, 242, 254, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid rgba(0, 242, 254, 0.2);
        }
        .modal-logo {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
        }
        .logo-icon {
            position: relative;
        }
        .logo-circle {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.4rem;
        }
        .logo-circle img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 6px 18px rgba(102, 126, 234, 0.45));
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #ffffff;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            color: #00f2fe;
            transform: scale(1.1);
        }
        .modal-body {
            padding: 2rem;
        }
        .signin-content h3 {
            color: #ffffff;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-align: center;
        }
        .signin-content p {
            color: #b0b0b0;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        .signin-form {
            margin-bottom: 2rem;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        .form-group input {
            width: 100%;
            padding: 1rem;
            border: 2px solid rgba(0, 242, 254, 0.3);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        .form-group input:focus {
            outline: none;
            border-color: #00f2fe;
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
            background: rgba(255, 255, 255, 0.1);
        }
        .form-group input::placeholder {
            color: #b0b0b0;
        }
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #ffffff;
            cursor: pointer;
            font-size: 0.9rem;
        }
        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        .forgot-password {
            color: #00f2fe;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        .forgot-password:hover {
            color: #ffffff;
        }
        .signin-btn {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .signin-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        .signin-divider {
            text-align: center;
            margin: 2rem 0;
            position: relative;
        }
        .signin-divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: rgba(0, 242, 254, 0.3);
        }
        .signin-divider span {
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(30, 60, 114, 0.95) 100%);
            color: #b0b0b0;
            padding: 0 1rem;
            font-size: 0.9rem;
        }
        .social-signin {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.8rem;
            padding: 1rem;
            border: 2px solid rgba(0, 242, 254, 0.3);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }
        .social-btn:hover {
            background: rgba(0, 242, 254, 0.1);
            border-color: #00f2fe;
            transform: translateY(-2px);
        }
        .google-btn:hover {
            background: rgba(219, 68, 55, 0.1);
            border-color: #db4437;
        }
        .facebook-btn:hover {
            background: rgba(66, 103, 178, 0.1);
            border-color: #4267b2;
        }
        .signup-link {
            text-align: center;
        }
        .signup-link p {
            color: #b0b0b0;
            margin: 0;
        }
        .signup-link-text {
            color: #00f2fe;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .signup-link-text:hover {
            color: #ffffff;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Form submission
    const signinForm = modal.querySelector('.signin-form');
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = modal.querySelector('#email').value;
        const password = modal.querySelector('#password').value;
        
        if (email && password) {
            // Extract name from email (part before @)
            const userName = email.split('@')[0];
            
            // Store user data in localStorage
            localStorage.setItem('jbnUser', JSON.stringify({
                name: userName,
                email: email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            }));
            
            // Update header with user info
            updateHeaderForLoggedInUser(userName);
            
            showNotification(`Welcome back, ${userName}!`, 'success');
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
    
    // Social login buttons
    modal.querySelector('.google-btn').addEventListener('click', function() {
        showNotification('Redirecting to Google...', 'info');
        // Redirect to Gmail
        setTimeout(() => {
            window.open('https://mail.google.com', '_blank');
        }, 1000);
    });
    
    modal.querySelector('.facebook-btn').addEventListener('click', function() {
        showNotification('Redirecting to Facebook...', 'info');
        // Redirect to Facebook
        setTimeout(() => {
            window.open('https://www.facebook.com', '_blank');
        }, 1000);
    });
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }
    });
}

// Check user login status on page load
function checkUserLoginStatus() {
    const userData = localStorage.getItem('jbnUser');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.isLoggedIn) {
            updateHeaderForLoggedInUser(user.name);
        }
    }
}

// Update header for logged in user
function updateHeaderForLoggedInUser(userName) {
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.innerHTML = `
            <div class="user-profile">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <span class="user-name">${userName}</span>
                    <span class="user-status">Online</span>
                </div>
                <div class="user-menu">
                    <button class="profile-btn" onclick="showProfileMenu()">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Add user profile styles
        const style = document.createElement('style');
        style.textContent = `
            .user-profile {
                display: flex;
                align-items: center;
                gap: 1rem;
                background: rgba(0, 242, 254, 0.1);
                padding: 0.5rem 1rem;
                border-radius: 12px;
                border: 1px solid rgba(0, 242, 254, 0.3);
                transition: all 0.3s ease;
            }
            .user-profile:hover {
                background: rgba(0, 242, 254, 0.2);
                transform: translateY(-2px);
            }
            .user-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            .user-info {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }
            .user-name {
                color: #ffffff;
                font-weight: 600;
                font-size: 1rem;
            }
            .user-status {
                color: #00f2fe;
                font-size: 0.8rem;
                font-weight: 500;
            }
            .user-menu {
                position: relative;
            }
            .profile-btn {
                background: none;
                border: none;
                color: #ffffff;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            .profile-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #00f2fe;
            }
            .profile-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(0, 242, 254, 0.3);
                border-radius: 12px;
                padding: 1rem;
                min-width: 200px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: none;
            }
            .profile-dropdown.show {
                display: block;
                animation: slideDown 0.3s ease;
            }
            .profile-dropdown-item {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                padding: 0.8rem;
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                transition: all 0.3s ease;
                cursor: pointer;
                margin-bottom: 0.5rem;
            }
            .profile-dropdown-item:hover {
                background: rgba(0, 242, 254, 0.1);
                color: #00f2fe;
            }
            .profile-dropdown-item:last-child {
                margin-bottom: 0;
                color: #ff6b6b;
            }
            .profile-dropdown-item:last-child:hover {
                background: rgba(255, 107, 107, 0.1);
                color: #ff6b6b;
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show profile menu
function showProfileMenu() {
    const existingDropdown = document.querySelector('.profile-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('jbnUser'));
    const dropdown = document.createElement('div');
    dropdown.className = 'profile-dropdown show';
    dropdown.innerHTML = `
        <div class="profile-dropdown-item" onclick="showUserProfile()">
            <i class="fas fa-user"></i>
            <span>My Profile</span>
        </div>
        <div class="profile-dropdown-item" onclick="showUserSettings()">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </div>
        <div class="profile-dropdown-item" onclick="showUserHistory()">
            <i class="fas fa-history"></i>
            <span>Activity</span>
        </div>
        <div class="profile-dropdown-item" onclick="logoutUser()">
            <i class="fas fa-sign-out-alt"></i>
            <span>Sign Out</span>
        </div>
    `;
    
    const userMenu = document.querySelector('.user-menu');
    userMenu.appendChild(dropdown);
    
    // Close dropdown when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeDropdown(e) {
            if (!userMenu.contains(e.target)) {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            }
        });
    }, 100);
}

// User profile functions
function showUserProfile() {
    const userData = JSON.parse(localStorage.getItem('jbnUser'));
    showNotification(`Profile: ${userData.name} (${userData.email})`, 'info');
}

function showUserSettings() {
    showNotification('Settings panel coming soon!', 'info');
}

function showUserHistory() {
    showNotification('Activity history coming soon!', 'info');
}

// Logout user
function logoutUser() {
    localStorage.removeItem('jbnUser');
    showNotification('You have been signed out.', 'info');
    
    // Reset header to original state
    const navActions = document.querySelector('.nav-actions');
    navActions.innerHTML = `
        <button class="btn-secondary">Sign In</button>
        <button class="btn-primary">Get Started</button>
    `;
    
    // Re-initialize sign in functionality
    initializeSignIn();
}

// Initialize Telegram contact
function initializeTelegramContact() {
    const telegramContact = document.querySelector('.contact-method:has(.fab.fa-telegram)');
    if (telegramContact) {
        telegramContact.addEventListener('click', function(e) {
            // Create click effect
            createContactClickEffect(this, e);
            
            // Open Telegram with username
            setTimeout(() => {
                window.open('https://t.me/Jovliyev_Bobur', '_blank');
                showNotification('Opening Telegram profile...', 'info');
            }, 300);
        });
        
        // Add cursor pointer
        telegramContact.style.cursor = 'pointer';
    }
    
    const githubContact = document.querySelector('.contact-method:has(.fab.fa-github)');
    if (githubContact) {
        githubContact.addEventListener('click', function(e) {
            // Create click effect
            createContactClickEffect(this, e);
            
            // Open GitHub profile
            setTimeout(() => {
                window.open('https://github.com/JBoburHacker005', '_blank');
                showNotification('Opening GitHub profile...', 'info');
            }, 300);
        });
        
        // Add cursor pointer
        githubContact.style.cursor = 'pointer';
    }
    
    const linkedinContact = document.querySelector('.linkedin-contact');
    if (linkedinContact) {
        linkedinContact.addEventListener('click', function(e) {
            // Create click effect
            createContactClickEffect(this, e);
            
            // Open LinkedIn profile
            setTimeout(() => {
                window.open('https://linkedin.com/in/Bobur005', '_blank');
                showNotification('Opening LinkedIn profile...', 'info');
            }, 300);
        });
        
        // Add cursor pointer
        linkedinContact.style.cursor = 'pointer';
    }
    
    const instagramContact = document.querySelector('.instagram-contact');
    if (instagramContact) {
        instagramContact.addEventListener('click', function(e) {
            // Create click effect
            createContactClickEffect(this, e);
            
            // Open Instagram profile
            setTimeout(() => {
                window.open('https://instagram.com/j.bobur005', '_blank');
                showNotification('Opening Instagram profile...', 'info');
            }, 300);
        });
        
        // Add cursor pointer
        instagramContact.style.cursor = 'pointer';
    }
    
    // Email contact
    const emailContact = document.querySelector('.contact-method:has(.fas.fa-envelope)');
    if (emailContact) {
        emailContact.addEventListener('click', function(e) {
            createContactClickEffect(this, e);
            setTimeout(() => {
                window.open('mailto:jbobur005@gmail.com', '_blank');
                showNotification('Opening email client...', 'info');
            }, 300);
        });
        emailContact.style.cursor = 'pointer';
    }
    
    // Phone contact
    const phoneContact = document.querySelector('.contact-method:has(.fas.fa-phone)');
    if (phoneContact) {
        phoneContact.addEventListener('click', function(e) {
            createContactClickEffect(this, e);
            setTimeout(() => {
                window.open('tel:+998930054287', '_blank');
                showNotification('Opening phone dialer...', 'info');
            }, 300);
        });
        phoneContact.style.cursor = 'pointer';
    }
    
    // Add click effects to all contact methods
    const allContactMethods = document.querySelectorAll('.contact-method');
    allContactMethods.forEach(contact => {
        contact.addEventListener('click', function(e) {
            createContactClickEffect(this, e);
        });
    });
}

// Create contact click effect
function createContactClickEffect(element, event) {
    // Create ripple effect
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(0, 242, 254, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'contactRipple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';
    
    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes contactRipple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        .contact-method {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add scale effect
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        ripple.remove();
        document.head.removeChild(style);
    }, 100);
}

// Initialize global click effects
function initializeGlobalClickEffects() {
    // Add click effects to all clickable elements
    document.addEventListener('click', function(e) {
        // Skip if it's a form input or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Create small ripple effect
        createGlobalClickEffect(e);
    });
}

// Create global click effect
function createGlobalClickEffect(event) {
    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'global-ripple';
    
    // Set position and size
    const size = 20; // Small size
    ripple.style.position = 'fixed';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - size / 2) + 'px';
    ripple.style.top = (event.clientY - size / 2) + 'px';
    ripple.style.background = 'rgba(0, 242, 254, 0.4)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'globalRipple 0.4s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    
    // Add global ripple animation styles
    if (!document.querySelector('#global-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'global-ripple-styles';
        style.textContent = `
            @keyframes globalRipple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 400);
}

// Open service function
function openService(serviceName) {
    navigateToServiceSection(serviceName);
    closeModal();
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Initialize technology cards
function initializeTechnologyCards() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            const techName = this.querySelector('span').textContent;
            showTechnologyModal(techName);
        });
    });
}

// Show technology modal
function showTechnologyModal(techName) {
    const techInfo = getTechnologyInfo(techName);
    
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${techName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="service-preview">
                        <div class="preview-icon">
                            <i class="fab fa-${getTechnologyIcon(techName)}"></i>
                        </div>
                        <div class="preview-content">
                            <h4>${techInfo.title}</h4>
                            <p>${techInfo.description}</p>
                            <div class="preview-features">
                                ${techInfo.features.map(feature => `<span>${feature}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles (reuse existing styles)
    const style = document.createElement('style');
    style.textContent = `
        .service-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }
        .modal-content {
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(30, 60, 114, 0.9) 100%);
            border-radius: 25px;
            max-width: 600px;
            width: 100%;
            border: 1px solid rgba(0, 242, 254, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid rgba(0, 242, 254, 0.2);
        }
        .modal-header h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 700;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #ffffff;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            color: #00f2fe;
            transform: scale(1.1);
        }
        .modal-body {
            padding: 2rem;
        }
        .service-preview {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .preview-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .preview-content h4 {
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .preview-content p {
            color: #b0b0b0;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .preview-features {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        .preview-features span {
            background: rgba(0, 242, 254, 0.1);
            color: #00f2fe;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            border: 1px solid rgba(0, 242, 254, 0.3);
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        .modal-actions .btn-primary {
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }
    });
}

// Get technology icon
function getTechnologyIcon(techName) {
    const iconMap = {
        'Python': 'python',
        'JavaScript': 'js',
        'Java': 'java',
        'PHP': 'php',
        'React': 'react',
        'Node.js': 'node-js',
        'Database': 'database',
        'Cloud': 'cloud',
        'macOS': 'apple',
        'Linux': 'linux',
        'Windows': 'windows',
        'Docker': 'docker'
    };
    return iconMap[techName] || 'code';
}

// Get technology information
function getTechnologyInfo(techName) {
    const techData = {
        'Python': {
            title: 'Python Programming',
            description: 'A versatile, high-level programming language known for its simplicity and readability. Widely used in web development, data science, AI, and automation.',
            features: ['Easy to Learn', 'Data Science', 'Web Development', 'AI/ML']
        },
        'JavaScript': {
            title: 'JavaScript Development',
            description: 'The language of the web! JavaScript powers interactive websites and modern web applications. Essential for frontend and full-stack development.',
            features: ['Web Development', 'Frontend Frameworks', 'Node.js Backend', 'Real-time Apps']
        },
        'Java': {
            title: 'Java Programming',
            description: 'A robust, object-oriented programming language used for enterprise applications, Android development, and large-scale systems.',
            features: ['Enterprise Apps', 'Android Development', 'Cross-platform', 'High Performance']
        },
        'PHP': {
            title: 'PHP Development',
            description: 'A server-side scripting language designed for web development. Powers many popular websites and content management systems.',
            features: ['Web Development', 'WordPress', 'E-commerce', 'Server-side Logic']
        },
        'React': {
            title: 'React Framework',
            description: 'A powerful JavaScript library for building user interfaces. Created by Facebook, it\'s widely used for creating interactive web applications.',
            features: ['Component-based', 'Virtual DOM', 'Hooks', 'Ecosystem']
        },
        'Node.js': {
            title: 'Node.js Runtime',
            description: 'A JavaScript runtime built on Chrome\'s V8 engine. Enables server-side JavaScript development and real-time applications.',
            features: ['Server-side JS', 'Real-time Apps', 'NPM Ecosystem', 'Scalable']
        },
        'Database': {
            title: 'Database Management',
            description: 'Expertise in database design, optimization, and management. Experience with SQL and NoSQL databases for various applications.',
            features: ['SQL/NoSQL', 'Data Modeling', 'Performance Tuning', 'Backup & Recovery']
        },
        'Cloud': {
            title: 'Cloud Computing',
            description: 'Experience with cloud platforms and services for scalable, reliable, and cost-effective application deployment and management.',
            features: ['AWS/Azure/GCP', 'Scalability', 'DevOps', 'Microservices']
        },
        'macOS': {
            title: 'macOS Development',
            description: 'Proficient in macOS development and optimization. Experience with Apple ecosystem and native application development.',
            features: ['Native Apps', 'Apple Ecosystem', 'Performance', 'User Experience']
        },
        'Linux': {
            title: 'Linux Administration',
            description: 'Expertise in Linux system administration, server management, and command-line operations for robust server environments.',
            features: ['System Admin', 'Server Management', 'Command Line', 'Security']
        },
        'Windows': {
            title: 'Windows Development',
            description: 'Experience with Windows platform development, system administration, and enterprise solutions for Windows environments.',
            features: ['Windows Apps', 'Enterprise Solutions', 'System Admin', 'Integration']
        },
        'Docker': {
            title: 'Containerization',
            description: 'Expertise in Docker containerization for application deployment, scaling, and management in modern development workflows.',
            features: ['Containerization', 'DevOps', 'Microservices', 'Scalability']
        }
    };
    
    return techData[techName] || {
        title: 'Technology',
        description: 'This technology is part of our comprehensive tech stack.',
        features: ['Modern', 'Reliable', 'Scalable', 'Efficient']
    };
}

// Add click effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .service-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Live Clock functionality
function initializeLiveClock() {
    const timeElement = document.getElementById('header-time');
    if (!timeElement) return;
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
    
    // Update immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
}

// Certificate opening functionality
function openCertificate(pdfPath, certificateName) {
    try {
        // Try to open the PDF in a new tab
        const newWindow = window.open(pdfPath, '_blank');
        
        if (newWindow) {
            // Success - show notification
            showNotification(`Opening ${certificateName} certificate...`, 'success');
            
            // Add click effect to the certificate card
            const clickedCard = event.currentTarget;
            createCertificateClickEffect(clickedCard);
        } else {
            // Popup was blocked - try alternative method
            showCertificateModal(pdfPath, certificateName);
        }
    } catch (error) {
        console.error('Error opening certificate:', error);
        // Fallback to modal
        showCertificateModal(pdfPath, certificateName);
    }
}

// Show certificate in modal if popup is blocked
function showCertificateModal(pdfPath, certificateName) {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${certificateName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="certificate-preview">
                        <div class="certificate-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <div class="certificate-info">
                            <h4>${certificateName}</h4>
                            <p>Click the button below to view or download the certificate PDF.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="downloadCertificate('${pdfPath}', '${certificateName}')">
                            <i class="fas fa-download"></i>
                            Download PDF
                        </button>
                        <button class="btn-secondary" onclick="tryOpenCertificate('${pdfPath}', '${certificateName}')">
                            <i class="fas fa-external-link-alt"></i>
                            Try Opening Again
                        </button>
                        <button class="btn-secondary" onclick="closeCertificateModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .certificate-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }
        .modal-content {
            background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(30, 60, 114, 0.95) 100%);
            border-radius: 25px;
            max-width: 500px;
            width: 100%;
            border: 1px solid rgba(0, 242, 254, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid rgba(0, 242, 254, 0.2);
        }
        .modal-header h3 {
            margin: 0;
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 700;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #ffffff;
            transition: all 0.3s ease;
        }
        .close-modal:hover {
            color: #00f2fe;
            transform: scale(1.1);
        }
        .modal-body {
            padding: 2rem;
        }
        .certificate-preview {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .certificate-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .certificate-info h4 {
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .certificate-info p {
            color: #b0b0b0;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        .modal-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .modal-actions .btn-primary,
        .modal-actions .btn-secondary {
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .modal-actions .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .modal-actions .btn-secondary {
            background: transparent;
            color: #00f2fe;
            border: 2px solid #00f2fe;
        }
        .modal-actions .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        .modal-actions .btn-secondary:hover {
            background: rgba(0, 242, 254, 0.1);
            transform: translateY(-2px);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        closeCertificateModal();
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeCertificateModal();
        }
    });
}

// Download certificate function
function downloadCertificate(pdfPath, certificateName) {
    try {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = `${certificateName}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Downloading ${certificateName} certificate...`, 'success');
        closeCertificateModal();
    } catch (error) {
        console.error('Error downloading certificate:', error);
        showNotification('Error downloading certificate. Please try again.', 'error');
    }
}

// Try opening certificate again
function tryOpenCertificate(pdfPath, certificateName) {
    closeCertificateModal();
    openCertificate(pdfPath, certificateName);
}

// Close certificate modal
function closeCertificateModal() {
    const modal = document.querySelector('.certificate-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// Create click effect for certificate cards
function createCertificateClickEffect(element) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 242, 254, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'certificateRipple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';
    
    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes certificateRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .certification-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add scale effect
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        ripple.remove();
        document.head.removeChild(style);
    }, 100);
}

// Weather functionality
function initializeWeather() {
    const tempElement = document.getElementById('header-weather-temp');
    const descElement = document.getElementById('header-weather-desc');
    
    if (!tempElement || !descElement) return;
    
    // Default location (Tashkent, Uzbekistan)
    const lat = 41.2995;
    const lon = 69.2401;
    
    // OpenWeatherMap API (free tier)
    const apiKey = 'demo'; // In production, use a real API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    // Fallback weather data (since we don't have a real API key)
    function showFallbackWeather() {
        const weatherData = [
            { temp: '22°C', desc: 'Sunny' },
            { temp: '18°C', desc: 'Cloudy' },
            { temp: '25°C', desc: 'Clear' },
            { temp: '20°C', desc: 'Partly Cloudy' }
        ];
        
        const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
        tempElement.textContent = randomWeather.temp;
        descElement.textContent = randomWeather.desc;
    }
    
    // Try to fetch real weather data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('API Error');
            return response.json();
        })
        .then(data => {
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
            descElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.log('Using fallback weather data');
            showFallbackWeather();
        });
    
    // Update weather every 10 minutes
    setInterval(showFallbackWeather, 600000);
}