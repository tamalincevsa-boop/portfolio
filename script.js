  (() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ambientMarkup = `
      <div class="editing-ambient" aria-hidden="true">
        <div class="editing-blob"></div>
        <div class="editing-timeline">
          <div class="timeline-topbar"><span>SEQUENCE_01</span><span class="ambient-timecode">00:00:08:12</span></div>
          <div class="timeline-ruler"><span>00</span><span>04</span><span>08</span><span>12</span><span>16</span></div>
          <div class="timeline-tracks">
            <div class="timeline-track track-video"><span class="timeline-clip clip-a"></span><span class="timeline-clip clip-b"></span><span class="timeline-clip clip-c"></span></div>
            <div class="timeline-track track-motion"><span class="timeline-clip clip-d"></span><span class="timeline-clip clip-e"></span></div>
            <div class="timeline-track track-audio">
              ${[.35,.72,.48,.92,.58,.8,.42,1,.64,.3,.76,.5,.88,.4,.68,.28].map((wave) => `<span class="wave-bar" style="--wave:${wave}"></span>`).join('')}
            </div>
          </div>
          <div class="timeline-playhead"><span></span></div>
          <div class="timeline-status"><i></i>EDITING IN PROGRESS</div>
        </div>
        <div class="editing-orbit editing-orbit-a"></div>
        <div class="editing-orbit editing-orbit-b"></div>
      </div>`;

    const gradientSecondary = document.querySelector('.gradient-secondary');
    if (gradientSecondary && !document.querySelector('.editing-ambient')) {
      gradientSecondary.insertAdjacentHTML('afterend', ambientMarkup);
    }

    const heroButtons = document.querySelector('.hero-copy .hero-buttons');
    if (heroButtons && !document.querySelector('.hero-principles')) {
      heroButtons.insertAdjacentHTML('afterend', `
        <div class="hero-principles hero-reveal" style="--hero-delay:680ms" aria-label="Принципы работы">
          <span><i></i>Смысл</span><span><i></i>Ритм</span><span><i></i>Звук</span>
        </div>`);
    }

    const sectionNumbers = { works: '01', about: '02', process: '03', reviews: '04', contacts: '05' };
    Object.entries(sectionNumbers).forEach(([id, number]) => {
      document.getElementById(id)?.setAttribute('data-section', number);
    });

    const setHTML = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = value;
    };

    setHTML('.hero-copy > p', 'Монтирую Reels, TikTok и YouTube Shorts для авторов, брендов и digital-проектов. Выстраиваю ритм, усиливаю смысл графикой и звуком — чтобы ролик удерживал внимание и ощущался цельным медиа-продуктом.');
    setHTML('#works .section-description', 'Три разные задачи — от образовательного контента до бизнес-подкаста. В каждом проекте я выстраиваю ритм, упаковываю смысл и усиливаю ключевые моменты звуком и графикой.');
    setHTML('#about .about-text', 'Я не добавляю эффекты ради эффектов. Сначала разбираю задачу, материал и аудиторию, затем выстраиваю ролик так, чтобы каждый кадр работал на смысл и удержание.<br><br>Premiere Pro отвечает за основу и ритм, After Effects — за графику и акценты, sound design — за ощущение цельности. На выходе получается не набор приёмов, а собранный медиа-продукт.');

    const processCopy = [
      'Разбираю материал, задачу и площадку. Определяю, что должно зацепить зрителя в первые секунды.',
      'Собираю структуру, убираю всё лишнее и выстраиваю темп так, чтобы внимание не проваливалось.',
      'Добавляю атмосферу, импакты и микродетали, которые подчёркивают монтаж, а не спорят с ним.',
      'Довожу цвет, субтитры и motion-графику, проверяю ролик на цельность и адаптирую под платформу.'
    ];
    document.querySelectorAll('#process .process-text').forEach((element, index) => {
      if (processCopy[index]) element.textContent = processCopy[index];
    });

    setHTML('#contacts .cta-box > p', 'Есть исходники, референс или пока только идея? Обсудим задачу и найдём подачу, которая будет работать именно под ваш контент.');

    const header = document.querySelector('header');
    const progress = document.querySelector('.scroll-progress');
    const parallaxLayers = document.querySelectorAll('.gradient, .gradient-secondary, .editing-ambient');

    const updateScrollUI = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      header?.classList.toggle('is-scrolled', scrollTop > 24);
      if (progress) progress.style.width = `${progressValue}%`;
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
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      revealElements.forEach((element) => revealObserver.observe(element));
    }

    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
      let pointerX = 0;
      let pointerY = 0;
      let currentX = 0;
      let currentY = 0;
      let frameId;
      const directions = [1, -0.65, 0.34];

      const animateParallax = () => {
        currentX += (pointerX - currentX) * 0.045;
        currentY += (pointerY - currentY) * 0.045;
        parallaxLayers.forEach((layer, index) => {
          const direction = directions[index] ?? 0.25;
          layer.style.translate = `${currentX * direction}px ${currentY * direction}px`;
        });
        frameId = requestAnimationFrame(animateParallax);
      };

      window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 28;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 28;
      }, { passive: true });

      frameId = requestAnimationFrame(animateParallax);
      window.addEventListener('pagehide', () => {
        if (frameId) cancelAnimationFrame(frameId);
      }, { once: true });
    }
  })();
