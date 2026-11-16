/**
 * A M Nakeeb - Royal Enfield Heritage Theme JavaScript
 * Classic Motorcycle Ignition Loader, Fuel Gauge Progress, Typewriter, & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initEngineLoader();
  initFuelGauge();
  init3DBackground();
  initCard3DTilt();
  initHeroViewToggle();
  initTypewriter();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initPlaceholderLinks();
  initBackToTop();
});

/* ==========================================================================
   1. Speedometer "Engine Start" Ignition Loader
   ========================================================================== */
function initEngineLoader() {
  const loader = document.getElementById('engine-loader');
  if (!loader) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    loader.classList.add('hidden');
    return;
  }

  // Allow the needle sweep and odometer ignition to play then smoothly reveal page
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1600);
}

/* ==========================================================================
   2. Fuel Gauge / Odometer Scroll Progress Bar
   ========================================================================== */
function initFuelGauge() {
  const fuelBar = document.getElementById('fuel-gauge-bar');
  if (!fuelBar) return;

  function updateFuelLevel() {
    const scrollY = window.pageYOffset;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
    fuelBar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateFuelLevel, { passive: true });
  updateFuelLevel();
}

/* ==========================================================================
   3. Rotating Tagline Effect
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typed-text');
  if (!targetElement) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targetElement.textContent = 'AI/ML Student • Python Developer • Aspiring Software Developer';
    return;
  }

  const phrases = [
    'AI/ML Student',
    'Python Developer',
    'Aspiring Software Developer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      targetElement.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 45;
    } else {
      charIndex++;
      targetElement.textContent = currentPhrase.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 420;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (!toggleBtn || !mobileNav) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);

    const svg = toggleBtn.querySelector('svg');
    if (svg) {
      svg.innerHTML = isOpen 
        ? '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
        : '<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target) && mobileNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/* ==========================================================================
   5. ScrollSpy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    const markActive = (links) => {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    markActive(desktopLinks);
    markActive(mobileLinks);
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   6. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. Smooth Scrolling
   ========================================================================== */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        history.pushState(null, '', targetId);
      }
    });
  });
}

/* ==========================================================================
   8. Contact Form Handling & Fallback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  const emailFallbackBtn = document.getElementById('email-fallback-btn');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
      const email = form.elements['email'] ? form.elements['email'].value.trim() : '';
      const subject = form.elements['subject'] ? form.elements['subject'].value.trim() : 'Software Developer Opportunity';
      const message = form.elements['message'] ? form.elements['message'].value.trim() : '';

      if (!name || !email || !message) {
        showStatus('Please complete all dispatch fields.', 'error');
        return;
      }

      const formAction = form.getAttribute('action');

      if (!formAction || formAction.includes('YOUR_FORMSPREE_ENDPOINT')) {
        showStatus('Formspree endpoint placeholder active. Launching default email client fallback...', 'success');
        setTimeout(() => {
          triggerMailto(name, email, subject, message);
        }, 1200);
        return;
      }

      try {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const response = await fetch(formAction, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          showStatus('Dispatch received! I will reply shortly.', 'success');
        } else {
          showStatus('Transmission failed. Please reach out directly via nakeeb.201@gmail.com.', 'error');
        }
      } catch (err) {
        showStatus('Network error. Launching email client fallback...', 'error');
        setTimeout(() => {
          triggerMailto(name, email, subject, message);
        }, 1200);
      } finally {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  if (emailFallbackBtn) {
    emailFallbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = form ? form.elements['name'].value.trim() : '';
      const email = form ? form.elements['email'].value.trim() : '';
      const subject = form ? form.elements['subject'].value.trim() : '';
      const message = form ? form.elements['message'].value.trim() : '';
      triggerMailto(name, email, subject, message);
    });
  }

  function triggerMailto(name, email, subject, message) {
    const sub = encodeURIComponent(subject || 'Inquiry from Portfolio');
    const bodyContent = encodeURIComponent(
      `Hi Nakeeb,\n\n${message || 'I would like to discuss a Software Developer role.'}\n\nFrom: ${name || 'Prospective Employer / Recruiter'}\nEmail: ${email || 'Not specified'}`
    );
    window.location.href = `mailto:nakeeb.201@gmail.com?subject=${sub}&body=${bodyContent}`;
  }

  function showStatus(msg, type) {
    if (!statusDiv) return;
    statusDiv.textContent = msg;
    statusDiv.className = `form-status ${type}`;
    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   9. Placeholder Link Toasts
   ========================================================================== */
function initPlaceholderLinks() {
  const placeholderLinks = document.querySelectorAll('[data-placeholder]');
  const toast = document.getElementById('toast');

  let toastTimeout;
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const placeholderText = link.getAttribute('data-placeholder') || 'Link to be configured';
      showToast(`ℹ️ ${placeholderText}`);
    });
  });
}

/* ==========================================================================
   10. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   11. Hero Background View Switcher (3D Design vs Garage Photo)
   ========================================================================== */
function initHeroViewToggle() {
  const btn3D = document.getElementById('btn-toggle-3d');
  const btnPhoto = document.getElementById('btn-toggle-photo');
  if (!btn3D || !btnPhoto) return;

  btn3D.addEventListener('click', () => {
    document.body.classList.remove('photo-mode-active');
    btn3D.classList.add('active');
    btnPhoto.classList.remove('active');
  });

  btnPhoto.addEventListener('click', () => {
    document.body.classList.add('photo-mode-active');
    btnPhoto.classList.add('active');
    btn3D.classList.remove('active');
  });
}

/* ==========================================================================
   12. Interactive 3D Card Tilt with Holographic Metallic Depth
   ========================================================================== */
function initCard3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.tank-badge-card, .project-badge-card, .skill-console-card, .vin-plate-card, .info-plate');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const maxTilt = 7;
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ==========================================================================
   13. Persistent Interactive 3D Background Engine: Royal Enfield Bullet 350
   Full 3D Vector Geometry, Rotating Spoke Wheels, Engine Block, & Cyber Road
   ========================================================================== */
function init3DBackground() {
  const canvas = document.getElementById('bg-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    cx = width / 2;
    cy = height / 2;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // 3D Scene Interactive Orbit & Touch Drag Controls
  let rotX = -0.12;
  let rotY = 0.52;
  let rotZ = 0;
  let targetRotX = rotX;
  let targetRotY = rotY;
  let autoYaw = 0.45;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let scrollOffsetZ = 0;

  // Pointer & Drag Controls for 360° Free Orbit
  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, textarea, label')) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      targetRotY += dx * 0.007;
      targetRotX -= dy * 0.007;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    } else {
      const ny = (e.clientY - cy) / cy;
      targetRotX = rotX + (-ny * 0.12);
    }
  }, { passive: true });

  window.addEventListener('pointerup', () => { isDragging = false; });
  window.addEventListener('pointercancel', () => { isDragging = false; });

  // Scroll advances depth and gentle bank
  window.addEventListener('scroll', () => {
    const scrollFrac = window.pageYOffset / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    scrollOffsetZ = scrollFrac * 120;
  }, { passive: true });

  // 3D Perspective Projection
  const focalLength = 540;
  const cameraZ = 680;

  function rotate3D(x, y, z, ax, ay, az) {
    const cosX = Math.cos(ax), sinX = Math.sin(ax);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    const cosY = Math.cos(ay), sinY = Math.sin(ay);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    const cosZ = Math.cos(az), sinZ = Math.sin(az);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;

    return { x: x3, y: y3, z: z2 };
  }

  function project3D(x, y, z) {
    const depth = focalLength + z + cameraZ + scrollOffsetZ;
    if (depth <= 20) return null;
    const scale = focalLength / depth;
    return {
      x: cx + x * scale,
      y: cy + y * scale,
      scale: scale,
      depth: depth
    };
  }

  // --- BUILD THE ROYAL ENFIELD BULLET 350cc 3D WIREFRAME MESH ---
  function buildBullet350(wheelSpinAngle) {
    const lines = [];

    function addLine(p1, p2, type = 'chassis') {
      lines.push({ p1, p2, type });
    }

    function addCircle(center, radius, normalAxis, segments, zOffset = 0, type = 'wheel') {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        if (normalAxis === 'z') {
          pts.push({
            x: center.x + Math.cos(theta) * radius,
            y: center.y + Math.sin(theta) * radius,
            z: center.z + zOffset
          });
        }
      }
      for (let i = 0; i < pts.length - 1; i++) {
        addLine(pts[i], pts[i + 1], type);
      }
      return pts;
    }

    // 1. FRONT WHEEL & 24 ROTATING SPOKES (19-inch Classic Spoke Wheel)
    const frontAxle = { x: 185, y: 65, z: 0 };
    const frontRadius = 76;
    const frontRimRadius = 68;
    const frontHubRadius = 16;

    const fRimL = addCircle(frontAxle, frontRimRadius, 'z', 20, -7, 'wheel');
    const fRimR = addCircle(frontAxle, frontRimRadius, 'z', 20, +7, 'wheel');
    const fTireL = addCircle(frontAxle, frontRadius, 'z', 20, -9, 'wheel');
    const fTireR = addCircle(frontAxle, frontRadius, 'z', 20, +9, 'wheel');

    for (let i = 0; i < 20; i += 4) {
      addLine(fRimL[i], fRimR[i], 'wheel');
      addLine(fTireL[i], fTireR[i], 'wheel');
    }

    const fHubL = addCircle(frontAxle, frontHubRadius, 'z', 12, -12, 'engine');
    const fHubR = addCircle(frontAxle, frontHubRadius, 'z', 12, +12, 'engine');
    addLine({ x: frontAxle.x, y: frontAxle.y, z: -16 }, { x: frontAxle.x, y: frontAxle.y, z: +16 }, 'engine');

    const spokeCount = 20;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2 + wheelSpinAngle;
      const rimPt = {
        x: frontAxle.x + Math.cos(angle) * frontRimRadius,
        y: frontAxle.y + Math.sin(angle) * frontRimRadius,
        z: (i % 2 === 0 ? -6 : +6)
      };
      const hubAngle = angle + (i % 2 === 0 ? 0.35 : -0.35);
      const hubPt = {
        x: frontAxle.x + Math.cos(hubAngle) * frontHubRadius,
        y: frontAxle.y + Math.sin(hubAngle) * frontHubRadius,
        z: (i % 2 === 0 ? -11 : +11)
      };
      addLine(hubPt, rimPt, 'wheel');
    }

    // Front Mudguard (Deep Classic Arch with stays)
    const fFenderPtsL = [];
    const fFenderPtsR = [];
    for (let a = -0.6; a <= 2.2; a += 0.28) {
      const fx = frontAxle.x + Math.cos(a) * (frontRadius + 8);
      const fy = frontAxle.y - Math.sin(a) * (frontRadius + 8);
      fFenderPtsL.push({ x: fx, y: fy, z: -11 });
      fFenderPtsR.push({ x: fx, y: fy, z: +11 });
    }
    for (let i = 0; i < fFenderPtsL.length - 1; i++) {
      addLine(fFenderPtsL[i], fFenderPtsL[i + 1], 'accent');
      addLine(fFenderPtsR[i], fFenderPtsR[i + 1], 'accent');
      if (i % 2 === 0) addLine(fFenderPtsL[i], fFenderPtsR[i], 'accent');
    }
    addLine({ x: frontAxle.x, y: frontAxle.y, z: -14 }, fFenderPtsL[1], 'chassis');
    addLine({ x: frontAxle.x, y: frontAxle.y, z: +14 }, fFenderPtsR[1], 'chassis');
    addLine({ x: frontAxle.x, y: frontAxle.y, z: -14 }, fFenderPtsL[fFenderPtsL.length - 2], 'chassis');
    addLine({ x: frontAxle.x, y: frontAxle.y, z: +14 }, fFenderPtsR[fFenderPtsR.length - 2], 'chassis');

    // 2. REAR WHEEL & ROTATING SPOKES (18-inch Classic Drum Wheel)
    const rearAxle = { x: -180, y: 68, z: 0 };
    const rearRadius = 72;
    const rearRimRadius = 64;
    const rearHubRadius = 22;

    const rRimL = addCircle(rearAxle, rearRimRadius, 'z', 20, -9, 'wheel');
    const rRimR = addCircle(rearAxle, rearRimRadius, 'z', 20, +9, 'wheel');
    const rTireL = addCircle(rearAxle, rearRadius, 'z', 20, -12, 'wheel');
    const rTireR = addCircle(rearAxle, rearRadius, 'z', 20, +12, 'wheel');

    for (let i = 0; i < 20; i += 4) {
      addLine(rRimL[i], rRimR[i], 'wheel');
      addLine(rTireL[i], rTireR[i], 'wheel');
    }

    addCircle(rearAxle, rearHubRadius, 'z', 14, -14, 'engine');
    addCircle(rearAxle, rearHubRadius - 4, 'z', 12, +14, 'engine');

    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2 + wheelSpinAngle;
      const rimPt = {
        x: rearAxle.x + Math.cos(angle) * rearRimRadius,
        y: rearAxle.y + Math.sin(angle) * rearRimRadius,
        z: (i % 2 === 0 ? -8 : +8)
      };
      const hubAngle = angle + (i % 2 === 0 ? 0.35 : -0.35);
      const hubPt = {
        x: rearAxle.x + Math.cos(hubAngle) * (rearHubRadius - 2),
        y: rearAxle.y + Math.sin(hubAngle) * (rearHubRadius - 2),
        z: (i % 2 === 0 ? -13 : +13)
      };
      addLine(hubPt, rimPt, 'wheel');
    }

    // Rear Mudguard (Deep Vintage Fender & Tail Lamp)
    const rFenderPtsL = [];
    const rFenderPtsR = [];
    for (let a = 0.8; a <= 3.4; a += 0.28) {
      const rx = rearAxle.x + Math.cos(a) * (rearRadius + 8);
      const ry = rearAxle.y - Math.sin(a) * (rearRadius + 8);
      rFenderPtsL.push({ x: rx, y: ry, z: -13 });
      rFenderPtsR.push({ x: rx, y: ry, z: +13 });
    }
    for (let i = 0; i < rFenderPtsL.length - 1; i++) {
      addLine(rFenderPtsL[i], rFenderPtsL[i + 1], 'accent');
      addLine(rFenderPtsR[i], rFenderPtsR[i + 1], 'accent');
      if (i % 2 === 0) addLine(rFenderPtsL[i], rFenderPtsR[i], 'accent');
    }

    const tailLampPos = rFenderPtsL[rFenderPtsL.length - 1];
    addCircle({ x: tailLampPos.x - 4, y: tailLampPos.y + 4, z: 0 }, 6, 'z', 8, 0, 'accent');
    addLine({ x: tailLampPos.x - 4, y: tailLampPos.y + 10, z: -10 }, { x: tailLampPos.x - 4, y: tailLampPos.y + 10, z: +10 }, 'chassis');

    // 3. FRONT TELESCOPIC FORK & CASQUETTE (Nacelle)
    const forkTop = { x: 122, y: -72, z: 0 };
    const forkLeftAxle = { x: frontAxle.x, y: frontAxle.y, z: -17 };
    const forkRightAxle = { x: frontAxle.x, y: frontAxle.y, z: +17 };
    const forkLeftTop = { x: forkTop.x, y: forkTop.y, z: -17 };
    const forkRightTop = { x: forkTop.x, y: forkTop.y, z: +17 };

    addLine(forkLeftAxle, forkLeftTop, 'chassis');
    addLine(forkRightAxle, forkRightTop, 'chassis');

    for (let g = 0.25; g <= 0.65; g += 0.1) {
      const gx = frontAxle.x + (forkTop.x - frontAxle.x) * g;
      const gy = frontAxle.y + (forkTop.y - frontAxle.y) * g;
      addCircle({ x: gx, y: gy, z: -17 }, 6, 'z', 8, 0, 'engine');
      addCircle({ x: gx, y: gy, z: +17 }, 6, 'z', 8, 0, 'engine');
    }

    addLine({ x: forkTop.x + 3, y: forkTop.y + 16, z: -19 }, { x: forkTop.x + 3, y: forkTop.y + 16, z: +19 }, 'chassis');
    addLine({ x: forkTop.x - 2, y: forkTop.y, z: -19 }, { x: forkTop.x - 2, y: forkTop.y, z: +19 }, 'chassis');

    // Royal Enfield Casquette
    const casquetteCenter = { x: 134, y: -78, z: 0 };
    addCircle(casquetteCenter, 18, 'z', 16, 0, 'accent');
    addLine({ x: casquetteCenter.x - 17, y: casquetteCenter.y, z: 0 }, { x: casquetteCenter.x + 17, y: casquetteCenter.y, z: 0 }, 'accent');
    addLine({ x: casquetteCenter.x, y: casquetteCenter.y - 17, z: 0 }, { x: casquetteCenter.x, y: casquetteCenter.y + 17, z: 0 }, 'accent');

    // Twin Pilot Lamps / Tiger Eyes
    addCircle({ x: 128, y: -88, z: -14 }, 4.5, 'z', 8, 0, 'accent');
    addCircle({ x: 128, y: -88, z: +14 }, 4.5, 'z', 8, 0, 'accent');
    addCircle({ x: 116, y: -88, z: 0 }, 8, 'z', 10, 0, 'engine');

    // Handlebars with classic risers and mirrors
    const barCenter = { x: 112, y: -88, z: 0 };
    const barL1 = { x: 96, y: -108, z: -28 };
    const barR1 = { x: 96, y: -108, z: +28 };
    const barL2 = { x: 88, y: -108, z: -48 };
    const barR2 = { x: 88, y: -108, z: +48 };

    addLine(barCenter, barL1, 'chassis');
    addLine(barCenter, barR1, 'chassis');
    addLine(barL1, barL2, 'chassis');
    addLine(barR1, barR2, 'chassis');

    addLine({ x: 88, y: -108, z: -40 }, { x: 88, y: -108, z: -49 }, 'engine');
    addLine({ x: 88, y: -108, z: +40 }, { x: 88, y: -108, z: +49 }, 'engine');
    addLine({ x: 88, y: -108, z: -42 }, { x: 98, y: -108, z: -46 }, 'accent');
    addLine({ x: 88, y: -108, z: +42 }, { x: 98, y: -108, z: +46 }, 'accent');

    addLine({ x: 92, y: -108, z: -38 }, { x: 82, y: -136, z: -42 }, 'chassis');
    addLine({ x: 92, y: -108, z: +38 }, { x: 82, y: -136, z: +42 }, 'chassis');
    addCircle({ x: 82, y: -136, z: -42 }, 7, 'z', 10, 0, 'accent');
    addCircle({ x: 82, y: -136, z: +42 }, 7, 'z', 10, 0, 'accent');

    // 4. ICONIC TEARDROP FUEL TANK (Bullet 350 Two-Tone Livery)
    const tankTopSpine = [
      { x: 104, y: -58, z: 0 },
      { x: 74, y: -72, z: 0 },
      { x: 42, y: -75, z: 0 },
      { x: 12, y: -65, z: 0 },
      { x: -16, y: -46, z: 0 }
    ];
    for (let i = 0; i < tankTopSpine.length - 1; i++) {
      addLine(tankTopSpine[i], tankTopSpine[i + 1], 'accent');
    }

    const tankLeftContour = [
      { x: 104, y: -58, z: -6 },
      { x: 74, y: -68, z: -25 },
      { x: 42, y: -62, z: -26 },
      { x: 12, y: -54, z: -18 },
      { x: -16, y: -46, z: -10 }
    ];
    const tankRightContour = [
      { x: 104, y: -58, z: +6 },
      { x: 74, y: -68, z: +25 },
      { x: 42, y: -62, z: +26 },
      { x: 12, y: -54, z: +18 },
      { x: -16, y: -46, z: +10 }
    ];
    const tankBottomL = [
      { x: 100, y: -48, z: -6 },
      { x: 70, y: -44, z: -20 },
      { x: 38, y: -42, z: -20 },
      { x: 10, y: -42, z: -14 },
      { x: -16, y: -46, z: -10 }
    ];
    const tankBottomR = [
      { x: 100, y: -48, z: +6 },
      { x: 70, y: -44, z: +20 },
      { x: 38, y: -42, z: +20 },
      { x: 10, y: -42, z: +14 },
      { x: -16, y: -46, z: +10 }
    ];

    for (let i = 0; i < tankLeftContour.length - 1; i++) {
      addLine(tankLeftContour[i], tankLeftContour[i + 1], 'accent');
      addLine(tankRightContour[i], tankRightContour[i + 1], 'accent');
      addLine(tankBottomL[i], tankBottomL[i + 1], 'accent');
      addLine(tankBottomR[i], tankBottomR[i + 1], 'accent');
      addLine(tankLeftContour[i], tankTopSpine[i], 'accent');
      addLine(tankRightContour[i], tankTopSpine[i], 'accent');
      addLine(tankLeftContour[i], tankBottomL[i], 'accent');
      addLine(tankRightContour[i], tankBottomR[i], 'accent');
    }

    // Pinstripe Badge on tank sides
    addLine({ x: 58, y: -60, z: -26 }, { x: 34, y: -60, z: -26 }, 'accent');
    addLine({ x: 58, y: -60, z: +26 }, { x: 34, y: -60, z: +26 }, 'accent');
    addCircle({ x: 44, y: -76, z: 5 }, 5, 'z', 8, 0, 'accent');

    // 5. 350cc SINGLE-CYLINDER ENGINE BLOCK
    const engineCenter = { x: 12, y: 15, z: 0 };
    for (let f = -18; f <= 28; f += 7.5) {
      const finY = f;
      const finPts = [
        { x: engineCenter.x - 16, y: finY, z: -16 },
        { x: engineCenter.x + 22, y: finY, z: -16 },
        { x: engineCenter.x + 26, y: finY, z: -10 },
        { x: engineCenter.x + 26, y: finY, z: +10 },
        { x: engineCenter.x + 22, y: finY, z: +16 },
        { x: engineCenter.x - 16, y: finY, z: +16 },
        { x: engineCenter.x - 20, y: finY, z: +10 },
        { x: engineCenter.x - 20, y: finY, z: -10 }
      ];
      for (let i = 0; i < finPts.length; i++) {
        addLine(finPts[i], finPts[(i + 1) % finPts.length], 'engine');
      }
    }

    const headTop = { x: engineCenter.x + 2, y: -26, z: 0 };
    addCircle(headTop, 14, 'z', 10, 0, 'engine');
    addLine({ x: engineCenter.x - 2, y: -26, z: 0 }, { x: engineCenter.x - 12, y: -34, z: -6 }, 'accent');

    const caseL = [
      { x: -32, y: 35, z: -22 },
      { x: +35, y: 35, z: -22 },
      { x: +35, y: 64, z: -22 },
      { x: -32, y: 64, z: -22 }
    ];
    const caseR = [
      { x: -32, y: 35, z: +22 },
      { x: +35, y: 35, z: +22 },
      { x: +35, y: 64, z: +22 },
      { x: -32, y: 64, z: +22 }
    ];
    for (let i = 0; i < 4; i++) {
      addLine(caseL[i], caseL[(i + 1) % 4], 'engine');
      addLine(caseR[i], caseR[(i + 1) % 4], 'engine');
      addLine(caseL[i], caseR[i], 'engine');
    }

    addCircle({ x: 2, y: 48, z: -23 }, 15, 'z', 12, 0, 'engine');
    addCircle({ x: 14, y: 48, z: +23 }, 13, 'z', 12, 0, 'engine');

    addLine({ x: 2, y: 65, z: -22 }, { x: 2, y: 65, z: -35 }, 'chassis');
    addLine({ x: 2, y: 65, z: +22 }, { x: 2, y: 65, z: +35 }, 'chassis');

    // 6. LONG CHROME EXHAUST & BOTTLE SILENCER
    const headerPipe = [
      { x: 22, y: -12, z: +12 },
      { x: 38, y: -4, z: +16 },
      { x: 46, y: 24, z: +18 },
      { x: 44, y: 56, z: +18 },
      { x: 20, y: 60, z: +18 },
      { x: -28, y: 60, z: +18 }
    ];
    for (let i = 0; i < headerPipe.length - 1; i++) {
      addLine(headerPipe[i], headerPipe[i + 1], 'accent');
    }

    const silencerStart = { x: -28, y: 60, z: +18 };
    const silencerTaper = { x: -60, y: 60, z: +18 };
    const silencerBodyEnd = { x: -210, y: 60, z: +18 };
    const silencerTip = { x: -230, y: 60, z: +18 };

    const silStartRing = addCircle(silencerStart, 4.5, 'z', 8, 0, 'accent');
    const silTaperRing = addCircle(silencerTaper, 9, 'z', 10, 0, 'accent');
    const silBodyRing = addCircle(silencerBodyEnd, 9, 'z', 10, 0, 'accent');
    const silTipRing = addCircle(silencerTip, 5.5, 'z', 8, 0, 'accent');

    for (let i = 0; i < 8; i += 2) {
      addLine(silStartRing[i], silTaperRing[i], 'accent');
      addLine(silTaperRing[i], silBodyRing[i], 'accent');
      addLine(silBodyRing[i], silTipRing[i], 'accent');
    }

    // 7. CHASSIS, SWINGARM & REAR SHOCKS
    addLine({ x: 104, y: -50, z: 0 }, { x: 38, y: 35, z: 0 }, 'chassis');
    addLine({ x: 38, y: 35, z: -10 }, { x: -30, y: 64, z: -10 }, 'chassis');
    addLine({ x: 38, y: 35, z: +10 }, { x: -30, y: 64, z: +10 }, 'chassis');

    const swingarmPivotL = { x: -32, y: 52, z: -16 };
    const swingarmPivotR = { x: -32, y: 52, z: +16 };
    addLine(swingarmPivotL, { x: rearAxle.x, y: rearAxle.y, z: -16 }, 'chassis');
    addLine(swingarmPivotR, { x: rearAxle.x, y: rearAxle.y, z: +16 }, 'chassis');

    const shockMountTopL = { x: -108, y: -20, z: -17 };
    const shockMountTopR = { x: -108, y: -20, z: +17 };
    const shockMountBotL = { x: -152, y: 65, z: -18 };
    const shockMountBotR = { x: -152, y: 65, z: +18 };

    addLine(shockMountTopL, shockMountBotL, 'chassis');
    addLine(shockMountTopR, shockMountBotR, 'chassis');

    for (let s = 0.25; s <= 0.75; s += 0.08) {
      const sxL = shockMountTopL.x + (shockMountBotL.x - shockMountTopL.x) * s;
      const syL = shockMountTopL.y + (shockMountBotL.y - shockMountTopL.y) * s;
      const sxR = shockMountTopR.x + (shockMountBotR.x - shockMountTopR.x) * s;
      const syR = shockMountTopR.y + (shockMountBotR.y - shockMountTopR.y) * s;
      addCircle({ x: sxL, y: syL, z: -18 }, 4.5, 'z', 6, 0, 'accent');
      addCircle({ x: sxR, y: syR, z: +18 }, 4.5, 'z', 6, 0, 'accent');
    }

    // 8. SADDLE & TOOLBOXES
    const seatSpine = [
      { x: -16, y: -46, z: 0 },
      { x: -50, y: -50, z: 0 },
      { x: -85, y: -45, z: 0 },
      { x: -118, y: -38, z: 0 },
      { x: -136, y: -32, z: 0 }
    ];
    const seatEdgeL = [
      { x: -16, y: -46, z: -10 },
      { x: -50, y: -48, z: -16 },
      { x: -85, y: -43, z: -15 },
      { x: -118, y: -36, z: -13 },
      { x: -136, y: -32, z: -8 }
    ];
    const seatEdgeR = [
      { x: -16, y: -46, z: +10 },
      { x: -50, y: -48, z: +16 },
      { x: -85, y: -43, z: +15 },
      { x: -118, y: -36, z: +13 },
      { x: -136, y: -32, z: +8 }
    ];

    for (let i = 0; i < seatSpine.length - 1; i++) {
      addLine(seatSpine[i], seatSpine[i + 1], 'engine');
      addLine(seatEdgeL[i], seatEdgeL[i + 1], 'engine');
      addLine(seatEdgeR[i], seatEdgeR[i + 1], 'engine');
      addLine(seatEdgeL[i], seatSpine[i], 'engine');
      addLine(seatEdgeR[i], seatSpine[i], 'engine');
    }

    addLine({ x: -105, y: -38, z: -16 }, { x: -138, y: -26, z: -14 }, 'chassis');
    addLine({ x: -105, y: -38, z: +16 }, { x: -138, y: -26, z: +14 }, 'chassis');
    addLine({ x: -138, y: -26, z: -14 }, { x: -138, y: -26, z: +14 }, 'chassis');

    const boxPtsL = [
      { x: -44, y: -12, z: -18 },
      { x: -82, y: -8, z: -18 },
      { x: -74, y: 28, z: -18 },
      { x: -44, y: 28, z: -18 }
    ];
    const boxPtsR = [
      { x: -44, y: -12, z: +18 },
      { x: -82, y: -8, z: +18 },
      { x: -74, y: 28, z: +18 },
      { x: -44, y: 28, z: +18 }
    ];
    for (let i = 0; i < 4; i++) {
      addLine(boxPtsL[i], boxPtsL[(i + 1) % 4], 'accent');
      addLine(boxPtsR[i], boxPtsR[(i + 1) % 4], 'accent');
    }
    addLine({ x: -68, y: 8, z: -18 }, { x: -56, y: 8, z: -18 }, 'accent');
    addLine({ x: -68, y: 8, z: +18 }, { x: -56, y: 8, z: +18 }, 'accent');

    return lines;
  }

  // 3D Amber Workshop Embers & Floating Dust Motes
  const EMBER_COUNT = 45;
  const embers = [];
  for (let i = 0; i < EMBER_COUNT; i++) {
    embers.push({
      x: (Math.random() - 0.5) * 900,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 700,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.3 + Math.random() * 0.5),
      vz: (Math.random() - 0.5) * 0.4,
      radius: 1.2 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2
    });
  }

  // Exhaust spark particles
  const exhaustParticles = [];
  for (let i = 0; i < 20; i++) {
    exhaustParticles.push({
      x: -230 - Math.random() * 120,
      y: 60 + (Math.random() - 0.5) * 12,
      z: 18 + (Math.random() - 0.5) * 12,
      vx: -(1.8 + Math.random() * 2.2),
      vy: -(0.2 + Math.random() * 0.4),
      vz: (Math.random() - 0.5) * 0.4,
      life: Math.random(),
      size: 1.2 + Math.random() * 2
    });
  }

  // Palette: Cream, Chrome, Brass & Crimson
  const colors = {
    chassis: '201, 204, 209', // Chrome
    accent: '239, 227, 200',  // Cream
    brass: '176, 141, 87',    // Antique Brass
    crimson: '179, 38, 30',   // Royal Crimson
    wheel: '180, 185, 195',   // Silver Spoke
    engine: '160, 164, 172'   // Cast Engine
  };

  let wheelSpinAngle = 0;
  let time = 0;
  let animationFrameId;
  let isTabVisible = true;

  document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
    if (isTabVisible && !prefersReducedMotion) {
      loop();
    }
  });

  // Main 3D Render Loop
  function loop() {
    if (!isTabVisible) return;

    time += 0.016;

    if (!isDragging && !prefersReducedMotion) {
      autoYaw += 0.005;
      wheelSpinAngle += 0.045;
      targetRotY = 0.48 + Math.sin(autoYaw * 0.6) * 0.35;
    } else {
      wheelSpinAngle += 0.02;
    }

    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;

    const suspensionBob = prefersReducedMotion ? 0 : Math.sin(time * 3.5) * 1.6;
    const finalRotX = rotX + (prefersReducedMotion ? 0 : Math.sin(time * 1.8) * 0.015);
    const finalRotY = rotY;
    const finalRotZ = rotZ + (prefersReducedMotion ? 0 : Math.cos(time * 2.2) * 0.01);

    ctx.clearRect(0, 0, width, height);

    // -------------------------------------------------------------
    // 1. Perspective Highway Road Grid (Scrolling underneath wheels)
    // -------------------------------------------------------------
    const gridCols = 16;
    const gridRows = 9;
    const gridSpacing = 95;
    const groundY = 150;
    const roadSpeed = (time * 190) % gridSpacing;

    const roadPoints = [];
    for (let r = 0; r < gridRows; r++) {
      roadPoints[r] = [];
      const zBase = (r - gridRows / 2) * gridSpacing;
      for (let c = 0; c < gridCols; c++) {
        const xBase = (c - gridCols / 2) * gridSpacing - roadSpeed;
        const pRot = rotate3D(xBase, groundY, zBase, finalRotX * 0.3, finalRotY * 0.5, 0);
        roadPoints[r][c] = project3D(pRot.x, pRot.y, pRot.z);
      }
    }

    ctx.lineWidth = 0.8;
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const p1 = roadPoints[r][c];
        if (!p1) continue;

        const depthFade = Math.max(0, Math.min(1, (p1.depth - 250) / 750));
        ctx.strokeStyle = `rgba(${colors.brass}, ${(0.14 * (1 - depthFade * 0.75)).toFixed(3)})`;

        if (c < gridCols - 1) {
          const p2 = roadPoints[r][c + 1];
          if (p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        if (r < gridRows - 1) {
          const p3 = roadPoints[r + 1][c];
          if (p3) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
          }
        }
      }
    }

    // -------------------------------------------------------------
    // 2. Volumetric 3D Headlamp Light Beam
    // -------------------------------------------------------------
    const beamOrigin = rotate3D(140, -78 + suspensionBob, 0, finalRotX, finalRotY, finalRotZ);
    const beamFar1 = rotate3D(520, 20 + suspensionBob, -120, finalRotX, finalRotY, finalRotZ);
    const beamFar2 = rotate3D(520, 20 + suspensionBob, +120, finalRotX, finalRotY, finalRotZ);
    const pOrigin = project3D(beamOrigin.x, beamOrigin.y, beamOrigin.z);
    const pFar1 = project3D(beamFar1.x, beamFar1.y, beamFar1.z);
    const pFar2 = project3D(beamFar2.x, beamFar2.y, beamFar2.z);

    if (pOrigin && pFar1 && pFar2) {
      const grad = ctx.createRadialGradient(pOrigin.x, pOrigin.y, 4, pOrigin.x + 120, pOrigin.y, 350);
      grad.addColorStop(0, 'rgba(239, 227, 200, 0.25)');
      grad.addColorStop(0.4, 'rgba(176, 141, 87, 0.08)');
      grad.addColorStop(1, 'rgba(176, 141, 87, 0)');

      ctx.beginPath();
      ctx.moveTo(pOrigin.x, pOrigin.y);
      ctx.lineTo(pFar1.x, pFar1.y);
      ctx.lineTo(pFar2.x, pFar2.y);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // -------------------------------------------------------------
    // 3. Render Royal Enfield Bullet 350cc 3D Mesh
    // -------------------------------------------------------------
    const bikeLines = buildBullet350(wheelSpinAngle);

    const transformedLines = bikeLines.map(({ p1, p2, type }) => {
      const rot1 = rotate3D(p1.x, p1.y + suspensionBob, p1.z, finalRotX, finalRotY, finalRotZ);
      const rot2 = rotate3D(p2.x, p2.y + suspensionBob, p2.z, finalRotX, finalRotY, finalRotZ);
      const proj1 = project3D(rot1.x, rot1.y, rot1.z);
      const proj2 = project3D(rot2.x, rot2.y, rot2.z);
      const avgZ = (rot1.z + rot2.z) * 0.5;
      return { proj1, proj2, avgZ, type };
    }).filter(l => l.proj1 && l.proj2);

    transformedLines.sort((a, b) => b.avgZ - a.avgZ);

    for (let i = 0; i < transformedLines.length; i++) {
      const { proj1, proj2, type } = transformedLines[i];
      const avgScale = (proj1.scale + proj2.scale) * 0.5;

      let color = colors.chassis;
      let alpha = 0.8;
      let lineW = Math.max(0.9, avgScale * 2.2);

      if (type === 'accent') {
        color = colors.accent;
        alpha = 0.95;
        lineW = Math.max(1.1, avgScale * 2.5);
      } else if (type === 'wheel') {
        color = colors.wheel;
        alpha = 0.65;
        lineW = Math.max(0.7, avgScale * 1.5);
      } else if (type === 'engine') {
        color = colors.engine;
        alpha = 0.75;
        lineW = Math.max(0.9, avgScale * 2.0);
      }

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${color}, ${(alpha * avgScale * 1.35).toFixed(3)})`;
      ctx.lineWidth = lineW;
      ctx.moveTo(proj1.x, proj1.y);
      ctx.lineTo(proj2.x, proj2.y);
      ctx.stroke();
    }

    // -------------------------------------------------------------
    // 4. Exhaust sparks / trailing heat
    // -------------------------------------------------------------
    for (let i = 0; i < exhaustParticles.length; i++) {
      const ep = exhaustParticles[i];
      if (!prefersReducedMotion) {
        ep.x += ep.vx;
        ep.y += ep.vy;
        ep.z += ep.vz;
        ep.life -= 0.016;

        if (ep.life <= 0) {
          ep.x = -230;
          ep.y = 60 + (Math.random() - 0.5) * 6;
          ep.z = 18 + (Math.random() - 0.5) * 6;
          ep.life = 0.8 + Math.random() * 0.4;
        }
      }

      const rotP = rotate3D(ep.x, ep.y + suspensionBob, ep.z, finalRotX, finalRotY, finalRotZ);
      const proj = project3D(rotP.x, rotP.y, rotP.z);

      if (proj) {
        const rad = Math.max(0.8, ep.size * proj.scale);
        const pAlpha = (ep.life * 0.5 * proj.scale).toFixed(3);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.crimson}, ${pAlpha})`;
        ctx.fill();
      }
    }

    // -------------------------------------------------------------
    // 5. Ambient 3D Golden Workshop Embers & Floating Dust
    // -------------------------------------------------------------
    for (let i = 0; i < embers.length; i++) {
      const emb = embers[i];
      if (!prefersReducedMotion) {
        emb.x += emb.vx;
        emb.y += emb.vy;
        emb.z += emb.vz;
        emb.pulse += 0.03;

        if (emb.y < -400) emb.y = 400;
        if (emb.x > 450) emb.x = -450;
        if (emb.x < -450) emb.x = 450;
      }

      const rotEmb = rotate3D(emb.x, emb.y, emb.z, finalRotX * 0.5, finalRotY * 0.5, 0);
      const proj = project3D(rotEmb.x, rotEmb.y, rotEmb.z);

      if (proj) {
        const rad = Math.max(0.7, emb.radius * proj.scale);
        const alpha = (0.35 + Math.sin(emb.pulse) * 0.2) * proj.scale;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.brass}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(loop);
    }
  }

  if (prefersReducedMotion) {
    loop();
  } else {
    loop();
  }
}