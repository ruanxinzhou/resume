/**
 * Resume Interactive Features
 */

(function() {
  'use strict';

  // 等待统计脚本加载完成
  function initStats() {
    const checkStats = setInterval(() => {
      const pvEl = document.getElementById('busuanzi_value_site_pv');
      const uvEl = document.getElementById('busuanzi_value_site_uv');

      if (pvEl && uvEl) {
        // 检查是否已经有值了（脚本已加载）
        if (pvEl.textContent !== '0' || uvEl.textContent !== '0') {
          clearInterval(checkStats);
          console.log('📊 统计已加载');
          return;
        }

        // 如果5秒后还没加载，使用备用方案
        setTimeout(() => {
          if (pvEl.textContent === '0') {
            // 尝试使用备用API
            fetch('https://api.countapi.xyz/hit/ruanxinzhou.top/resume')
              .then(res => res.json())
              .then(data => {
                if (data.value) {
                  pvEl.textContent = data.value.toLocaleString();
                  uvEl.textContent = '统计中';
                }
              })
              .catch(() => {
                // 使用本地存储作为最后的备用
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

  // 页面加载完成后初始化统计
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStats);
  } else {
    initStats();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add animation on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('will-animate');
    observer.observe(section);
  });

  // Add hover effect to skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Copy contact info to clipboard
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const text = this.querySelector('span')?.textContent;
      if (text && !this.getAttribute('href')) {
        navigator.clipboard.writeText(text).then(() => {
          // Show toast notification
          showToast(`已复制: ${text}`);
        });
      }
    });
  });

  // Toast notification function
  function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #1e293b;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 1000;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after 2 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Add print event listener
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  // Console easter egg
  console.log('%c👋 你好！', 'font-size: 24px; font-weight: bold; color: #6366f1;');
  console.log('%c感谢访问阮欣洲的简历页面！', 'font-size: 14px; color: #64748b;');
  console.log('%c如有工作机会，欢迎联系：ruanxinzhou@qq.com', 'font-size: 12px; color: #06b6d4;');
})();
