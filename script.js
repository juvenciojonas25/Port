// Theme Toggle
const modeToggle = document.getElementById('modeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

modeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Navigation Toggle (Mobile)
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Animate skill bars when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate tech progress bars
            const techItems = entry.target.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                const skillLevel = item.getAttribute('data-skill');
                const progressBar = item.querySelector('.tech-progress');
                setTimeout(() => {
                    progressBar.style.width = skillLevel + '%';
                }, 200);
            });

            // Animate matrix cells
            const matrixCells = entry.target.querySelectorAll('.matrix-cell');
            matrixCells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.style.transform = 'scale(1)';
                    cell.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize matrix cells
document.querySelectorAll('.matrix-cell').forEach(cell => {
    cell.style.transform = 'scale(0.8)';
    cell.style.opacity = '0';
    cell.style.transition = 'all 0.3s ease';
});

// Initialize tech progress bars
document.querySelectorAll('.tech-progress').forEach(bar => {
    bar.style.width = '0';
});

// Form submission with Formspree
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;

    submitBtn.querySelector('span').textContent = 'TRANSMITINDO...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('https://formspree.io/f/manvadrz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            submitBtn.querySelector('span').textContent = 'TRANSMITIDO!';
            submitBtn.style.background = 'linear-gradient(45deg, #28ca42, #00ff88)';
            contactForm.reset();
        } else {
            submitBtn.querySelector('span').textContent = 'ERRO!';
            submitBtn.style.background = 'linear-gradient(45deg, #ff4b4b, #ff0000)';
        }
    } catch (error) {
        submitBtn.querySelector('span').textContent = 'ERRO!';
        submitBtn.style.background = 'linear-gradient(45deg, #ff4b4b, #ff0000)';
        console.error(error);
    }

    setTimeout(() => {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.background = 'linear-gradient(45deg, var(--neon-cyan), var(--neon-purple))';
        submitBtn.disabled = false;
    }, 2000);
});

// Terminal typing effect
function initTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    const commands = [
        'whoami',
        'cat specialty.txt', 
        'find ./projects -name "*.java" | wc -l',
        'ls -la skills/',
        'grep -r "microservices" ./experience/'
    ];
    
    const outputs = [
        'juvencio_miambo - backend_architect',
        'API Design • Microservices • System Architecture • Database Optimization',
        '15000+',
        'java spring sql docker kubernetes aws redis',
        '2022: Microservices Architecture @TechStartup\n2023: Distributed Systems @Freelance'
    ];
    
    let currentIndex = 0;
    
    function typeNextCommand() {
        if (currentIndex < commands.length) {
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `
                <span class="prompt">$</span>
                <span class="command">${commands[currentIndex]}</span>
            `;
            
            terminalBody.appendChild(commandLine);
            
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-output';
                outputLine.textContent = outputs[currentIndex];
                terminalBody.appendChild(outputLine);
                
                currentIndex++;
                setTimeout(typeNextCommand, 1000);
            }, 800);
        }
    }
    
    setTimeout(typeNextCommand, 1000);
}

document.addEventListener('DOMContentLoaded', initTerminal);

// Scroll effect for nav
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.neo-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// Cyber buttons hover + click links
document.querySelectorAll('.cyber-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    if (btn.classList.contains('primary')) {
        btn.addEventListener('click', () => {
            window.location.href = '#projects';
        });
    }
    if (btn.classList.contains('secondary')) {
        btn.addEventListener('click', () => {
            window.location.href = '#contact';
        });
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection observer for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.manifesto-card, .system-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    cardObserver.observe(card);
});

// FadeInUp CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
