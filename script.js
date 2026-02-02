(() => {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xovkpvzo';
    const LS = { THEME: 'site_theme', LANG: 'site_lang', VIEW: 'projects_view' };

    const I18N = {
        ru: {
            brand: 'Коренков Александр',
            navProjects: 'Проекты',
            navAbout: 'Обо мне',
            navContacts: 'Контакты',
            menuSummary: 'Меню ▾',
            projectsTitle: 'Проекты',
            projectsNote: 'Небольшие учебные проекты.',
            searchPlaceholder: 'Поиск (название, роль, описание)',
            sortNameAsc: 'Имя ↑',
            sortNameDesc: 'Имя ↓',
            sortDateDesc: 'По дате (свежие)',
            sortPopDesc: 'По популярности',
            filterTitle: 'Фильтры:',
            noResults: 'Ничего не найдено',
            suggestionsTitle: 'Рекомендованные проекты:',
            aboutTitle: 'Обо мне',
            aboutText: 'Я — ученик НИУ ВШЭ, учусь программированию. Пишу на Java, C++ и Python.',
            aboutLangs: 'Языки: Java, C++, Python (на уровне учебных задач)',
            aboutTools: 'Инструменты: Git, Gradle (понимаю основы)',
            aboutWant: 'Хочу: стажировка, помощь наставника',
            labelName: 'Ваше имя',
            phName: 'Имя',
            labelEmail: 'Почта',
            phEmail: 'you@example.com',
            labelMessage: 'Сообщение',
            phMessage: 'Коротко, например: хочу пройти стажировку',
            sendBtn: 'Отправить',
            uxLink: 'UX-анализ (PDF)',
            sendSuccess: 'Сообщение успешно отправлено.',
            sendError: 'Не удалось отправить сообщение. Попробуйте позже.',
            showAllBtn: 'Показать все',
            showLessBtn: 'Показать меньше',
            p_life_title: 'LifeLeveler',
            p_life_desc: 'Учебный ToDo-приложение для VK Mini Apps, реализовано на JavaScript.',
            p_inv_title: 'invarders',
            p_inv_desc: 'Учебный проект на Python (игровая логика/визуализация).',
            p_gitflow_title: 'gitflow',
            p_gitflow_desc: 'Скрипты и утилиты для демонстрации gitflow.',
            p_rc_title: 'random_circles',
            p_rc_desc: 'Учебный пример: генерация случайных кругов/визуализация.',
            p_yc_title: 'yellow_circles',
            p_yc_desc: 'Графический учебный проект — вариация на тему кругов.',
            p_pp_title: 'Pavlovskiy-Posad — Korenkov',
            p_pp_desc: 'Учебная работа на Python, связанная с задачей/данными по теме.'
        },
        en: {
            brand: 'Alexander Korenkov',
            navProjects: 'Projects',
            navAbout: 'About',
            navContacts: 'Contacts',
            menuSummary: 'Menu ▾',
            projectsTitle: 'Projects',
            projectsNote: 'Small learning projects.',
            searchPlaceholder: 'Search (title, role, description)',
            sortNameAsc: 'Name ↑',
            sortNameDesc: 'Name ↓',
            sortDateDesc: 'By date (new)',
            sortPopDesc: 'By popularity',
            filterTitle: 'Filters:',
            noResults: 'Nothing found',
            suggestionsTitle: 'Recommended projects:',
            aboutTitle: 'About me',
            aboutText: 'I am an HSE student, learning programming. I write Java, C++ and Python.',
            aboutLangs: 'Languages: Java, C++, Python (study-level)',
            aboutTools: 'Tools: Git, Gradle (basic)',
            aboutWant: 'Want: internship, mentor help',
            labelName: 'Your name',
            phName: 'Name',
            labelEmail: 'Email',
            phEmail: 'you@example.com',
            labelMessage: 'Message',
            phMessage: 'Short, e.g.: I want an internship',
            sendBtn: 'Send',
            uxLink: 'UX analysis (PDF)',
            sendSuccess: 'Message sent successfully.',
            sendError: 'Could not send message. Try later.',
            showAllBtn: 'Show all',
            showLessBtn: 'Show less',
            p_life_title: 'LifeLeveler',
            p_life_desc: 'Study ToDo app for VK Mini Apps, implemented in JavaScript.',
            p_inv_title: 'invarders',
            p_inv_desc: 'Study project in Python (game logic/visualization).',
            p_gitflow_title: 'gitflow',
            p_gitflow_desc: 'Scripts and utilities to demonstrate gitflow.',
            p_rc_title: 'random_circles',
            p_rc_desc: 'Study example: generating random circles/visualization.',
            p_yc_title: 'yellow_circles',
            p_yc_desc: 'Graphical study project — variation about circles.',
            p_pp_title: 'Pavlovskiy-Posad — Korenkov',
            p_pp_desc: 'Study work in Python related to a task/data.'
        }
    };

    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));
    const nowIso = () => new Date().toISOString();

    function debounce(fn, ms = 160) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    }

    function throttle(fn, ms = 40) {
        let busy = false;
        return (...args) => {
            if (busy) {
                return;
            }
            busy = true;
            setTimeout(() => { fn(...args); busy = false; }, ms);
        };
    }

    function applyI18n(lang) {
        if (!I18N[lang]) lang = 'ru';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key && I18N[lang][key] !== undefined) {
                el.textContent = I18N[lang][key];
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key && I18N[lang][key] !== undefined) {
                el.placeholder = I18N[lang][key];
            }
        });
        const summary = document.querySelector('.header__menu-summary');
        if (summary && I18N[lang].menuSummary) {
            summary.textContent = I18N[lang].menuSummary;
        }
        Object.keys(I18N[lang]).forEach(k => {
            const sel = '[data-i18n="' + k + '"]';
            document.querySelectorAll(sel).forEach(el => el.textContent = I18N[lang][k]);
        });
    }

    function initTheme() {
        const saved = localStorage.getItem(LS.THEME) || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        const t = $('#theme-toggle');
        if (!t) {
            return;
        }
        t.setAttribute('aria-pressed', saved === 'dark' ? 'true' : 'false');
        t.textContent = saved === 'dark' ? '☀' : '🌙';
        t.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute('data-theme') || 'light';
            const next = cur === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(LS.THEME, next);
            t.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
            t.textContent = next === 'dark' ? '☀' : '🌙';
        });
    }

    function initLang() {
        const saved = localStorage.getItem(LS.LANG) || 'ru';
        applyI18n(saved);
        const bRu = $('#lang-ru'), bEn = $('#lang-en');
        if (!bRu || !bEn) {
            return;
        }
        bRu.setAttribute('aria-pressed', saved === 'ru' ? 'true' : 'false');
        bEn.setAttribute('aria-pressed', saved === 'en' ? 'true' : 'false');
        bRu.addEventListener('click', () => {
            localStorage.setItem(LS.LANG, 'ru');
            applyI18n('ru');
            bRu.setAttribute('aria-pressed', 'true');
            bEn.setAttribute('aria-pressed', 'false');
        });
        bEn.addEventListener('click', () => {
            localStorage.setItem(LS.LANG, 'en');
            applyI18n('en');
            bRu.setAttribute('aria-pressed', 'false');
            bEn.setAttribute('aria-pressed', 'true');
        });
    }

    function initProjects() {
        const inputSearch = $('#projects-search');
        const projectEls = $$('#projects-list .project-card');
        const filters = $$('.projects-controls__filter-input');
        const sortSelect = $('#projects-sort');
        const viewBtns = $$('.projects-controls__view-btn');
        const projectsContainer = $('#projects-list');
        const emptyEl = $('#projects-empty');
        const toggleBtn = $('#projects-toggle');

        const INITIAL_VISIBLE = 2;
        const MAX_SUGGEST = 3;

        filters.forEach(cb => cb.checked = false);

        function applyInitialVisibility() {
            projectEls.forEach((el, idx) => {
                if (idx < INITIAL_VISIBLE) {
                    el.dataset.initialHidden = 'false';
                }
                else {
                    el.dataset.initialHidden = 'true';
                }
            });
            updateVisibilityForShowAll();
        }

        function updateVisibilityForShowAll(showAll) {
            projectEls.forEach((el) => {
                if (showAll) el.dataset.forceShow = 'true';
                else {
                    if (el.dataset.initialHidden === 'true') {
                        el.dataset.forceShow = 'false';
                    }
                    else {
                        el.dataset.forceShow = 'true';
                    }
                }
            });
        }

        let isShowingAll = false;

        function setToggleText() {
            const lang = localStorage.getItem(LS.LANG) || 'ru';
            if (!toggleBtn) {
                return;
            }
            if (isShowingAll) {
                toggleBtn.textContent = I18N[lang].showLessBtn || 'Show less';
                toggleBtn.setAttribute('aria-pressed', 'true');
            } else {
                toggleBtn.textContent = I18N[lang].showAllBtn || 'Show all';
                toggleBtn.setAttribute('aria-pressed', 'false');
            }
        }

        function applyAll() {
            const query = (inputSearch ? inputSearch.value.trim().toLowerCase() : '');
            const activeFilters = filters.filter(f => f.checked).map(f => String(f.value || '').toLowerCase());
            let shown = 0;

            projectEls.forEach(el => {
                const title = String(el.dataset.title || '').toLowerCase();
                const desc = String(el.dataset.desc || '').toLowerCase();
                const tags = String(el.dataset.tags || '').toLowerCase().split(',').map(t => t.trim()).filter(Boolean).join(',');
                const matchQuery = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
                const matchFilter = activeFilters.length === 0 || activeFilters.some(f => tags.includes(f));
                const forced = el.dataset.forceShow === 'true';
                if ((matchQuery && matchFilter) && (forced || !el.dataset.initialHidden || isShowingAll)) {
                    el.style.display = '';
                    shown++;
                } else {
                    el.style.display = 'none';
                }
            });

            if (shown === 0) {
                const hasControlActive = (inputSearch && inputSearch.value.trim() !== '') || filters.some(f => f.checked);
                if (hasControlActive) {
                    if (emptyEl) {
                        emptyEl.classList.remove('visually-hidden');
                        const lang = localStorage.getItem(LS.LANG) || 'ru';
                        emptyEl.textContent = I18N[lang].suggestionsTitle || I18N[lang].noResults;
                    }
                    const picks = projectEls.slice().sort((a,b) => Number(b.dataset.popularity || 0) - Number(a.dataset.popularity || 0)).slice(0, MAX_SUGGEST);
                    picks.forEach(p => { p.style.display = ''; p.setAttribute('data-suggested', 'true'); });
                    picks.reverse().forEach(p => projectsContainer.insertBefore(p, projectsContainer.firstChild));
                } else {
                    projectEls.forEach((el, idx) => {
                        if (idx < INITIAL_VISIBLE) {
                            el.style.display = '';
                        }
                        else {
                            el.style.display = 'none';
                        }
                    });
                    if (emptyEl) {
                        emptyEl.classList.add('visually-hidden');
                    }
                }
            } else {
                if (emptyEl) {
                    emptyEl.classList.add('visually-hidden');
                }
            }

            const sort = sortSelect ? sortSelect.value : 'name-asc';
            const visible = projectEls.filter(e => e.style.display !== 'none');
            if (sort.startsWith('name')) {
                visible.sort((a,b) => a.dataset.title.localeCompare(b.dataset.title));
                if (sort.endsWith('-desc')) visible.reverse();
            } else if (sort === 'date-desc') {
                visible.sort((a,b) => new Date(b.dataset.date) - new Date(a.dataset.date));
            } else if (sort === 'pop-desc') {
                visible.sort((a,b) => Number(b.dataset.popularity || 0) - Number(a.dataset.popularity || 0));
            }
            visible.forEach(n => projectsContainer.appendChild(n));
        }

        applyInitialVisibility();
        applyAll();
        setToggleText();

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                isShowingAll = !isShowingAll;
                if (isShowingAll) {
                    updateVisibilityForShowAll(true);
                }
                else {
                    updateVisibilityForShowAll(false);
                }
                setToggleText();
                applyAll();
            });
        }

        viewBtns.forEach(btn => btn.addEventListener('click', () => {
            const v = btn.getAttribute('data-view');
            viewBtns.forEach(b => b.setAttribute('aria-pressed', b.getAttribute('data-view') === v ? 'true' : 'false'));
            const projectsList = $('#projects-list');
            if (v === 'list') {
                projectsList.classList.add('projects__list--listview');
            }
            else {
                projectsList.classList.remove('projects__list--listview');
            }
            localStorage.setItem(LS.VIEW, v);
            applyAll();
        }));

        filters.forEach(f => f.addEventListener('change', () => { applyAll(); }));
        if (inputSearch) {
            inputSearch.addEventListener('input', debounce(() => applyAll(), 180));
        }
        if (sortSelect) {
            sortSelect.addEventListener('change', () => applyAll());
        }

        $$('.header__menu-link').forEach(a => a.addEventListener('click', () => {
            const d = document.querySelector('.header__menu');
            if (d && d.open) {
                d.open = false;
            }
        }));
    }

    function initForm() {
        const form = document.querySelector('.contact-form');
        if (!form) {
            return;
        }
        let statusRegion = document.getElementById('contact-status');
        if (!statusRegion) {
            statusRegion = document.createElement('div');
            statusRegion.id = 'contact-status';
            statusRegion.className = 'contact-status visually-hidden';
            statusRegion.setAttribute('aria-live', 'polite');
            form.prepend(statusRegion);
        }

        function showError(inputEl, text) {
            inputEl.classList.add('is-invalid');
            const msg = document.createElement('div');
            msg.className = 'contact-form__error';
            msg.textContent = text;
            msg.setAttribute('role', 'alert');
            inputEl.parentNode.appendChild(msg);
        }

        function clearErrors() {
            form.querySelectorAll('.contact-form__error').forEach(e => e.remove());
            form.querySelectorAll('.is-invalid').forEach(i => i.classList.remove('is-invalid'));
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearErrors();
            const name = form.elements['name'];
            const email = form.elements['email'];
            const message = form.elements['message'];
            let firstInvalid = null;

            if (!name.value.trim() || name.value.trim().length < 2) {
                showError(name, 'Введите имя (мин. 2 символа)'); firstInvalid = firstInvalid || name; }
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !re.test(email.value.trim())) {
                showError(email, 'Введите корректный email'); firstInvalid = firstInvalid || email; }
            if (!message.value.trim() || message.value.trim().length < 10) {
                showError(message, 'Сообщение должно быть не менее 10 символов'); firstInvalid = firstInvalid || message; }

            if (firstInvalid) { firstInvalid.focus(); return; }

            const payload = { name: name.value.trim(), email: email.value.trim(), message: message.value.trim(), ts: nowIso() };
            statusRegion.classList.remove('visually-hidden');
            statusRegion.textContent = '...';

            try {
                const res = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) {
                    const txt = await res.text().catch(() => res.statusText);
                    throw new Error('send-fail: ' + res.status + ' ' + txt);
                }
                const lang = localStorage.getItem(LS.LANG) || 'ru';
                statusRegion.textContent = I18N[lang].sendSuccess;
                form.reset();
            } catch (err) {
                const lang = localStorage.getItem(LS.LANG) || 'ru';
                statusRegion.textContent = I18N[lang].sendError;
            } finally {
                setTimeout(() => statusRegion.classList.add('visually-hidden'), 4500);
            }
        });
    }

    function initProgress() {
        const bar = document.createElement('div');
        bar.className = 'site-progress';
        document.body.appendChild(bar);
        function update() {
            const h = document.documentElement;
            const scrollTop = window.scrollY || h.scrollTop || 0;
            const total = (h.scrollHeight - h.clientHeight) || 1;
            const perc = Math.max(0, Math.min(1, scrollTop / total));
            bar.style.transform = `scaleX(${perc})`;
        }
        window.addEventListener('scroll', throttle(update, 20));
        window.addEventListener('resize', throttle(update, 120));
        update();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const y = document.getElementById('year');
        if (y) y.textContent = new Date().getFullYear();

        if (!localStorage.getItem(LS.THEME)) {
            localStorage.setItem(LS.THEME, 'light');
        }
        if (!localStorage.getItem(LS.LANG)) {
            localStorage.setItem(LS.LANG, 'ru');
        }

        applyI18n(localStorage.getItem(LS.LANG) || 'ru');

        initTheme();
        initLang();
        initProjects();
        initForm();
        initProgress();
    });
})();
