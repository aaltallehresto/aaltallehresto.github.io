// Language switcher logic
const enBtn = document.getElementById('lang-en');
const arBtn = document.getElementById('lang-ar');

function setLang(lang) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
  });
  enBtn.classList.toggle('active', lang === 'en');
  arBtn.classList.toggle('active', lang === 'ar');
}

enBtn.addEventListener('click', () => setLang('en'));
arBtn.addEventListener('click', () => setLang('ar'));

// Default to English
setLang('en');
