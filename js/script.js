document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
    });
  });
  
  // Dynamic text animation
  const dynamicText = document.querySelector('.dynamic-text');
  if (dynamicText) {
    const texts = JSON.parse(dynamicText.getAttribute('data-text'));
    let currentIndex = 0;
    
    function typeWriter(text, i, callback) {
      if (i < text.length) {
        dynamicText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        setTimeout(() => typeWriter(text, i + 1, callback), 100);
      } else if (typeof callback === 'function') {
        setTimeout(callback, 1500);
      }
    }
    
    function startTextAnimation() {
      typeWriter(texts[currentIndex], 0, function() {
        setTimeout(() => deleteText(currentIndex), 1500);
      });
    }
    
    function deleteText(index) {
      const text = texts[index];
      let i = text.length;
      
      const timer = setInterval(() => {
        if (i >= 0) {
          dynamicText.innerHTML = text.substring(0, i) + '<span class="cursor">|</span>';
          i--;
        } else {
          clearInterval(timer);
          currentIndex = (currentIndex + 1) % texts.length;
          startTextAnimation();
        }
      }, 50);
    }
    
    startTextAnimation();
  }
  
  // Animate progress bars when scrolled into view
  const progressBars = document.querySelectorAll('.progress-fill');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        bar.classList.add('animate');
      }
    });
  }
  
  // Initialize progress bars
  if (progressBars.length > 0) {
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Run once on load
  }
  
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formStatus = document.getElementById('formStatus');
      if (formStatus) {
        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
        formStatus.style.color = 'var(--success)';
        formStatus.classList.add('fade-in');
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('fade-in');
        }, 5000);
      }
    });
  }
  
  // Add fade-in animation to elements when scrolled into view
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize fade elements
  if (fadeElements.length > 0) {
    // Set initial state
    fadeElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Run once on load
  }
  
  // Add hover effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.add('btn-hover-effect');
  });
  
  // Initialize particles.js if available
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'js/particles.json', function() {
      console.log('Particles.js loaded');
    });
  }
});