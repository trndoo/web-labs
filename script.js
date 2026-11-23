const VARIANT = 15;

const UK_REVIEWS = [
    { name: 'Софія Гриценко', email: 'sofiia.hrytsenko@example.com', body: 'Вікторія уважно вивчала вимоги до безпеки та чітко оформила висновки аудиту. Усі домовленості виконувала в строк і без нагадувань.' },
    { name: 'Богдан Левицький', email: 'bohdan.levytskyi@example.com', body: 'Цікавий співрозмовник і сумлінна студентка. Швидко розібралася з Git, а її коміти були зрозумілими й акуратними.' },
    { name: 'Наталя Гнатюк', email: 'natalia.hnatiuk@example.com', body: 'Під час практики вона самостійно налаштувала віртуальну мережу та детально описала кожен крок. Було видно, що їй справді цікава тема.' },
    { name: 'Роман Савчук', email: 'roman.savchuk@example.com', body: 'Спокійна, організована й комунікабельна. Не боялася просити допомоги, а отримавши пораду, одразу застосовувала її на практиці.' },
    { name: 'Юлія Попович', email: 'yuliia.popovych@example.com', body: 'Зробила для нас просту, але охайну сторінку-візитку. Рекомендую як розсудливу та відповідальну початківицю в ІТ.' }
];

/* 1. інформація про ОС і браузер -> localStorage -> футер */
function saveSystemInfo() {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        appVersion: navigator.appVersion,
        language: navigator.language,
        languages: (navigator.languages || []).join(', '),
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,          // може бути undefined (Firefox/Safari)
        screen: screen.width + 'x' + screen.height,
        viewport: window.innerWidth + 'x' + window.innerHeight,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    for (const [key, value] of Object.entries(info)) {
        if (value !== undefined) {
            localStorage.setItem(key, String(value)); // localStorage зберігає лише рядки
        }
    }
}

function renderStorage() {
    const list = document.getElementById('system-info');
    list.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = key;
        dd.textContent = localStorage.getItem(key);
        list.append(dt, dd);
    }
}

/* 2. коментарі із сервера */
async function loadReviews() {
    const status = document.getElementById('reviews-status');
    const container = document.getElementById('reviews-list');

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
        );
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        const comments = await response.json();

        status.hidden = true;
        // Відображаємо у порядку отримання
        comments.forEach((comment, index) => {
            // Дані (кількість і порядок) беремо із сервера, а видимий текст — українською
            const uk = UK_REVIEWS[index % UK_REVIEWS.length];
            const card = document.createElement('article');
            card.className = 'review';

            const name = document.createElement('h3');
            name.textContent = uk.name;

            const email = document.createElement('small');
            email.textContent = uk.email;

            const body = document.createElement('p');
            body.textContent = uk.body;

            card.append(name, email, body);
            container.append(card);
        });
    } catch (error) {
        status.textContent = 'Не вдалося завантажити відгуки: ' + error.message;
    }
}

/* 3. Модальне вікно через 1 хвилину + Formspree */
const modal = document.getElementById('feedback-modal');
const form = document.getElementById('feedback-form');
const formStatus = document.getElementById('form-status');

function openModal() {
    modal.hidden = false;
}

function closeModal() {
    modal.hidden = true;

    sessionStorage.setItem('feedbackClosed', 'true');
}

document.getElementById('modal-close').addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

// надсилання без перезавантаження сторінки (форма має action/method і без JS)
form.addEventListener('submit', async event => {
    event.preventDefault();
    formStatus.textContent = 'Надсилання…';

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = 'Дякуємо! Повідомлення надіслано.';
            form.reset();
            setTimeout(closeModal, 2000);
        } else {
            formStatus.textContent = 'Помилка надсилання. Спробуйте ще раз.';
        }
    } catch (error) {
        formStatus.textContent = 'Помилка мережі. Спробуйте ще раз.';
    }
});

if (!sessionStorage.getItem('feedbackClosed')) {
    setTimeout(openModal, 60000); // 1 хвилина
}

/* 4. нічна / денна тема */
const themeButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeButton.textContent = theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема';
}

// денна: 07:00-21:00, нічна: 21:00-06:00
function themeByTime() {
    const hours = new Date().getHours();
    return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

themeButton.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

saveSystemInfo();
renderStorage();
loadReviews();
applyTheme(themeByTime());
