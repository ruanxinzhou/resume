/**
 * Resume Interactive Features
 */

(function() {
  'use strict';

  /* ── Visitor Stats ── */
  function initStats() {
    const checkStats = setInterval(() => {
      const pvEl = document.getElementById('busuanzi_value_site_pv');
      const uvEl = document.getElementById('busuanzi_value_site_uv');

      if (pvEl && uvEl) {
        if (pvEl.textContent !== '0' || uvEl.textContent !== '0') {
          clearInterval(checkStats);
          return;
        }

        setTimeout(() => {
          if (pvEl.textContent === '0') {
            fetch('https://api.countapi.xyz/hit/ruanxinzhou.top/resume')
              .then(res => res.json())
              .then(data => {
                if (data.value) {
                  pvEl.textContent = data.value.toLocaleString();
                  uvEl.textContent = '统计中';
                }
              })
              .catch(() => {
                let localPv = parseInt(localStorage.getItem('resume_pv') || '0') + 1;
                localStorage.setItem('resume_pv', localPv);
                pvEl.textContent = localPv.toLocaleString();
                uvEl.textContent = '本地';
              });
          }
          clearInterval(checkStats);
        }, 5000);

        clearInterval(checkStats);
      }
    }, 100);
  }

  /* ── Scroll Reveal ── */
  function initScrollReveal() {
    // 1. Section-level reveal with blur
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.filter = 'blur(3px)';
      section.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1), filter 0.55s cubic-bezier(0.4,0,0.2,1)';
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.filter = 'blur(0)';
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach((section, i) => {
      section.style.transitionDelay = `${i * 0.06}s`;
      sectionObserver.observe(section);
    });

    // 2. Skill cards stagger
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease';
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.skill-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 55);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) skillObserver.observe(skillsGrid);

    // 3. Project cards stagger (slide in from left)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-18px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease';
    });

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateX(0)';
            }, i * 70);
          });
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    const projectSection = document.querySelector('.section:has(.project-card)');
    if (projectSection) projectObserver.observe(projectSection);

    // 4. Education cards stagger
    const eduCards = document.querySelectorAll('.education-card');
    eduCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease';
    });

    const eduObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.education-card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 60);
          });
          eduObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    const eduGrid = document.querySelector('.education-grid');
    if (eduGrid) eduObserver.observe(eduGrid);

    // 5. Timeline items slide in
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-12px)';
      item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    });

    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    timelineItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
      tlObserver.observe(item);
    });
  }

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Copy contact info ── */
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('click', function() {
      const text = this.querySelector('span')?.textContent;
      if (text && !this.getAttribute('href')) {
        navigator.clipboard.writeText(text).then(() => showToast(`已复制: ${text}`));
      }
    });
  });

  /* ── Toast notification ── */
  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(15,23,42,0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: white;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 0.88rem;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /* ── Print ── */
  window.addEventListener('beforeprint', () => document.body.classList.add('printing'));
  window.addEventListener('afterprint', () => document.body.classList.remove('printing'));

  /* ── Init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initStats();
      initScrollReveal();
    });
  } else {
    initStats();
    initScrollReveal();
  }

  /* ── Console easter egg ── */
  console.log('%c👋 你好！', 'font-size: 24px; font-weight: bold; color: #6366f1;');
  console.log('%c感谢访问阮欣洲的简历页面！', 'font-size: 14px; color: #64748b;');
  console.log('%c如有工作机会，欢迎联系：ruanxinzhou@qq.com', 'font-size: 12px; color: #06b6d4;');
})();
