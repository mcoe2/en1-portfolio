// "Ask Jumbo": a scripted chat with the site's elephant mascot.
// No AI and no server: Jumbo matches keywords in the question to the
// answers below. To teach Jumbo something new, add an entry to TOPICS.
(function () {
    'use strict';

    // Each topic: words that trigger it, and the reply (HTML; links allowed).
    // Replies only use facts from this site and Max's résumé.
    const TOPICS = [
        {
            words: ['hi', 'hello', 'hey', 'yo', 'sup', 'howdy', 'hiya'],
            reply: 'Hi there! I&rsquo;m Jumbo, this site&rsquo;s guide. Ask me about his projects, his game UltiMax, his r&eacute;sum&eacute;, or this website.'
        },
        {
            words: ['jumbo', 'elephant', 'your name', 'who are you', 'mascot'],
            reply: 'I&rsquo;m Jumbo, this site&rsquo;s guide, named after Tufts&rsquo; mascot, Jumbo the elephant. I can point you to Max&rsquo;s projects, r&eacute;sum&eacute; and contact info.'
        },
        {
            words: ['who is max', 'about max', 'max', 'about him', 'student', 'major', 'tufts', 'study', 'studies', 'year'],
            reply: 'Max Coe is a first-year at Tufts University, double-majoring in mechanical engineering and computer science (class of 2030). He&rsquo;s on the Tufts Ultimate Frisbee Team and in the Tufts Solar Vehicle and Robotics clubs.'
        },
        {
            words: ['ultimax', 'game', 'games', 'godot', 'play it', 'video game'],
            reply: 'UltiMax is Max&rsquo;s free pixel-art ultimate frisbee game, made in Godot. It has real ultimate rules, AI teams that run stacks and hucks, and a 12-player roster you build up with coins. <a href="./ultimax.html">See the trailer</a> or <a href="https://ultimax-frisbee.vercel.app" target="_blank" rel="noopener">play it free</a>.'
        },
        {
            words: ['ultimate', 'frisbee', 'disc', 'glory', 'boston glory', 'sport', 'sports', 'athlete', 'world', 'gold', 'team usa'],
            reply: 'Ultimate is a big deal for Max! He plays for the Boston Glory, a pro team in the Ultimate Frisbee Association, and he won a gold medal with the U.S. Under-20 national team at the 2026 World Championships in Spain. He was also a 3-year varsity captain in high school.'
        },
        {
            words: ['resume', 'résumé', 'cv', 'experience', 'job', 'jobs', 'work history', 'intern', 'internship', 'hire', 'hiring'],
            reply: 'Max has interned with the Town of Bedford&rsquo;s Engineering Department, teaches coding at KTBYTE, and has written analytics code for ShownSpace, an ultimate frisbee startup. <a href="./resume.html">Read his full r&eacute;sum&eacute;</a>.'
        },
        {
            words: ['skill', 'skills', 'language', 'languages', 'code', 'coding', 'program', 'programming', 'java', 'python', 'c++', 'matlab', 'javascript', 'unity', 'unreal'],
            reply: 'Max codes in Java, Python, MATLAB, JavaScript/HTML/CSS and C++, and builds games in Godot, Unity and Unreal Engine. In EN1 he programs LEGO SPIKE Prime robots in Python.'
        },
        {
            words: ['award', 'awards', 'usaco', 'olympiad', 'certification', 'ap scholar', 'achievement', 'achievements'],
            reply: 'A few highlights: USA Computing Olympiad Silver level, a MathWorks Machine Learning Onramp certification, AP Scholar with Distinction, and a U-20 Ultimate World Championship gold medal.'
        },
        {
            words: ['contact', 'email', 'reach', 'linkedin', 'github', 'message', 'talk to max', 'get in touch'],
            reply: 'You can email Max at <a href="mailto:mcoe02@tufts.edu">mcoe02@tufts.edu</a>, or find him on <a href="https://www.linkedin.com/in/max-coe-9aa770360" target="_blank" rel="noopener">LinkedIn</a> and <a href="https://github.com/mcoe2" target="_blank" rel="noopener">GitHub</a>.'
        },
        {
            words: ['en1', 'class', 'course', 'robotics', 'his projects', 'the projects', 'what projects', 'all projects', 'activities', 'lego', 'spike'],
            reply: 'EN1: Applications in Engineering is Max&rsquo;s robotics course at Tufts. He builds LEGO SPIKE Prime projects like a robotic arm, a square-drawing robot and a one-handed astronaut tool. <a href="./index.html#projects">Browse the projects</a>.'
        },
        {
            words: ['best', 'favorite', 'favourite', 'coolest', 'recommend', 'look at first', 'start with', 'one thing', 'impressive'],
            reply: 'If you only look at one thing, try <a href="./ultimax.html">UltiMax</a>, Max&rsquo;s ultimate frisbee game. From EN1, the <a href="./project09.html">Robotic Arm</a> and <a href="./project03.html">Biomimicry</a> (a motorized LEGO elephant trunk) have great videos.'
        },
        {
            words: ['website', 'site', 'built', 'made', 'make', 'html', 'css', 'github pages', 'design', 'how was'],
            reply: 'This site is plain HTML, CSS and a little JavaScript, hosted free on GitHub Pages. No frameworks. The brown and blue colors and the elephant logo are a nod to Tufts&rsquo; mascot, Jumbo. This chat is a scripted list of answers in a file called chat.js.'
        },
        {
            words: ['scroll', 'grid', 'view', 'layout', 'toggle', 'navigate', 'find', 'arrows'],
            reply: 'On the home page, the EN1 sections scroll sideways. Use the arrow buttons or swipe. Prefer to see everything at once? Hit <strong>Grid</strong> next to the section title, and the site will remember your choice.'
        },
        {
            words: ['in progress', 'unfinished', 'missing', 'coming soon'],
            reply: 'Cards tagged &ldquo;In progress&rdquo; are projects Max is still documenting. More photos, videos and code are on the way!'
        },
        // Individual projects
        { words: ['arm', 'robotic arm', 'ping pong', 'ball'],
          reply: 'For the <a href="./project09.html">Robotic Arm</a>, Max built an arm that picks up a ping-pong ball and passes it down a line of classmates&rsquo; arms.' },
        { words: ['square', 'draw a square', 'drawing robot'],
          reply: 'In <a href="./project07.html">Draw a Square</a>, Max&rsquo;s robot had one shot to draw a square between two target squares, and it checked off everything on the rubric.' },
        { words: ['astronaut', 'space', 'nut', 'bolt', 'washer', 'glove', 'gloves'],
          reply: 'For <a href="./project08.html">Astronaut Tools</a>, Max designed a one-handed tool for a spacewalk. It uses a wheel to spin the washer off the bolt.' },
        { words: ['car', 'simple car', 'sensor', 'sensors', 'color sensor', 'colour'],
          reply: '<a href="./project06.html">Simple Car + Sensors</a> combines a driving car with a color sensor: hold up a colored LEGO brick and the car reads it and drives.' },
        { words: ['spirograph', 'pattern', 'patterns', 'drawing machine'],
          reply: 'The <a href="./project05.html">Spirograph Drawing Machine</a> makes repeating geometric patterns. Max tested how small changes in motion and spacing change the drawing.' },
        { words: ['top', 'spinning', 'spinner', 'gear', 'gears'],
          reply: 'For the <a href="./project04.html">Top Spinner</a>, Max used gear ratios to control how fast a spinning top spins.' },
        { words: ['biomimicry', 'trunk', 'nature', 'animal'],
          reply: 'For <a href="./project03.html">Biomimicry</a>, Max built a motorized LEGO elephant trunk that curls around a branch.' },
        { words: ['silly', 'walk', 'walks', 'walking', 'legs'],
          reply: 'In <a href="./project02.html">Silly Walks</a>, Max built a robot with big legs and grippers to walk as far as possible.' },
        { words: ['getting to know', 'introduce', 'first project'],
          reply: 'For <a href="./project01.html">Getting to Know You</a>, Max built a LEGO ultimate frisbee display to introduce himself.' },
        { words: ['hub to hub', 'hub', 'hubs', 'sender', 'receiver', 'distance sensor', 'prepping'],
          reply: 'For <a href="./activity06.html">Prepping for Haunted House</a>, Max got two SPIKE hubs talking: a sender hub with a distance sensor tells a receiver hub to spin its motor.' },
        { words: ['haunted', 'halloween', 'spooky', 'scary'],
          reply: 'Max&rsquo;s group is building an exhibit for the EN1 <a href="./project10.html">Haunted House</a> in the Nolop Makerspace on October 30th. Stay tuned!' },
        { words: ['coaster', 'joker'],
          reply: 'For <a href="./activity01.html">Design a Coaster</a>, Max designed a drink coaster for an unusual client: the Joker.' },
        { words: ['airplane', 'plane', 'paper'],
          reply: 'In <a href="./activity03.html">Paper Airplane</a>, Max combined AI suggestions with trial-and-error tests to make a plane fly farther.' },
        { words: ['blender', 'redesign', 'tornado', 'tornadoes'],
          reply: 'For <a href="./activity02.html">Object Redesign</a>, Max reimagined a blender as a machine for stopping tornadoes.' },
        {
            words: ['thanks', 'thank you', 'thx', 'cool', 'awesome', 'nice', 'great'],
            reply: 'Happy to help! Anything else you&rsquo;d like to know?'
        },
        {
            words: ['bye', 'goodbye', 'see ya', 'later', 'cya'],
            reply: 'Bye for now! I&rsquo;ll be right here in the corner if you need me.'
        }
    ];

    const FALLBACK = 'Sorry, I don&rsquo;t have an answer for that one. I know about Max, his projects, UltiMax, his r&eacute;sum&eacute;, and this website. Try one of the buttons below!';

    const SUGGESTIONS = [
        'Who is Max?',
        'Tell me about UltiMax',
        'What should I look at first?',
        'Show me his résumé',
        'How was this site made?',
        'How do I contact him?'
    ];

    function normalize(text) {
        return ' ' + text.toLowerCase().replace(/[^a-z0-9+é' ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
    }

    // Pick the topic whose trigger words best match the question.
    // Longer phrases count more, so "robotic arm" beats a stray "robot".
    function answer(question) {
        const text = normalize(question);
        let best = null;
        let bestScore = 0;
        for (const topic of TOPICS) {
            let score = 0;
            for (const word of topic.words) {
                if (text.includes(' ' + word + ' ')) {
                    score += word.split(' ').length * 2 + word.length / 10;
                }
            }
            if (score > bestScore) {
                best = topic;
                bestScore = score;
            }
        }
        return best ? best.reply : FALLBACK;
    }

    // ---------- Build the chat window ----------

    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'chat-launcher';
    launcher.setAttribute('aria-label', 'Chat with Jumbo the elephant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = '<img src="./images/jumbo.svg" alt=""><span>Ask Jumbo</span>';

    const panel = document.createElement('section');
    panel.className = 'chat-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with Jumbo');
    panel.innerHTML =
        '<header class="chat-head">' +
            '<img src="./images/jumbo.svg" alt="">' +
            '<div><strong>Jumbo</strong><span>Ask about Max&rsquo;s work</span></div>' +
            '<button type="button" class="chat-close" aria-label="Close chat">&times;</button>' +
        '</header>' +
        '<div class="chat-log" aria-live="polite"></div>' +
        '<div class="chat-suggestions"></div>' +
        '<form class="chat-form">' +
            '<input type="text" name="q" autocomplete="off" placeholder="Ask about Max or the site..." aria-label="Your question" maxlength="200">' +
            '<button type="submit">Send</button>' +
        '</form>';

    document.body.append(launcher, panel);

    const log = panel.querySelector('.chat-log');
    const suggestions = panel.querySelector('.chat-suggestions');
    const form = panel.querySelector('.chat-form');
    const input = form.querySelector('input');
    let greeted = false;

    function addMessage(who, content) {
        const row = document.createElement('div');
        row.className = 'chat-msg ' + who;
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        if (who === 'bot') {
            bubble.innerHTML = content;   // our own answers, from TOPICS above
        } else {
            bubble.textContent = content; // the visitor's words, never as HTML
        }
        row.append(bubble);
        log.append(row);
        log.scrollTop = log.scrollHeight;
        return row;
    }

    function botSays(html) {
        const typing = addMessage('bot', '<span class="chat-typing"><i></i><i></i><i></i></span>');
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 550;
        setTimeout(() => {
            typing.querySelector('.chat-bubble').innerHTML = html;
            log.scrollTop = log.scrollHeight;
        }, delay);
    }

    function ask(question) {
        question = question.trim();
        if (!question) return;
        addMessage('user', question);
        botSays(answer(question));
    }

    for (const text of SUGGESTIONS) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.textContent = text;
        chip.addEventListener('click', () => ask(text));
        suggestions.append(chip);
    }

    function openChat() {
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        document.documentElement.classList.add('chat-open');
        if (!greeted) {
            greeted = true;
            botSays('Hi, I&rsquo;m Jumbo. Ask me about Max, his projects or this website, or pick a question below.');
        }
        input.focus();
    }

    function closeChat() {
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('chat-open');
        launcher.focus();
    }

    launcher.addEventListener('click', () => (panel.hidden ? openChat() : closeChat()));
    panel.querySelector('.chat-close').addEventListener('click', closeChat);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !panel.hidden) closeChat();
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        ask(input.value);
        input.value = '';
    });

    // Lets the big elephant on the home page open the chat too
    window.openElephantChat = openChat;
})();
