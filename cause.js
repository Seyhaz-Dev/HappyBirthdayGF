(() => {
    'use strict';
    const B = window.Birthday;

    /* ----- the love notes: edit the text here ----- */
    const notes = [
        {
            title: 'To my princess 👑',
            text: 'From the moment you came into my life, everything became a little softer, a little brighter, and so much sweeter. Thank you for being you. 💖',
            gif: 'gif1.gif'
        },
        {
            title: 'Today is yours 🎂',
            text: 'The whole world celebrates the day you were born, and I celebrate every single day that I get to have you in mine. 🥰',
            gif: 'gif2.gif'
        },
        {
            title: 'About your smile 🌸',
            text: 'Your smile is my favorite place for my heart to rest. Please keep smiling, my princess. It makes my whole day. ✨',
            gif: 'gif1.gif'
        },
        {
            title: 'You are my happy place 🏡',
            text: 'You are my comfort, my calm, and my favorite person to talk to. Every little moment with you feels like a gift. 💕',
            gif: 'gif2.gif'
        },
        {
            title: 'My wishes for you 🌟',
            text: 'I wish you endless laughter, gentle mornings and dreams that come true one by one. And I will be right here, cheering for you. 🌷',
            gif: 'gif1.gif'
        },
        {
            title: 'Happy Birthday! 🥳',
            text: 'May this new year love you as much as I do. I am so lucky to be yours, and I promise to keep making you smile. 💝',
            gif: 'gif2.gif'
        }
    ];
    const signOff = 'Yours, always 💌';

    const container = document.getElementById('reasons-container');
    const button = document.querySelector('.shuffle-button');
    const counter = document.querySelector('.reason-counter');
    const dotsBox = document.querySelector('.dots');
    const ending = document.querySelector('.ending-section');

    let index = 0;
    let busy = false;
    let ready = false;

    notes.forEach(() => {
        const d = document.createElement('span');
        d.className = 'dot';
        dotsBox.appendChild(d);
    });

    /* typewriter that never changes the layout (rest of the text stays invisible but takes space) */
    function typeInto(box, text, speed = 32) {
        const vis = document.createElement('span');
        const rest = document.createElement('span');
        rest.className = 'rest';
        box.append(vis, rest);
        const chars = Array.from(text);
        const paint = (n) => {
            vis.textContent = chars.slice(0, n).join('');
            rest.textContent = chars.slice(n).join('');
        };
        if (B.reduce) { paint(chars.length); box.classList.add('typed-done'); return; }
        let i = 0;
        paint(0);
        const tick = () => {
            paint(++i);
            if (i < chars.length) setTimeout(tick, speed);
            else box.classList.add('typed-done');
        };
        tick();
    }

    function createNote(n, i) {
        const card = document.createElement('article');
        card.className = 'note';
        card.style.setProperty('--tilt', (i % 2 ? 1.2 : -1.2) + 'deg');

        /* closed envelope */
        const env = document.createElement('div');
        env.className = 'env';
        env.innerHTML = '<div class="flap"></div><div class="seal">💗</div><span class="env-num">' + (i + 1) + '</span>';

        /* the letter (grid trick = smooth height animation) */
        const body = document.createElement('div');
        body.className = 'note-body';
        const paper = document.createElement('div');
        paper.className = 'paper';

        const title = document.createElement('h2');
        title.className = 'note-title';
        title.textContent = n.title;

        const text = document.createElement('p');
        text.className = 'note-text';

        const sign = document.createElement('p');
        sign.className = 'note-sign';
        sign.textContent = signOff;

        const img = document.createElement('img');
        img.className = 'note-gif';
        img.src = n.gif;
        img.alt = 'A cute animated surprise';
        img.loading = 'lazy';

        paper.append(title, text, sign, img);
        const inner = document.createElement('div');
        inner.className = 'paper-wrap';
        inner.appendChild(paper);
        body.appendChild(inner);

        card.append(env, body);

        // open sequence
        setTimeout(() => card.classList.add('open'), 650);
        setTimeout(() => {
            card.classList.add('gone');
            typeInto(text, n.text);
        }, 1250);
        return card;
    }

    function showNext(e) {
        busy = true;
        const card = createNote(notes[index], index);
        container.appendChild(card);

        dotsBox.children[index].classList.add('on');
        counter.textContent = 'Note ' + (index + 1) + ' of ' + notes.length;
        index++;

        requestAnimationFrame(() =>
            card.scrollIntoView({ behavior: B.reduce ? 'auto' : 'smooth', block: 'center' })
        );
        setTimeout(() => card.scrollIntoView({ behavior: B.reduce ? 'auto' : 'smooth', block: 'center' }), 1500);

        const x = (e && e.clientX) || innerWidth / 2;
        const y = (e && e.clientY) || innerHeight / 2;
        B.burst(x, y, ['💖', '✨', '💌', '🦋', '🌸'], 8);

        if (index === notes.length) {
            ready = true;
            setTimeout(() => {
                button.textContent = 'Enter Our Storylane 💫';
                button.classList.add('story-mode');
                ending.hidden = false;
                B.burst(innerWidth / 2, innerHeight / 2, ['💖', '🎉', '✨', '🎂', '💕'], 18);
            }, 3200);
        }
        setTimeout(() => (busy = false), 1300);
    }

    button.addEventListener('click', (e) => {
        if (ready && button.classList.contains('story-mode')) B.go('last.html');
        else if (!busy && !ready) showNext(e);
    });

    B.startFloaties(['🌸', '✨', '💖', '🦋', '⭐'], 1800);
})();
