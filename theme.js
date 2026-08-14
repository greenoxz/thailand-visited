document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  const icon = toggleBtn.querySelector('i');
  
  function updateIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
  
  // Set initial icon based on what was applied in head
  updateIcon();
  
  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateIcon();
  });
  
  // Listen for system preference changes (only apply if user hasn't overridden)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      updateIcon();
    }
  });
});

// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cookieConsent')) {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <p>เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดีที่สุดและเพื่อการแสดงโฆษณาที่เกี่ยวข้อง การใช้งานเว็บไซต์ต่อถือว่าคุณยอมรับ <a href="/privacy.html">นโยบายความเป็นส่วนตัว</a> ของเรา</p>
        <button id="acceptCookies" class="cookie-btn">เข้าใจแล้ว</button>
      </div>
    `;
    document.body.appendChild(banner);
    
    document.getElementById('acceptCookies').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      banner.style.display = 'none';
    });
  }
});
