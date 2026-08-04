document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     MOBILE HAMBURGER MENU
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ==========================================
     NAVBAR SCROLL STATE
     ========================================== */
  const navbar = document.getElementById('navbar');
  const checkScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check on load

  /* ==========================================
     TYPING ANIMATION
     ========================================== */
  const typingText = document.getElementById('typing-text');
  const roles = [
    'Frontend Developer',
    'Web Developer',
    'B.Tech IT Student'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // Faster deleting
    } else {
      typingText.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100; // Normal typing
    }

    // Logic for transitioning stages
    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at full text
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 300; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ==========================================
     INTERSECTION OBSERVER: SCROLL REVEAL
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing to make animations run once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));



  /* ==========================================
     INTERSECTION OBSERVER: SCROLL SPY ACTIVE NAV
     ========================================== */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -40% 0px'
  });

  sections.forEach(sec => scrollSpyObserver.observe(sec));

  /* ==========================================
     INTERACTIVE PARTICLES CANVAS BACKGROUND & BUBBLE TRAIL
     ========================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let symbolsArray = [];
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // Coding symbols trail on mouse movement
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      symbolsArray.push(new CodeSymbol(mouse.x, mouse.y));
    });

    // Mobile touch support to emit symbols and push particles
    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        symbolsArray.push(new CodeSymbol(mouse.x, mouse.y));
      }
    }, { passive: true });

    window.addEventListener('touchstart', (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        symbolsArray.push(new CodeSymbol(mouse.x, mouse.y));
      }
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();

    // Background Particle Class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 3;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 3;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 3;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 3;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Interactive Code Symbol Class for Mouse Trail
    class CodeSymbol {
      constructor(x, y) {
        this.x = x;
        this.y = y;

        // Array of coding symbols
        const symbols = ['0', '1', '{', '}', '<', '>', ';', '[]', '()', '&&', '||', 'fn', '=>', 'git', 'npm', 'js', 'html', '$', '!=', '=='];
        this.text = symbols[Math.floor(Math.random() * symbols.length)];

        this.size = Math.random() * 7 + 12; // Font size 12px to 19px
        this.speedX = (Math.random() * 0.4) - 0.2; // very gentle horizontal drift
        this.speedY = (Math.random() * -0.5) - 0.15; // very slow upward float

        // Randomly color symbols with one of the primary colors
        const colors = [
          'rgba(56, 189, 248, ', // cyan
          'rgba(124, 58, 237, ', // purple
          'rgba(6, 182, 212, '   // accent
        ];
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = 1.0;
        this.rotation = Math.random() * Math.PI * 0.15 - Math.PI * 0.075; // very gentle random rotation
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw glow effect for text symbols
        ctx.shadowColor = `${this.colorPrefix}0.6)`;
        ctx.shadowBlur = 6;

        ctx.fillStyle = `${this.colorPrefix}1.0)`;
        ctx.font = `bold ${this.size}px 'Courier New', monospace`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.0055; // stays visible for ~3 seconds for readability
        this.draw();
      }
    }

    // Initialize Particles
    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 14000, 75);

      const particleColors = [
        'rgba(37, 99, 235, 0.25)',
        'rgba(124, 58, 237, 0.25)',
        'rgba(6, 182, 212, 0.25)'
      ];

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 1.5;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = particleColors[Math.floor(Math.random() * particleColors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    // Connect lines between nearby background particles
    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            opacityValue = 1 - (distance / 110);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Loop
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update background particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();

      // Update and draw interactive code symbols
      for (let i = 0; i < symbolsArray.length; i++) {
        symbolsArray[i].update();

        // Remove dead symbols
        if (symbolsArray[i].opacity <= 0) {
          symbolsArray.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  /* ==========================================
     CONTACT FORM HANDLING (PREMIUM FEEDBACK)
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const btnSubmit = document.getElementById('btn-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Reset Status
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Simple validation
      if (!name || !email || !subject || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showStatus('Please provide a valid email address.', 'error');
        return;
      }

      // Sending action URL check
      const actionUrl = contactForm.getAttribute('action');
      const originalBtnContent = btnSubmit.innerHTML;

      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';
      btnSubmit.innerHTML = '<span>Sending message...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';

      if (actionUrl && actionUrl.includes('formsubmit.co/ajax/')) {
        // Submit using AJAX to FormSubmit.co using FormData (sends fields in email)
        const formData = new FormData(contactForm);

        fetch(actionUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        })
          .then(response => {
            if (response.ok) {
              showStatus('Thank you! Your message has been sent successfully. (Note: If this is the first submission, check your email inbox to activate FormSubmit!).', 'success');
              contactForm.reset();
            } else {
              response.json().then(data => {
                if (data && data.message) {
                  showStatus(data.message, 'error');
                } else {
                  showStatus('Oops! There was a problem submitting your form.', 'error');
                }
              });
            }
          })
          .catch(error => {
            showStatus('Oops! There was a network problem. Please check your internet connection.', 'error');
          })
          .finally(() => {
            // Reset button
            btnSubmit.disabled = false;
            btnSubmit.style.opacity = '1';
            btnSubmit.innerHTML = originalBtnContent;

            setTimeout(() => {
              formStatus.style.display = 'none';
            }, 8000);
          });
      } else {
        // Fallback simulation if no valid form endpoint is configured
        setTimeout(() => {
          showStatus('Thank you! Form submitted successfully (Simulation). To receive real emails in your inbox, set your form action URL in index.html!', 'success');
          contactForm.reset();

          btnSubmit.disabled = false;
          btnSubmit.style.opacity = '1';
          btnSubmit.innerHTML = originalBtnContent;

          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 8000);
        }, 1500);
      }
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    // Smooth scroll down to the status element if not visible
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
