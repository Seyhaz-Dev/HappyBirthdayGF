(() => {
    'use strict';
    const B = window.Birthday;

    const reasons = [
        {
            text: "You’re such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💖",
            emoji: '🌟',
            gif: 'gif1.gif'
        },
        {
            text: 'May your day be filled with love, laughter, and endless joy. 🌸',
            emoji: '💗',
            gif: 'gif2.gif'
        },
        {
            text: 'Wishing you success, happiness, and everything your heart desires. ✨',
            emoji: '💕',
            gif: 'gif1.gif'
        },
        {
            text: 'Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳',
            emoji: '🌟',
            gif: 'gif2.gif'
        }
    ];

    const container = document.getElementById('reasons-container');
    const button = document.querySelector('.shuffle-button');
    const counter = document.querySelector('.reason-counter');
    const dotsBox = document.querySelector('.dots');
    const ending = document.querySelector('.ending-section');

    let index = 0;
    let busy = false;
    let ready = false; // true once every wish is open → button leads to the next page

    // progress dots
    reasons.forEach(() => {
        const d = document.createElement('span');
        d.className = 'dot';
        dotsBox.appendChild(d);
    });

    function createCard(reason, i) {
        const card = document.createElement('article');
        card.className = 'reason-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        const num = document.createElement('span');
        num.className = 'reason-num';
        num.textContent = i + 1;

        const text = document.createElement('p');
        text.className = 'reason-text';
        text.textContent = `${reason.emoji} ${reason.text}`;

        const hint = document.createElement('span');
        hint.className = 'peek-hint';
        hint.textContent = 'tap to peek 👀';

        const overlay = document.createElement('div');
        overlay.className = 'gif-overlay';
        const img = document.createElement('img');
        img.src = reason.gif;
        img.alt = 'A cute animated surprise';
        img.loading = 'lazy';
        overlay.appendChild(img);

        card.append(num, text, hint, overlay);

        const toggle = () => {
            const on = card.classList.toggle('peek');
            card.setAttribute('aria-pressed', String(on));
            hint.textContent = on ? 'tap to go back' : 'tap to peek 👀';
        };
        card.addEventListener('click', toggle);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
        return card;
    }

    function showNext(e) {
        busy = true;
        const card = createCard(reasons[index], index);
        container.appendChild(card);

        dotsBox.children[index].classList.add('on');
        counter.textContent = `Reason ${index + 1} of ${reasons.length}`;
        index++;

        // bring the new card into view (the sticky button stays reachable)
        requestAnimationFrame(() =>
            card.scrollIntoView({ behavior: B.reduce ? 'auto' : 'smooth', block: 'center' })
        );

        const x = (e && e.clientX) || innerWidth / 2;
        const y = (e && e.clientY) || innerHeight / 2;
        B.burst(x, y, ['💖', '✨', '🌸', '🦋', '⭐'], 7);

        if (index === reasons.length) {
            ready = true;
            setTimeout(() => {
                button.textContent = 'Enter Our Storylane 💫';
                button.classList.add('story-mode');
                ending.hidden = false;
                B.burst(innerWidth / 2, innerHeight / 2, ['💖', '🎉', '✨', '🎂', '💕'], 16);
            }, 700);
        }

        setTimeout(() => (busy = false), 500);
    }

    button.addEventListener('click', (e) => {
        if (ready && button.classList.contains('story-mode')) {
            B.go('last.html');
        } else if (!busy && !ready) {
            showNext(e);
        }
    });

    B.startFloaties(['🌸', '✨', '💖', '🦋', '⭐'], 1800);
})();
