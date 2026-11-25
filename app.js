(() => {
  'use strict';
  const c = window.WEDDING;
  const $ = (id) => document.getElementById(id);
  const text = (id, value) => { $(id).textContent = value; };
  const dateParts = (value) => {
    const date = new Date(value);
    const format = (options) => new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', ...options }).format(date);
    return { date, day: format({ weekday: 'long' }), full: format({ day: '2-digit', month: '2-digit', year: 'numeric' }), time: format({ hour: '2-digit', minute: '2-digit', hour12: false }) };
  };
  function countdownParts(target, now = Date.now()) {
    const remaining = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
    return { remaining, values: [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60] };
  }
  // Exposed for deterministic date/time verification without browser dependencies.
  window.WeddingUtils = { dateParts, countdownParts };
  document.title = c.site.title;
  const meta = (key, value) => document.querySelector(`meta[${key.startsWith('og:') ? 'property' : 'name'}="${key}"]`).setAttribute('content', value);
  meta('description', c.site.description);
  meta('og:title', c.site.title);
  meta('og:description', c.site.description);
  meta('og:image', c.site.url ? new URL(c.site.shareImage, c.site.url).href : c.site.shareImage);
  if (c.site.url) {
    const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = c.site.url; document.head.append(canonical);
    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); ogUrl.content = c.site.url; if (!ogUrl.isConnected) document.head.append(ogUrl);
  }
  const wedding = dateParts(c.weddingDate);
  $('hero-image').src = c.opening?.src || c.cover?.src || c.hero;
  $('hero-image').alt = c.opening?.alt || `Ảnh cưới ${c.groom.name} và ${c.bride.name}`;
  $('hero-image').style.objectPosition = c.opening?.position || 'center';
  text('invitation-closing', c.invitationClosing);
  for (const role of ['groom', 'bride']) {
    text(`${role}-fullname`, c[role].name);
    text(`${role}-parents`, `${c[role].father}\n${c[role].mother}`);
    text(`${role}-address`, c[role].familyAddress);
  }
  text('thanks', c.thanks); text('footer-names', `${c.groom.name} & ${c.bride.name}`); text('footer-date', wedding.full.replaceAll('/', ' . '));
  $('cover-image').src = c.cover?.src || c.hero;
  $('cover-image').alt = c.cover?.alt || 'Ảnh bìa thiệp cưới';
  $('cover-image').style.objectPosition = c.cover?.position || 'center';
  text('cover-groom', c.groom.name);
  text('cover-bride', c.bride.name);
  text('cover-date', wedding.full.replaceAll('/', '.'));
  $('open-invitation').setAttribute('aria-label', `Mở thiệp cưới ${c.groom.name} và ${c.bride.name}`);
  document.body.classList.add('cover-closed');
  $('open-invitation').addEventListener('click', () => {
    $('cover-screen').hidden = true;
    $('invitation-content').hidden = false;
    document.body.classList.remove('cover-closed');
    window.scrollTo({ top: 0, behavior: 'instant' });
    $('main-content').focus({ preventScroll: true });
    if (c.music?.enabled && $('background-music').paused) $('music-toggle').click();
  }, { once: true });
  function element(tag, className, content) {
    const el = document.createElement(tag); if (className) el.className = className;
    if (content !== undefined) el.textContent = content; return el;
  }
  (c.interludes || []).forEach((photo) => {
    const slot = $(photo.slot);
    if (!slot || !photo.src) return;
    const figure = element('figure', 'interlude-frame');
    const img = element('img');
    img.src = photo.src; img.alt = photo.alt;
    img.loading = 'lazy'; img.decoding = 'async';
    img.width = 1200; img.height = 900;
    img.style.objectPosition = photo.position || 'center';
    const caption = element('figcaption', 'interlude-caption');
    caption.append(element('p', 'eyebrow', photo.eyebrow), element('p', 'interlude-quote', photo.caption));
    figure.append(img, caption); slot.append(figure); slot.hidden = false;
  });
  c.events.forEach((event) => {
    const date = dateParts(event.datetime);
    const card = element('article', 'event-card');
    card.append(element('p', 'eyebrow', event.side.toLocaleUpperCase('vi')), element('h3', '', event.title));
    if (event.ceremonyDatetime) {
      const ceremony = element('time', 'event-time', `HÔN LỄ: ${dateParts(event.ceremonyDatetime).time}`);
      ceremony.dateTime = event.ceremonyDatetime;
      card.append(ceremony);
    }
    const reception = element('time', 'event-time', `TIỆC CƯỚI: ${date.time}`);
    reception.dateTime = event.datetime;
    card.append(reception);
    const time = element('time', 'event-date', date.full.replaceAll('/', ' . ')); time.dateTime = event.datetime;
    card.append(time, element('p', 'event-day', date.day), element('hr'), element('p', 'event-venue', event.venue), element('p', 'event-address', event.address));
    const map = element('a', 'map-link', `Chỉ đường - ${event.side === 'Nhà trai' ? 'Lễ thành hôn' : 'Lễ vu quy'}`);
    const mapIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    mapIcon.setAttribute('viewBox', '0 0 24 24');
    mapIcon.setAttribute('aria-hidden', 'true');
    mapIcon.innerHTML = '<path d="m21 3-6.5 18-4-7.5L3 9.5 21 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
    map.prepend(mapIcon);
    map.href = event.mapsUrl; map.target = '_blank'; map.rel = 'noopener noreferrer'; map.setAttribute('aria-label', `Chỉ đường đến ${event.title} (${event.side}), mở tab mới`); card.append(map);
    if (event.transport) {
      const transport = element('aside', 'event-transport');
      transport.append(element('p', 'event-transport-title', 'Thông tin xe đưa rước'), element('p', 'event-transport-pickup', event.transport.pickup), element('p', 'event-transport-detail', event.transport.return));
      if (event.transport.duration) transport.append(element('p', 'event-transport-detail', event.transport.duration));
      card.append(transport);
    }
    $('event-list').append(card);
  });
  const months = new Map();
  c.events.forEach((event) => {
    const [day, month, year] = dateParts(event.datetime).full.split('/').map(Number);
    const key = `${year}-${month}`;
    if (!months.has(key)) months.set(key, { year, month, days: new Map() });
    const days = months.get(key).days;
    days.set(day, [...(days.get(day) || []), event]);
  });
  [...months.values()].sort((a, b) => a.year - b.year || a.month - b.month).forEach(({ year, month, days }) => {
    const panel = element('div', 'calendar-panel');
    const table = element('table', 'calendar-table');
    table.append(element('caption', '', `Tháng ${month} · ${year}`));
    const head = element('thead'); const heading = element('tr');
    ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].forEach((day) => { const cell = element('th', '', day); cell.scope = 'col'; heading.append(cell); });
    head.append(heading); table.append(head);
    const body = element('tbody');
    const offset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(year, month, 0)).getUTCDate();
    for (let i = 0; i < Math.ceil((offset + count) / 7) * 7; i += 7) {
      const row = element('tr');
      for (let j = 0; j < 7; j++) {
        const day = i + j - offset + 1;
        const cell = element('td');
        if (day > 0 && day <= count) {
          const events = days.get(day);
          const label = events ? `${day}/${month}/${year}: ${events.map(e => `${e.side}, tiệc cưới ${dateParts(e.datetime).time}`).join('; ')}` : `${day}/${month}/${year}`;
          const time = element('time', events ? 'calendar-marked' : '', day);
          time.dateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          time.setAttribute('aria-label', label); cell.append(time);
        }
        row.append(cell);
      }
      body.append(row);
    }
    table.append(body); panel.append(table);
    const legend = element('div', 'calendar-legend');
    [...days.entries()].sort((a, b) => a[0] - b[0]).forEach(([day, events]) => events.forEach(event => legend.append(element('p', '', `♥ ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')} · ${event.side} · ${dateParts(event.datetime).time}`))));
    panel.append(legend); $('wedding-calendar').append(panel);
  });
  const units = ['Ngày', 'Giờ', 'Phút', 'Giây'];
  const counters = units.map((unit) => {
    const box = element('div'); const value = element('strong', '', '00'); box.append(value, element('span', '', unit)); $('countdown').append(box); return value;
  });
  function updateCountdown() {
    const parts = countdownParts(c.weddingDate);
    $('countdown').hidden = parts.remaining === 0;
    $('countdown-message').hidden = parts.remaining > 0;
    parts.values.forEach((value, i) => { counters[i].textContent = String(value).padStart(2, '0'); });
  }
  updateCountdown();
  let countdownTimer = setInterval(updateCountdown, 1000);
  window.addEventListener('pagehide', () => clearInterval(countdownTimer));
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) { updateCountdown(); countdownTimer = setInterval(updateCountdown, 1000); }
  });
  let currentPhoto = 0;
  let previousFocus;
  function openDialog(dialog) {
    previousFocus = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); dialog.querySelector('[data-close]').focus();
  }
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); previousFocus?.focus(); });
  });
  function showPhoto(index) {
    if (!c.album.length) return;
    currentPhoto = (index + c.album.length) % c.album.length;
    const photo = c.album[currentPhoto]; $('large-photo').src = photo.src; $('large-photo').alt = photo.alt;
    text('album-caption', photo.caption); text('image-count', `${currentPhoto + 1} / ${c.album.length}`);
  }
  let activeSlide = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let autoSlides = !reducedMotion.matches;
  let albumVisible = false;
  const slideButtons = [];
  const wrapSlide = (index) => (index + c.album.length) % c.album.length;
  function renderSlides() {
    slideButtons.forEach((button, index) => {
      const position = index === activeSlide ? 'center' : index === wrapSlide(activeSlide - 1) ? 'left' : index === wrapSlide(activeSlide + 1) ? 'right' : '';
      button.hidden = !position;
      button.className = `album-slide album-slide--${position}`;
      button.setAttribute('aria-label', position === 'center' ? `Xem ảnh ${index + 1}: ${c.album[index].alt}` : `Chuyển đến ảnh ${index + 1}`);
      button.tabIndex = position === 'center' ? 0 : -1;
    });
    text('album-position', c.album.length ? `${activeSlide + 1} / ${c.album.length}` : '');
    text('album-current-caption', c.album[activeSlide]?.caption || '');
  }
  function moveSlides(step) {
    if (!c.album.length) return;
    const focusedSlide = slideButtons.includes(document.activeElement);
    activeSlide = wrapSlide(activeSlide + step); renderSlides();
    if (focusedSlide) $('album-list').focus({ preventScroll: true });
  }
  c.album.forEach((photo, index) => {
    const button = element('button', 'album-slide');
    const img = element('img'); img.src = photo.src; img.alt = photo.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = 800; img.height = 1000;
    button.append(img);
    button.addEventListener('click', () => {
      if (index !== activeSlide) { activeSlide = index; renderSlides(); return; }
      showPhoto(index); openDialog($('album-dialog'));
    });
    slideButtons.push(button); $('album-list').append(button);
  });
  $('album').hidden = c.album.length === 0;
  document.querySelector('.bottom-nav a[href="#album"]').hidden = c.album.length === 0;
  renderSlides();
  $('album-previous').addEventListener('click', () => moveSlides(-1));
  $('album-next').addEventListener('click', () => moveSlides(1));
  function syncAutoplay() {
    $('album-autoplay').setAttribute('aria-pressed', String(autoSlides));
    $('album-autoplay').setAttribute('aria-label', autoSlides ? 'Tạm dừng tự chuyển ảnh' : 'Bật tự chuyển ảnh');
    $('album-autoplay').textContent = autoSlides ? 'Ⅱ' : '▷';
  }
  syncAutoplay();
  $('album-autoplay').addEventListener('click', () => { autoSlides = !autoSlides; syncAutoplay(); });
  reducedMotion.addEventListener('change', (event) => { if (event.matches) { autoSlides = false; syncAutoplay(); } });
  $('album-list').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveSlides(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  let touchStart;
  $('album-list').addEventListener('touchstart', (event) => { touchStart = [event.touches[0].clientX, event.touches[0].clientY]; }, { passive: true });
  $('album-list').addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart[0];
    const dy = event.changedTouches[0].clientY - touchStart[1];
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) moveSlides(dx < 0 ? 1 : -1);
  }, { passive: true });
  $('album-list').addEventListener('touchcancel', () => { touchStart = null; });
  const observer = new IntersectionObserver(([entry]) => { albumVisible = entry.isIntersecting; }, { threshold: 0.25 });
  observer.observe($('album-list'));
  setInterval(() => {
    if (autoSlides && albumVisible && c.album.length > 1 && !document.hidden && !document.querySelector('dialog[open]') && !touchStart) moveSlides(1);
  }, 2000);
  $('previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1)); $('next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
  $('previous-photo').hidden = $('next-photo').hidden = c.album.length < 2;
  $('album-dialog').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
  const wish = $('wedding-wish');
  const guestName = $('guest-name');
  const attendance = $('guest-attendance');
  const adults = $('guest-adults');
  const children = $('guest-children');
  try {
    wish.value = localStorage.getItem('wedding-wish') || '';
    const saved = JSON.parse(localStorage.getItem('wedding-rsvp') || 'null');
    if (saved) {
      guestName.value = saved.name || '';
      attendance.value = saved.attendance || '';
      adults.value = Number.isSafeInteger(saved.adults) && saved.adults >= 1 ? saved.adults : 1;
      children.value = Number.isSafeInteger(saved.children) && saved.children >= 0 ? saved.children : 0;
      wish.value = saved.wish || wish.value;
    }
  } catch {}
  const updateGuestCounts = () => {
    const declined = attendance.value === 'no';
    $('guest-counts').hidden = declined;
    adults.disabled = declined;
    children.disabled = declined;
  };
  attendance.addEventListener('change', updateGuestCounts);
  updateGuestCounts();
  wish.addEventListener('input', () => {
    try { localStorage.setItem('wedding-wish', wish.value); } catch {}
  });
  let rsvpSending = false;
  $('rsvp-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (rsvpSending) return;
    if (!guestName.value.trim()) {
      guestName.setCustomValidity('Vui lòng nhập tên của bạn.');
      guestName.reportValidity();
      return;
    }
    const data = {
      name: guestName.value.trim(), wish: wish.value.trim(),
      attendance: attendance.value,
      adults: attendance.value === 'no' ? 0 : Number(adults.value),
      children: attendance.value === 'no' ? 0 : Number(children.value)
    };
    try {
      localStorage.setItem('wedding-rsvp', JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
    } catch {}
    const submit = $('rsvp-form').querySelector('[type="submit"]');
    rsvpSending = true;
    submit.disabled = true;
    submit.textContent = 'Đang gửi…';
    $('rsvp-form').setAttribute('aria-busy', 'true');
    text('copy-status', 'Đang gửi xác nhận của bạn…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(c.rsvpEndpoint, {
        method: 'POST', body: new URLSearchParams(data),
        credentials: 'omit', signal: controller.signal
      });
      const result = (await response.text()).trim();
      if (response.ok && result === 'error') {
        text('copy-status', 'Hệ thống lưu xác nhận đang gặp lỗi. Vui lòng liên hệ cô dâu chú rể để xác nhận tham dự.');
        return;
      }
      if (!response.ok || result !== 'ok') {
        throw new Error('RSVP was not acknowledged');
      }
      text('copy-status', 'Đã gửi xác nhận. Cảm ơn bạn đã gửi lời yêu thương đến chúng mình!');
    } catch {
      text('copy-status', 'Chưa nhận được xác nhận gửi thành công. Bạn vui lòng kiểm tra kết nối; nếu đã gửi, hãy kiểm tra với cô dâu chú rể trước khi gửi lại để tránh trùng.');
    } finally {
      clearTimeout(timeout);
      rsvpSending = false;
      submit.disabled = false;
      submit.textContent = 'Xác nhận';
      $('rsvp-form').removeAttribute('aria-busy');
    }
  });
  guestName.addEventListener('input', () => guestName.setCustomValidity(''));
  document.querySelectorAll('[data-open-gifts]').forEach((button) => button.addEventListener('click', () => { text('copy-status', ''); openDialog($('gift-dialog')); }));
  if (c.music?.enabled && c.music.src) {
    const audio = $('background-music');
    const toggle = $('music-toggle');
    audio.src = c.music.src;
    audio.volume = Math.max(0, Math.min(1, c.music.volume ?? 0.12));
    $('music-control').hidden = false;
    let pending = false;
    const syncMusic = () => {
      const playing = !audio.paused;
      toggle.setAttribute('aria-pressed', String(playing));
      toggle.setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
      text('music-label', playing ? 'Tắt nhạc' : 'Bật nhạc');
      text('music-icon', playing ? 'Ⅱ' : '♫');
    };
    audio.addEventListener('play', syncMusic);
    audio.addEventListener('pause', syncMusic);
    audio.addEventListener('error', () => {
      text('music-status', 'Chưa tải được nhạc. Bạn hãy thử lại.');
      syncMusic();
    });
    toggle.addEventListener('click', async () => {
      if (pending) return;
      text('music-status', '');
      if (!audio.paused) { audio.pause(); return; }
      pending = true;
      toggle.setAttribute('aria-busy', 'true');
      try {
        if (audio.error) audio.load();
        await audio.play();
      } catch {
        text('music-status', 'Chưa phát được nhạc. Bạn hãy bấm để thử lại.');
      } finally {
        pending = false;
        toggle.removeAttribute('aria-busy');
        syncMusic();
      }
    });
  }
})();
