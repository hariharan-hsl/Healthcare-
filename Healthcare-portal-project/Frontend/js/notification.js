/* ============================================
   NOTIFICATION.JS — Toast notification system
   ============================================ */

'use strict';

(function () {
  /* Create container if needed */
  function getContainer() {
    let c = document.getElementById('toastContainer');
    if (!c) {
      c = document.createElement('div');
      c.id = 'toastContainer';
      c.setAttribute('role', 'region');
      c.setAttribute('aria-live', 'polite');
      c.setAttribute('aria-label', 'Notifications');
      Object.assign(c.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none'
      });
      document.body.appendChild(c);
    }
    return c;
  }

  const icons = {
    success: 'fa-circle-check',
    error:   'fa-circle-xmark',
    warning: 'fa-triangle-exclamation',
    info:    'fa-circle-info'
  };

  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', text: '#15803d' },
    error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626', text: '#b91c1c' },
    warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', text: '#b45309' },
    info:    { bg: '#eff6ff', border: '#bfdbfe', icon: '#2563eb', text: '#1d4ed8' }
  };

  /* Dark mode awareness */
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function getDarkColors(type) {
    const map = {
      success: { bg: '#052e16', border: '#166534', icon: '#4ade80', text: '#86efac' },
      error:   { bg: '#450a0a', border: '#991b1b', icon: '#f87171', text: '#fca5a5' },
      warning: { bg: '#451a03', border: '#92400e', icon: '#fbbf24', text: '#fcd34d' },
      info:    { bg: '#0c1a3a', border: '#1e40af', icon: '#60a5fa', text: '#93c5fd' }
    };
    return map[type] || map.info;
  }

  /**
   * showNotification(message, type, duration)
   * type: 'success' | 'error' | 'warning' | 'info'
   * duration: ms (default 3500)
   */
  window.showNotification = function (message, type = 'info', duration = 3500) {
    const container = getContainer();
    const c = isDark() ? getDarkColors(type) : (colors[type] || colors.info);
    const iconClass = icons[type] || icons.info;

    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    Object.assign(toast.style, {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 18px',
      background: c.bg,
      border: `1.5px solid ${c.border}`,
      borderRadius: '14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
      minWidth: '300px',
      maxWidth: '380px',
      pointerEvents: 'all',
      cursor: 'pointer',
      transform: 'translateX(120%)',
      opacity: '0',
      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
      fontFamily: "'Inter', sans-serif"
    });

    toast.innerHTML = `
      <i class="fas ${iconClass}" style="color:${c.icon};font-size:1.1rem;margin-top:2px;flex-shrink:0;"></i>
      <div style="flex:1;">
        <div style="font-size:.9rem;font-weight:600;color:${c.text};line-height:1.4;">${message}</div>
      </div>
      <button aria-label="Dismiss notification" style="background:none;border:none;cursor:pointer;color:${c.icon};opacity:.6;font-size:.8rem;padding:0;margin-top:2px;transition:opacity .2s;" 
        onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=.6">
        <i class="fas fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity   = '1';
      });
    });

    // Dismiss function
    function dismiss() {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity   = '0';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }

    // Auto-dismiss
    const timer = setTimeout(dismiss, duration);

    // Manual dismiss
    toast.addEventListener('click', () => {
      clearTimeout(timer);
      dismiss();
    });
  };
})();
