  (() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('header');
    const progress = document.querySelector('.scroll-progress');
    const gradients = document.querySelectorAll('.gradient, .gradient-secondary');

    const updateScrollUI = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      header?.classList.toggle('is-scrolled', scrollTop > 24);

      if (progress) {
        progress.style.width = `${progressValue}%`;
      }
    };

    updateScrollUI();
    window.addEventListener('scroll', updateScrollUI, { passive: true });

    const revealElements = document.querySelectorAll('[data-reveal]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px'
      });

      revealElements.forEach((element) => revealObserver.observe(element));
    }

    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
      let pointerX = 0;
      let pointerY = 0;
      let currentX = 0;
      let currentY = 0;
      let frameId;

      const animateGradientParallax = () => {
        currentX += (pointerX - currentX) * 0.045;
        currentY += (pointerY - currentY) * 0.045;

        gradients.forEach((gradient, index) => {
          const direction = index === 0 ? 1 : -0.65;
          gradient.style.translate = `${currentX * direction}px ${currentY * direction}px`;
        });

        frameId = requestAnimationFrame(animateGradientParallax);
      };

      window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 28;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 28;
      }, { passive: true });

      frameId = requestAnimationFrame(animateGradientParallax);

      window.addEventListener('pagehide', () => {
        if (frameId) cancelAnimationFrame(frameId);
      }, { once: true });
    }
  })();
