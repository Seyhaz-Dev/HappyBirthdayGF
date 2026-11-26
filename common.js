/* =========================================================
   Shared helpers – floating emoji, tap bursts, cursor,
   page transitions.  Exposed as window.Birthday
   ========================================================= */
(function () {
    'use strict';

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const small = () => innerWidth < 600;

    const rand = (a, b) => Math.random() * (b - a) + a;
    const pick = (list) => list[Math.floor(Math.random() * list.length)];
    const EMOJI = ['💖', '✨', '🌸', '💫', '💕'];

    /* ---- floating layer ---- */
    const fx = document.createElement('div');
    fx.className = 'fx';
    fx.setAttribute('aria-hidden', 'true');
    document.body.prepend(fx);

    function floaty(list = EMOJI) {
        if (reduce || document.hidden) return;
        if (fx.childElementCount > (small() ? 10 : 20)) return;

        const el = document.createElement('span');
        el.className = 'floaty';
        el.textContent = pick(list);
        el.style.left = rand(2, 96) + '%';
        el.style.fontSize = rand(18, small() ? 30 : 38) + 'px';
        el.style.setProperty('--d', rand(8, 14).toFixed(1) + 's');
        el.style.setProperty('--x', rand(-60, 60).toFixed(0) + 'px');
        el.style.setProperty('--r', rand(-200, 200).toFixed(0) + 'deg');
        fx.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }

    function startFloaties(list = EMOJI, every = 900) {
        for (let i = 0; i < 4; i++) setTimeout(() => floaty(list), i * 250);
        return setInterval(() => floaty(list), small() ? every * 1.4 : every);
    }

    /* ---- tap / click burst ---- */
    function burst(x, y, list = EMOJI, count = 6) {
        if (reduce) return;
        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.className = 'burst';
            el.textContent = pick(list);
            const angle = Math.random() * Math.PI * 2;
            const dist = rand(40, 95);
            el.style.setProperty('--x', x + 'px');
            el.style.setProperty('--y', y + 'px');
            el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            el.style.setProperty('--dy', Math.sin(angle) * dist - 30 + 'px');
            el.style.fontSize = rand(14, 24) + 'px';
            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        }
    }

    document.addEventListener('pointerdown', (e) => {
        if (e.target.closest('input, textarea, dialog')) return;
        burst(e.clientX, e.clientY);
    });

    /* ---- heart cursor (mouse devices only) ---- */
    if (finePointer) {
        const c = document.createElement('div');
        c.className = 'cursor';
        c.setAttribute('aria-hidden', 'true');
        c.innerHTML =
            '<svg viewBox="0 0 24 24"><path fill="#ff69b4" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        document.body.appendChild(c);
        document.body.classList.add('has-cursor');

        let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
        const loop = () => {
            x += (tx - x) * 0.28;
            y += (ty - y) * 0.28;
            c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
        };
        addEventListener('pointermove', (e) => {
            if (e.pointerType !== 'mouse') return;
            tx = e.clientX;
            ty = e.clientY;
            c.classList.add('on');
            if (!raf) raf = requestAnimationFrame(loop);
        });
        document.addEventListener('pointerover', (e) => {
            c.classList.toggle('big', !!e.target.closest('a, button, [role="button"], [data-hover]'));
        });
        document.documentElement.addEventListener('mouseleave', () => c.classList.remove('on'));
    }

    /* ---- page transition ---- */
    function go(url) {
        if (reduce) return void (location.href = url);
        document.body.classList.add('leaving');
        setTimeout(() => (location.href = url), 550);
    }
    addEventListener('pageshow', (e) => {
        if (e.persisted) document.body.classList.remove('leaving');
    });

    window.Birthday = { reduce, rand, pick, floaty, startFloaties, burst, go, EMOJI };
})();
