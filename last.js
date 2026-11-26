(() => {
    'use strict';
    const B = window.Birthday;

    /* ---- sparkles ---- */
    const sparkleBox = document.querySelector('.magic-sparkles');
    if (!B.reduce) {
        const n = innerWidth < 600 ? 16 : 34;
        for (let i = 0; i < n; i++) {
            const s = document.createElement('span');
            s.className = 'sparkle';
            const size = B.rand(3, 7);
            s.style.width = s.style.height = size + 'px';
            s.style.left = B.rand(0, 100) + '%';
            s.style.top = B.rand(0, 100) + '%';
            s.style.setProperty('--d', B.rand(3, 6).toFixed(1) + 's');
            s.style.setProperty('--delay', (-B.rand(0, 6)).toFixed(1) + 's');
            sparkleBox.appendChild(s);
        }
    }

    /* ---- floating hearts ---- */
    B.startFloaties(['💝', '💖', '💗', '💓', '💕'], 1100);

    /* ---- build the gallery from photos.js ---- */
    const grid = document.querySelector('.memory-container');
    const tilts = [-3, 2.5, -1.5, 3, -2.5, 1.5, -3.5, 2];
    const tapes = ['#ffc2de', '#d9ccff', '#ffe7a8', '#bfeee0', '#ffd0bd', '#c9e4ff'];
    const stickers = ['💖', '🌸', '⭐', '🦋', '🎀', '🍓', '✨', '🧸', '🌷', '🎂', '🐰'];

    (window.PHOTOS || []).forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'memory-card polaroid reveal';
        card.style.setProperty('--i', i % 4);
        card.style.setProperty('--tilt', tilts[i % tilts.length] + 'deg');
        card.style.setProperty('--tape', tapes[i % tapes.length]);
        card.dataset.sticker = stickers[i % stickers.length];

        const btn = document.createElement('button');
        btn.className = 'img-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Open photo: ' + p.title);

        const img = document.createElement('img');
        img.className = 'memory-img';
        img.alt = p.title;
        img.loading = 'lazy';
        img.decoding = 'async';
        if (p.pos) img.style.setProperty('--pos', p.pos);
        if (p.w && p.h) {
            img.width = p.w;
            img.height = p.h;
            img.style.setProperty('--ar', p.w + ' / ' + p.h);
        }
        img.addEventListener('error', () => {
            const ph = document.createElement('div');
            ph.className = 'ph';
            ph.innerHTML = '<span>📸</span>photo ' + String(i + 1).padStart(2, '0') + ' coming soon';
            img.replaceWith(ph);
            card.classList.add('missing');
            btn.disabled = true;
        });
        img.src = p.src;
        btn.appendChild(img);

        const title = document.createElement('h2');
        title.className = 'memory-date';
        title.textContent = p.title;

        card.append(btn, title);
        if (p.caption) {
            const cap = document.createElement('p');
            cap.className = 'memory-caption';
            cap.textContent = p.caption;
            card.appendChild(cap);
        }
        const sp = document.createElement('div');
        sp.className = 'spacer';
        card.appendChild(sp);

        grid.appendChild(card);
    });

    /* ---- reveal on scroll ---- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        en.target.classList.add('in');
                        io.unobserve(en.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('in'));
    }

    /* ---- confetti (tiny canvas particle system, no library) ---- */
    const canvas = document.querySelector('.confetti');
    const ctx = canvas.getContext('2d');
    const colors = ['#ff69b4', '#ff99cc', '#da70d6', '#9b6dff', '#ffd166', '#ffffff', '#7fdbff'];
    let parts = [];
    let running = false;
    let dpr = 1;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener('resize', resize);

    function confetti(count = 120) {
        if (B.reduce) return;
        count = innerWidth < 600 ? Math.round(count * 0.6) : count;
        for (let i = 0; i < count; i++) {
            const fromLeft = i % 2 === 0;
            parts.push({
                x: fromLeft ? 0 : innerWidth,
                y: innerHeight * 0.75,
                vx: (fromLeft ? 1 : -1) * B.rand(4, 13),
                vy: -B.rand(8, 20),
                g: 0.35,
                w: B.rand(6, 11),
                h: B.rand(4, 7),
                rot: B.rand(0, Math.PI * 2),
                vr: B.rand(-0.25, 0.25),
                c: B.pick(colors),
                life: 0
            });
        }
        if (!running) {
            running = true;
            requestAnimationFrame(step);
        }
    }

    function step() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 260);
        for (const p of parts) {
            p.life++;
            p.vy += p.g;
            p.vx *= 0.985;
            p.x += p.vx;
            p.y += p.vy;
            p.rot += p.vr;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.c;
            ctx.globalAlpha = Math.max(0, 1 - p.life / 260);
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        }
        if (parts.length) requestAnimationFrame(step);
        else {
            running = false;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
        }
    }

    // a first celebration when she reaches the final message
    const final = document.querySelector('.final-message');
    if ('IntersectionObserver' in window) {
        const fo = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    confetti(110);
                    fo.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        fo.observe(final);
    }

    document.querySelector('.goodbye-btn').addEventListener('click', (e) => {
        confetti(140);
        B.burst(e.clientX, e.clientY, ['💝', '🎉', '💖', '🎂', '✨'], 14);
    });

    /* ---- 3D tilt on hover (mouse only) ---- */
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !B.reduce) {
        document.querySelectorAll('.polaroid').forEach((card) => {
            card.addEventListener('pointermove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                card.style.setProperty('--ry', (px * 14).toFixed(1) + 'deg');
                card.style.setProperty('--rx', (-py * 14).toFixed(1) + 'deg');
            });
            card.addEventListener('pointerleave', () => {
                card.style.removeProperty('--rx');
                card.style.removeProperty('--ry');
            });
        });
    }

    /* ---- lightbox ---- */
    const dlg = document.querySelector('.lightbox');
    const lbImg = dlg.querySelector('.lb-img');
    const lbCap = dlg.querySelector('.lb-cap');
    const cards = [...document.querySelectorAll('.memory-card')];
    let cur = 0;

    function show(i, dir = 1) {
        cur = (i + cards.length) % cards.length;
        for (let k = 0; k < cards.length && cards[cur].classList.contains('missing'); k++) {
            cur = (cur + dir + cards.length) % cards.length;
        }
        const img = cards[cur].querySelector('.memory-img');
        if (!img) return;
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        const capEl = cards[cur].querySelector('.memory-caption');
        lbCap.textContent = cards[cur].querySelector('.memory-date').textContent + (capEl ? '  ·  ' + capEl.textContent : '');
    }

    cards.forEach((card, i) => {
        card.querySelector('.img-btn').addEventListener('click', () => {
            show(i);
            if (typeof dlg.showModal === 'function') dlg.showModal();
        });
    });

    dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
    dlg.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1, -1));
    dlg.querySelector('.lb-next').addEventListener('click', () => show(cur + 1, 1));

    // click on the dark backdrop closes
    dlg.addEventListener('click', (e) => {
        if (e.target === dlg || e.target.tagName === 'FIGURE') dlg.close();
    });

    dlg.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') show(cur - 1, -1);
        if (e.key === 'ArrowRight') show(cur + 1, 1);
    });

    // swipe left / right on touch screens
    let sx = 0;
    lbImg.addEventListener('pointerdown', (e) => (sx = e.clientX));
    lbImg.addEventListener('pointerup', (e) => {
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
})();
