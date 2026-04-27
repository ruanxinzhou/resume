// Project Detail Page - Scroll Animation & Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('.detail-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(section);
  });

  // Platform card hover effect
  const platformCards = document.querySelectorAll('.platform-card');
  platformCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      platformCards.forEach((c) => {
        if (c !== card) c.style.opacity = '0.7';
      });
    });
    card.addEventListener('mouseleave', () => {
      platformCards.forEach((c) => {
        c.style.opacity = '1';
      });
    });
  });

  // Status node hover tooltip
  const statusNodes = document.querySelectorAll('.status-node');
  statusNodes.forEach((node) => {
    node.style.cursor = 'pointer';
  });

  // Inspection type card stagger animation
  const itCards = document.querySelectorAll('.inspection-type-card');
  itCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const itObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.inspection-type-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 60);
          });
          itObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const itGrid = document.querySelector('.inspection-types-grid');
  if (itGrid) itObserver.observe(itGrid);

  // Highlight items stagger
  const highlights = document.querySelectorAll('.highlight-item');
  highlights.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-15px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  });

  const hlObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.highlight-item');
          items.forEach((item) => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          });
          hlObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const hlList = document.querySelector('.highlights-list');
  if (hlList) hlObserver.observe(hlList);

  // Smooth scroll for back button
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      // Allow normal navigation
    });
  }
});
