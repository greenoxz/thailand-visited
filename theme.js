function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  
  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  function updateMetaThemeColor(isDark) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#181614' : '#f6f2eb');
    }
  }

  function updateThemeState() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleBtn.setAttribute('aria-checked', isDark ? 'true' : 'false');
    
    // Fallback if legacy single-icon button markup is present
    const legacyIcon = toggleBtn.querySelector(':scope > i');
    if (legacyIcon) {
      if (isDark) {
        legacyIcon.className = 'fa-solid fa-sun';
      } else {
        legacyIcon.className = 'fa-solid fa-moon';
      }
    }
    
    updateMetaThemeColor(isDark);
  }
  
  // Set initial state based on what was applied in head
  updateThemeState();
  
  function toggleTheme(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      setStoredTheme('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      setStoredTheme('dark');
    }
    updateThemeState();
  }

  toggleBtn.addEventListener('click', toggleTheme);
  
  // Listen for system preference changes (only apply if user hasn't overridden)
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!getStoredTheme()) {
        if (e.matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        updateIcon();
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
  } catch (e) {}
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Cookie Consent Banner
function initCookieBanner() {
  try {
    if (localStorage.getItem('cookieConsent')) return;
  } catch (e) {
    return;
  }

  if (document.getElementById('cookieBanner')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner-content">
      <p>เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดีที่สุดและเพื่อการแสดงโฆษณาที่เกี่ยวข้อง การใช้งานเว็บไซต์ต่อถือว่าคุณยอมรับ <a href="/privacy">นโยบายความเป็นส่วนตัว</a> ของเรา</p>
      <button id="acceptCookies" class="cookie-btn" type="button">เข้าใจแล้ว</button>
    </div>
  `;
  document.body.appendChild(banner);
  
  const acceptBtn = document.getElementById('acceptCookies');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      try {
        localStorage.setItem('cookieConsent', 'true');
      } catch (e) {}
      banner.style.display = 'none';
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieBanner);
} else {
  initCookieBanner();
}

function initDonationGoal() {
  const footerTip = document.querySelector('.footer-tip');
  if (!footerTip) return;

  if (document.getElementById('donation-goal-container')) return;

  const container = document.createElement('div');
  container.id = 'donation-goal-container';
  container.className = 'donation-goal-container';
  container.innerHTML = `
    <div class="donation-goal-text">เป้าหมายสนับสนุนเซิร์ฟเวอร์เดือนนี้</div>
    <div class="donation-goal-bar-bg">
      <div id="donation-progress" class="donation-goal-bar-fill"></div>
      <div class="donation-goal-value"><span id="donation-amount">0</span> / 300 บาท</div>
    </div>
  `;
  
  footerTip.parentNode.insertBefore(container, footerTip.nextSibling);

  fetch('/api/donations.js')
  .then(res => res.json())
  .then(json => {
    if (json && json.data && typeof json.data.monthly === 'number') {
      const amount = json.data.monthly;
      const target = 300;
      document.getElementById('donation-amount').textContent = amount.toLocaleString();
      let percent = (amount / target) * 100;
      if (percent > 100) percent = 100;
      document.getElementById('donation-progress').style.width = percent + '%';
    }
  })
  .catch(err => console.error('Failed to fetch donation stats:', err));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDonationGoal);
} else {
  initDonationGoal();
}
