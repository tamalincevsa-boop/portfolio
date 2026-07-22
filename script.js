(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const refinementStyle = document.createElement('style');
  refinementStyle.setAttribute('data-portfolio-refinement', 'scroll-depth-timeline');
  refinementStyle.textContent = `/* Scroll-linked editorial timeline and subtle plaque motion */

@keyframes ambientRevealDepth {
  to { opacity: var(--ambient-opacity, 0.52); }
}

@keyframes editingPanelFloatDepth {
  0% {
    transform: translate3d(-10px, 8px, 0) rotate(-6.4deg) perspective(1200px) rotateY(-3deg);
  }
  100% {
    transform: translate3d(12px, -10px, 0) rotate(-4.1deg) perspective(1200px) rotateY(2.5deg);
  }
}

@keyframes plaqueDriftA {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  42% { translate: 1px -3px; rotate: 0.11deg; }
  74% { translate: -1px 1px; rotate: -0.06deg; }
}

@keyframes plaqueDriftB {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  36% { translate: -1px -2px; rotate: -0.09deg; }
  70% { translate: 1px 2px; rotate: 0.07deg; }
}

@keyframes plaqueDriftC {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  48% { translate: 2px -2px; rotate: 0.08deg; }
  78% { translate: -1px 1px; rotate: -0.05deg; }
}

@keyframes microChipDrift {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -1.5px; }
}

.editing-ambient {
  --ambient-opacity: 0.52;
  position: fixed;
  width: min(96vw, 1540px);
  height: min(92vh, 940px);
  aspect-ratio: auto;
  left: 50%;
  right: auto;
  top: 46%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: -2;
  overflow: visible;
  pointer-events: none;
  contain: layout paint;
  will-change: translate;
  animation: ambientRevealDepth 1.55s ease forwards 0.42s;
  -webkit-mask-image: radial-gradient(ellipse 84% 86% at 50% 50%, #000 0 61%, rgba(0, 0, 0, 0.9) 76%, transparent 100%);
  mask-image: radial-gradient(ellipse 84% 86% at 50% 50%, #000 0 61%, rgba(0, 0, 0, 0.9) 76%, transparent 100%);
}

.editing-blob {
  inset: 1.5% 4%;
  opacity: 0.93;
  border-color: rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at 31% 27%, rgba(136, 132, 255, 0.195), transparent 35%),
    radial-gradient(circle at 73% 71%, rgba(62, 126, 255, 0.135), transparent 40%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.042), rgba(255, 255, 255, 0.009));
  box-shadow:
    inset 0 0 140px rgba(255, 255, 255, 0.02),
    0 0 185px rgba(74, 86, 190, 0.085);
}

.editing-blob::before {
  border-color: rgba(255, 255, 255, 0.052);
}

.editing-blob::after {
  opacity: 0.92;
}

.editing-timeline {
  width: min(72%, 1080px);
  left: 50%;
  top: 49%;
  translate: -50% -50%;
  padding: 25px 28px 27px;
  border-radius: 28px;
  border-color: rgba(255, 255, 255, 0.09);
  background: linear-gradient(145deg, rgba(10, 10, 14, 0.58), rgba(12, 12, 17, 0.31));
  box-shadow: 0 40px 140px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  opacity: 0.89;
  animation: editingPanelFloatDepth 21s var(--ease) infinite alternate;
}

.timeline-track {
  height: 36px;
  border-radius: 9px;
  padding: 5px;
  gap: 5px;
  background-size: 31px 100%;
}

.timeline-ruler {
  margin: 17px 0 13px;
}

.timeline-playhead {
  top: 51px;
  bottom: 33px;
}

.editing-orbit {
  border-color: rgba(255, 255, 255, 0.065);
}

.hero-copy,
.hero-side,
section,
.marquee,
footer {
  position: relative;
  z-index: 2;
}

.stat-card,
.stat-card:hover {
  background: linear-gradient(135deg, rgba(18, 18, 23, 0.91), rgba(9, 9, 13, 0.82));
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.25);
}

.hero-side .stat-card:nth-child(2) { animation: plaqueDriftA 10.8s ease-in-out infinite; }
.hero-side .stat-card:nth-child(3) { animation: plaqueDriftB 12.4s ease-in-out infinite -4.1s; }
.hero-side .stat-card:nth-child(4) { animation: plaqueDriftC 11.6s ease-in-out infinite -7.2s; }

.work-card:nth-child(3n + 1),
.process-card:nth-child(odd),
.review-card:nth-child(3n + 1) {
  animation: plaqueDriftA 13.5s ease-in-out infinite -2.8s;
}

.work-card:nth-child(3n + 2),
.process-card:nth-child(even),
.review-card:nth-child(3n + 2),
.cta-box {
  animation: plaqueDriftB 14.5s ease-in-out infinite -6.3s;
}

.work-card:nth-child(3n),
.review-card:nth-child(3n) {
  animation: plaqueDriftC 12.8s ease-in-out infinite -8.6s;
}

.stack-item:nth-child(odd) { animation: microChipDrift 10.5s ease-in-out infinite -3s; }
.stack-item:nth-child(even) { animation: microChipDrift 12s ease-in-out infinite -7s reverse; }

.stat-card:hover,
.work-card:hover,
.process-card:hover,
.review-card:hover,
.cta-box:hover,
.stack-item:hover {
  animation-play-state: paused;
}

@media (max-width: 980px) {
  .editing-ambient {
    --ambient-opacity: 0.38;
    width: 1120px;
    height: 760px;
    top: 44%;
  }

  .editing-timeline {
    width: 70%;
  }
}

@media (max-width: 560px) {
  .editing-ambient {
    --ambient-opacity: 0.26;
    width: 820px;
    height: 590px;
    top: 41%;
  }

  .editing-timeline {
    width: 68%;
    padding: 18px;
  }

  .timeline-track {
    height: 29px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .editing-ambient,
  .stat-card,
  .work-card,
  .process-card,
  .review-card,
  .cta-box,
  .stack-item {
    animation: none !important;
    translate: none !important;
    rotate: none !important;
  }

  .editing-ambient {
    opacity: 0.36 !important;
  }
}
`;
  document.head.appendChild(refinementStyle);

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
  const ambient = document.querySelector('.editing-ambient');
  const gradients = document.querySelectorAll('.gradient, .gradient-secondary');

  let targetScrollShift = 0;
  let currentScrollShift = 0;
  let pointerX = 0;
  let pointerY = 0;
  let currentPointerX = 0;
  let currentPointerY = 0;
  let frameId = 0;

  const updateScrollTargets = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    header?.classList.toggle('is-scrolled', scrollTop > 24);
    if (progress) progress.style.width = `${progressValue}%`;

    const maxShift = Math.min(window.innerHeight * 0.31, 300);
    targetScrollShift = -Math.min(scrollTop * 0.11, maxShift);
  };

  updateScrollTargets();
  window.addEventListener('scroll', updateScrollTargets, { passive: true });
  window.addEventListener('resize', updateScrollTargets, { passive: true });

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

  if (!reduceMotion) {
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 28;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 28;
      }, { passive: true });
    }

    const animateDepth = () => {
      currentScrollShift += (targetScrollShift - currentScrollShift) * 0.055;
      currentPointerX += (pointerX - currentPointerX) * 0.045;
      currentPointerY += (pointerY - currentPointerY) * 0.045;

      gradients.forEach((gradient, index) => {
        const direction = index === 0 ? 1 : -0.65;
        gradient.style.translate = `${currentPointerX * direction}px ${currentPointerY * direction}px`;
      });

      if (ambient) {
        const ambientX = currentPointerX * 0.25;
        const ambientY = currentScrollShift + currentPointerY * 0.16;
        ambient.style.translate = `${ambientX}px ${ambientY}px`;
      }

      frameId = requestAnimationFrame(animateDepth);
    };

    frameId = requestAnimationFrame(animateDepth);
    window.addEventListener('pagehide', () => {
      if (frameId) cancelAnimationFrame(frameId);
    }, { once: true });
  }
})();