/**
 * Najeeba Landing Page
 * Interactive features: scroll animations, smooth scrolling, counter animation
 */

(function() {
  'use strict';

  // ========================================
  // SMOOTH SCROLLING FOR NAVIGATION
  // ========================================
  function initSmoothScroll() {
    const heroCta = document.getElementById('heroCta');
    if (heroCta) {
      heroCta.addEventListener('click', function(e) {
        e.preventDefault();
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Any internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ========================================
  // FADE-IN ON SCROLL (INTERSECTION OBSERVER)
  // ========================================
  function initScrollAnimations() {
    // Add fade-in class to all sections and cards we want to animate
    const elementsToAnimate = [
      '.feature-card',
      '.transform-card',
      '.value-item',
      '.stat-card',
      '.testimonial-quote',
      '.offer-card'
    ];

    const animatedElements = document.querySelectorAll(elementsToAnimate.join(','));
    
    animatedElements.forEach(el => {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Once visible, stop observing
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ========================================
  // COUNTER ANIMATION FOR STATS
  // ========================================
  function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetValue = parseFloat(element.getAttribute('data-target'));
          const isFloat = targetValue % 1 !== 0;
          
          if (!isNaN(targetValue)) {
            let currentValue = 0;
            const duration = 1500; // milliseconds
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = targetValue / steps;
            
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
              }
              
              if (isFloat) {
                element.textContent = currentValue.toFixed(1);
              } else {
                element.textContent = Math.floor(currentValue);
              }
            }, stepTime);
          }
          
          counterObserver.unobserve(element);
        }
      });
    }, {
      threshold: 0.5
    });

    statNumbers.forEach(stat => {
      counterObserver.observe(stat);
    });
  }

  // ========================================
  // NAVBAR SCROLL EFFECT (optional: add shadow on scroll)
  // ========================================
  function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.borderBottomColor = 'var(--gray-300)';
      } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'var(--gray-200)';
      }
    });
  }

  // ========================================
  // INITIALIZE ALL FUNCTIONS
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initNavbarEffect();
  });
})();