(() => {
    'use strict';
    const B = window.Birthday;

    /* ---- typewriter (emoji-safe: splits by character, not UTF-16 unit) ---- */
    const text = "Hey You Know What! You're the most adorable human I ever met! 💖";
    const chars = Array.from(text);
    const typed = document.querySelector('.typed');
    const rest = document.querySelector('.rest');
    const caret = document.querySelector('.caret');

    function render(n) {
        typed.textContent = chars.slice(0, n).join('');
        rest.textContent = chars.slice(n).join('');
    }

    if (B.reduce) {
        render(chars.length);
        caret.classList.add('done');
    } else {
        render(0);
        let i = 0;
        const tick = () => {
            render(++i);
            if (i < chars.length) setTimeout(tick, 70);
            else setTimeout(() => caret.classList.add('done'), 1200);
        };
        setTimeout(tick, 900); // start after the title has dropped in
    }

    /* ---- floating emoji ---- */
    B.startFloaties(['💖', '✨', '🌸', '💫', '💕'], 900);

    /* ---- enter ---- */
    document.querySelector('.cta').addEventListener('click', (e) => {
        B.burst(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, ['💖', '💕', '✨'], 12);
        B.go('cause.html');
    });
})();
