document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // THEME SWITCHER
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        if (navLinksContainer.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            mobileNavToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // ==========================================
    // TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "scalable systems.",
        "intelligent automation.",
        "optimized backend APIs.",
        "engaging web experiences."
    ];
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100; // normal typing
        }

        if (!isDeleting && characterIndex === currentPhrase.length) {
            // Pause at completion
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // brief pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typewriterElement) {
        type();
    }

    // ==========================================
    // ACTIVE NAV LINKS ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // GITHUB PUBLIC REPOSITORIES INTEGRATION
    // ==========================================
    const reposContainer = document.getElementById('repos-container');
    const searchInput = document.getElementById('repo-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Core projects list provided by the user
    let repositories = [
        {
            name: "Quizzerr",
            description: "A MERN Stack Project with AI Integration for creating and attempting Quizzes",
            url: "https://github.com/404chandan/Quizzerr",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "MindDB-AI",
            description: "An AI-powered database helper and interaction tool.",
            url: "https://github.com/404chandan/MindDB-AI",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Quizzer.ai",
            description: "AI Based difficulty wise quiz generator.",
            url: "https://github.com/404chandan/Quizzer.ai",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "ResumeAI",
            description: "An AI-powered application for parsing, building, or optimizing resumes.",
            url: "https://github.com/404chandan/ResumeAI",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "queuectl-fullstack",
            description: "Full-stack client queue management and simulation controller.",
            url: "https://github.com/404chandan/queuectl-fullstack",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Medical-AI-Simplification-Backend",
            description: "Backend API for simplifying medical terminology using Generative AI models.",
            url: "https://github.com/404chandan/Medical-AI-Simplification-Backend",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Medical-AI-simplification",
            description: "Frontend interface for simplifies complex medical prescription notes and diagnoses.",
            url: "https://github.com/404chandan/Medical-AI-simplification",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "img_to_text-main",
            description: "Python OCR utility to extract text from images and translate or process content.",
            url: "https://github.com/404chandan/img_to_text-main",
            stars: 0,
            forks: 0,
            language: "python",
            languageName: "Python"
        },
        {
            name: "HireTales",
            description: "Interview Experience Generator using Gemini AI to help candidates prepare for specific roles.",
            url: "https://github.com/404chandan/HireTales",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "MockAI",
            description: "A Project for AI Based Mock Interviews with real-time feedback and metrics.",
            url: "https://github.com/404chandan/MockAI",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Mobile-App-Success-Predictor",
            description: "A machine learning predictor modeling mobile application success dynamics.",
            url: "https://github.com/404chandan/Mobile-App-Success-Predictor",
            stars: 0,
            forks: 0,
            language: "jupyter notebook",
            languageName: "Jupyter Notebook"
        },
        {
            name: "StockSage",
            description: "Machine learning model and data analysis scripts for stock trend forecasting.",
            url: "https://github.com/404chandan/StockSage",
            stars: 0,
            forks: 0,
            language: "jupyter notebook",
            languageName: "Jupyter Notebook"
        },
        {
            name: "TPMS",
            description: "College Placement management system using MERN with additional AI Features.",
            url: "https://github.com/404chandan/TPMS",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "PlanGo",
            description: "An AI-Based Trip Planner Website with personalized hotel and flight booking recommendations and AI generated trip schedule.",
            url: "https://github.com/404chandan/PlanGo",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "MediIntel",
            description: "AI Based MERN app for medical assistance and health parameter tracking.",
            url: "https://github.com/404chandan/MediIntel",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Edemy",
            description: "A Learning Management System with modern Practices, streaming video, and interactive lessons.",
            url: "https://github.com/404chandan/Edemy",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "SnapClear",
            description: "An AI based Full stack background remover website utilizing computer vision libraries.",
            url: "https://github.com/404chandan/SnapClear",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "AskMentor",
            description: "Software Development assistance tools for developer productivity.",
            url: "https://github.com/404chandan/AskMentor",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "VisualForce",
            description: "A website for Codeforces profile analysis, metrics visualization, and progression graphs.",
            url: "https://github.com/404chandan/VisualForce",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "HyreAI",
            description: "An AI based website for mock interviews simulating engineering rounds.",
            url: "https://github.com/404chandan/HyreAI",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "Feelwell-AI-ChatBot",
            description: "This is a Chatbot working on the Gemini API to provide wellness and conversational assistance.",
            url: "https://github.com/404chandan/Feelwell-AI-ChatBot",
            stars: 0,
            forks: 0,
            language: "css",
            languageName: "CSS"
        },
        {
            name: "weather-app",
            description: "A responsive weather forecasting application consuming external climate APIs.",
            url: "https://github.com/404chandan/weather-app",
            stars: 0,
            forks: 0,
            language: "javascript",
            languageName: "JavaScript"
        },
        {
            name: "World-Cup-Win-Prediction",
            description: "Jupyter Notebook forecasting match outcomes based on historical international data features.",
            url: "https://github.com/404chandan/World-Cup-Win-Prediction",
            stars: 0,
            forks: 0,
            language: "jupyter notebook",
            languageName: "Jupyter Notebook"
        }
    ];

    let activeLanguageFilter = 'all';
    let searchQuery = '';

    const languageColors = {
        'go': '#00ADD8',
        'python': '#3572A5',
        'javascript': '#f1e05a',
        'typescript': '#3178c6',
        'c++': '#f34b7d',
        'c': '#555555',
        'html': '#e34c26',
        'css': '#563d7c',
        'shell': '#89e051',
        'jupyter notebook': '#da5b0b'
    };

    async function fetchGitHubRepos() {
        try {
            // Fetch live data from GitHub to enrich stars, forks, and language fields
            const response = await fetch('https://api.github.com/users/404chandan/repos?sort=updated&per_page=100');
            if (response.ok) {
                const liveData = await response.json();
                
                // Merge stars, forks, and language fields into our curated projects list
                repositories = repositories.map(project => {
                    const liveRepo = liveData.find(lr => lr.name.toLowerCase() === project.name.toLowerCase());
                    if (liveRepo) {
                        return {
                            ...project,
                            stars: liveRepo.stargazers_count,
                            forks: liveRepo.forks_count,
                            description: liveRepo.description || project.description,
                            language: liveRepo.language ? liveRepo.language.toLowerCase() : project.language,
                            languageName: liveRepo.language || project.languageName
                        };
                    }
                    return project;
                });
            }
            renderRepositories();
        } catch (error) {
            console.error('Error enriching from GitHub API, using fallback data:', error);
            renderRepositories(); // Render fallback data anyway
        }
    }


    function renderRepositories() {
        if (!reposContainer) return;
        reposContainer.innerHTML = '';

        // Filter based on search query & active language filter tag
        const filteredRepos = repositories.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchQuery) || 
                                  repo.description.toLowerCase().includes(searchQuery);
            
            const matchesLanguage = activeLanguageFilter === 'all' || 
                                    (repo.language && repo.language === activeLanguageFilter);

            return matchesSearch && matchesLanguage;
        });

        if (filteredRepos.length === 0) {
            reposContainer.innerHTML = `
                <div class="no-repos-found" style="grid-column: 1 / -1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                    <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--accent-1);"></i>
                    <p>No projects match your current filters.</p>
                </div>
            `;
            return;
        }

        filteredRepos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card scroll-reveal revealed';
            
            const dotColor = languageColors[repo.language] || '#94a3b8';
            const langLabel = repo.languageName || 'Markdown';

            card.innerHTML = `
                <div class="repo-icon-wrapper">
                    <i class="fa-regular fa-folder repo-folder-icon"></i>
                    <a href="${repo.url}" target="_blank" class="repo-github-icon" aria-label="GitHub Repo Link">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
                <h4><a href="${repo.url}" target="_blank">${repo.name}</a></h4>
                <p>${repo.description}</p>
                <div class="repo-footer">
                    <div class="repo-lang">
                        <span class="lang-dot" style="background-color: ${dotColor};"></span>
                        <span>${langLabel}</span>
                    </div>
                    <div class="repo-stats-info">
                        <span class="repo-stat-item"><i class="fa-regular fa-star"></i> ${repo.stars}</span>
                        <span class="repo-stat-item"><i class="fa-solid fa-code-fork"></i> ${repo.forks}</span>
                    </div>
                </div>
            `;
            reposContainer.appendChild(card);
        });
    }

    function renderErrorState() {
        if (!reposContainer) return;
        reposContainer.innerHTML = `
            <div class="no-repos-found" style="grid-column: 1 / -1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                <i class="fa-solid fa-circle-exclamation" style="font-size: 3rem; margin-bottom: 1rem; color: #ef4444;"></i>
                <p>Unable to load GitHub repositories. Check back later or visit my profile directly at <a href="https://github.com/404chandan" target="_blank" style="text-decoration: underline; color: var(--accent-2);">github.com/404chandan</a>.</p>
            </div>
        `;
    }

    // Input Search Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderRepositories();
        });
    }

    // Language Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeLanguageFilter = btn.getAttribute('data-lang');
            renderRepositories();
        });
    });

    // Initialize Fetch
    fetchGitHubRepos();

    // ==========================================
    // CONTACT FORM VALIDATION & HANDLING
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation feedback (Visual demonstration)
            formStatus.className = 'form-status';
            formStatus.textContent = 'Sending message...';

            setTimeout(() => {
                formStatus.classList.add('success');
                formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                contactForm.reset();
            }, 1000);
        });
    }
});
