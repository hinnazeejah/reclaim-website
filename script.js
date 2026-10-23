/* EDIT LINKS HERE. Replace "#" with each real URL. All external form,
   profile, and social links are controlled by this CONFIG object. */
const CONFIG = {
  rsvp: "https://partiful.com/e/ZkZRomSJSk0BPVPQk1PR",
  speaker: "https://docs.google.com/forms/d/e/1FAIpQLSfbK83FnpVJWIbScCCiatM2IVSI2NK_8fqfWJFO7nj0B0QcjQ/viewform",
  sponsor: "https://docs.google.com/forms/d/e/1FAIpQLScWhGixK6Pc8zImjmp6yoUZPlXf_4rhVzPIkasqn5HntN_3cQ/viewform",
  maps: "https://www.google.com/maps/search/?api=1&query=University+of+California+Irvine",
  companies: {
    rivian: "https://rivian.com/",
    brava: "https://brava.world/",
    dtcc: "https://www.dtcc.com/"
  },
  linkedin: {
    kenton: "https://www.linkedin.com/in/kentonraiford/",
    monica: "https://www.linkedin.com/in/monicapara/",
    karen: "https://www.linkedin.com/in/karenhuang55/",
    viviana: "https://www.linkedin.com/in/v-salazar/",
    aimen: "https://www.linkedin.com/in/aimen-moten/",
    hinna: "https://www.linkedin.com/in/hinna-zeejah/",
    serena: "https://www.linkedin.com/in/serena-kim-sujin/",
    deepika: "https://www.linkedin.com/in/deepikash4rma/",
    mariyam: "https://www.linkedin.com/in/mariyam-zaki/"
  },
  socials: { instagram: "#", tiktok: "#", linkedin: "#" }
};

const notice = document.querySelector('#link-notice');
let noticeTimeout;
document.querySelectorAll('[data-link]').forEach(link => {
  const url = link.dataset.link.split('.').reduce((value, key) => value?.[key], CONFIG) || '#';
  link.href = url;
  if (url === '#') {
    link.addEventListener('click', event => {
      event.preventDefault();
      notice.textContent = link.dataset.link === 'rsvp'
        ? 'RSVP link coming soon. We can’t wait to meet you!'
        : 'This link is coming soon. For now, reach us in the Contact section.';
      notice.hidden = false;
      clearTimeout(noticeTimeout);
      noticeTimeout = setTimeout(() => { notice.hidden = true; }, 5500);
    });
  }
});

// Official image assets always take priority. Fall back quietly if missing.
function useArtwork(imageId, fallbackId) {
  const image = document.getElementById(imageId);
  const fallback = document.getElementById(fallbackId);
  const showImage = () => { image.hidden = false; fallback.hidden = true; };
  const showFallback = () => { image.hidden = true; fallback.hidden = false; };
  image.addEventListener('load', showImage);
  image.addEventListener('error', showFallback);
  if (image.complete) image.naturalWidth ? showImage() : showFallback();
}
useArtwork('hero-logo', 'logo-fallback');
useArtwork('event-poster', 'poster-fallback');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const desktopQuery = matchMedia('(min-width: 801px)');
desktopQuery.addEventListener('change', () => closeMenu());

// October 28 is daylight saving time in Los Angeles: UTC−07:00.
const EVENT_DATE = new Date('2026-10-28T09:00:00-07:00').getTime();
function updateCountdown(now = Date.now()) {
  const remaining = EVENT_DATE - now;
  if (remaining <= 0) {
    const countdown = document.querySelector('#countdown');
    countdown.removeAttribute('role');
    countdown.removeAttribute('aria-label');
    const heartIcon = document.querySelector('.glyph-hearts').cloneNode(true);
    countdown.replaceChildren(document.createTextNode('Thank you for reclaiming it with us '), heartIcon);
    document.querySelector('.countdown-caption').hidden = true;
    return false;
  }
  const totalMinutes = Math.floor(remaining / 60000);
  document.querySelector('#days').textContent = String(Math.floor(totalMinutes / 1440)).padStart(2, '0');
  document.querySelector('#hours').textContent = String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(totalMinutes % 60).padStart(2, '0');
  return true;
}
if (updateCountdown()) {
  const countdownInterval = setInterval(() => { if (!updateCountdown()) clearInterval(countdownInterval); }, 1000);
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .swoop').forEach(element => observer.observe(element));
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); }
  });
}
