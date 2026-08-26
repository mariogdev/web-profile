// ==========================================
// Theme Controller (Apple Style Dark / Light Mode)
// ==========================================
(function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

  function toggleTheme() {
    // Agregar clase transitoria para suavizar colores
    document.documentElement.classList.add('theme-transition');
    
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Remover clase de transición después de completarse
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 400);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }

  // Escuchar cambios de preferencia del sistema si el usuario no ha forzado un tema manual
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.add('theme-transition');
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 400);
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú al hacer click en enlaces móviles
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Copiar email al portapapeles con feedback
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'rubengomez.dev@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        if (copyFeedback) {
          copyFeedback.classList.remove('opacity-0', 'pointer-events-none');
          copyFeedback.classList.add('opacity-100');
          setTimeout(() => {
            copyFeedback.classList.remove('opacity-100');
            copyFeedback.classList.add('opacity-0', 'pointer-events-none');
          }, 2000);
        }
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    });
  }

  // Actualizar año en el footer automáticamente
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

