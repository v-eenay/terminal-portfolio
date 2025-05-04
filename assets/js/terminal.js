const greetings = `[[;#7dcfff;]Welcome to my terminal portfolio!] Type '[[;#bb9af7;]help]' to see available commands.`;

// Portfolio data
let portfolioData = {};

// Helper function to generate project details
function generateProjectDetails(project, username) {
    let projectText = `\n`;

    // Display project name
    projectText += `[[;#7aa2f7;]${project.name}]\n\n`;

    // Display full description
    projectText += `${project.description}\n\n`;

    // Add features if available
    if (project.features && project.features.length > 0) {
        projectText += `[[;#9ece6a;]◆ Features:]\n`;
        project.features.forEach(feature => {
            projectText += `  [[;#bb9af7;]•] ${feature}\n`;
        });
        projectText += `\n`;
    }

    // Add repository link if available
    if (project.repo) {
        projectText += `[[;#9ece6a;]◆ Repository:]\n`;
        projectText += `  [[u;#7aa2f7;]https://github.com/${username}/${project.repo}]\n\n`;
    }

    // Add navigation options
    projectText += `[[;#e0af68;]Navigation:]\n`;
    projectText += `Type '[[;#bb9af7;]projects]' to return to the projects list.\n`;

    return projectText;
}

// Function to load portfolio data from JSON
async function loadPortfolioData() {
    try {
        const response = await fetch('assets/data/portfolio-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        portfolioData = await response.json();
        console.log('Portfolio data loaded successfully');
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Function to display SVG headers
function displayHeader(term, command) {
    // Only display header if term is provided
    if (term) {
        // Check if light mode is active
        const isLightMode = document.documentElement.classList.contains('light-mode');

        // Set the appropriate path based on theme
        const theme = isLightMode ? 'light' : 'dark';
        const headerPath = `assets/images/headers/${theme}/${command}.svg`;

        const headerHTML = `<img src="${headerPath}" alt="${command} header" style="width: 100%; max-width: 500px; margin: 10px 0;">`;
        term.echo(headerHTML, {raw: true});
    }
}

// Define commands
const commands = {
    help: function(_, term) {
        displayHeader(term, 'help');

        let helpText = `\n`;

        // Generate help text from JSON data
        if (portfolioData.commands && portfolioData.commands.length > 0) {
            portfolioData.commands.forEach(cmd => {
                helpText += `[[;#bb9af7;]❯] [[;#7aa2f7;]${cmd.name}]: ${cmd.description}\n`;
            });

            // Check if we're on a mobile device and add stats command
            if (window.innerWidth <= 768) {
                helpText += `[[;#bb9af7;]❯] [[;#7aa2f7;]stats]: View GitHub statistics and activity\n`;
            }
        } else {
            helpText = `[[;#f7768e;]Error loading commands. Please refresh the page.]`;
        }

        return helpText;
    },
    about: function(_, term) {
        displayHeader(term, 'about');

        if (portfolioData.about) {
            const about = portfolioData.about;
            let aboutText = `\n${about.description}\n\n`;

            // Add quote if available
            if (about.quote) {
                aboutText += `[[i;#e0af68;]"${about.quote}"]\n\n`;
            }

            // Add highlights if available
            if (about.highlights && about.highlights.length > 0) {
                about.highlights.forEach(highlight => {
                    aboutText += `[[;#bb9af7;]❯] ${highlight}\n`;
                });
            }

            return aboutText;
        } else {
            return `\n[[;#f7768e;]Error loading about data. Please refresh the page.]`;
        }
    },
    skills: function(_, term) {
        displayHeader(term, 'skills');

        if (portfolioData.skills) {
            const skills = portfolioData.skills;
            let skillsText = `\n`;

            // Add languages if available
            if (skills.languages && skills.languages.length > 0) {
                skillsText += `[[;#9ece6a;]◆ Languages:]\n  ${skills.languages.join(', ')}\n\n`;
            }

            // Add web development skills
            skillsText += `[[;#9ece6a;]◆ Web Development:]\n`;
            if (skills.frontend && skills.frontend.length > 0) {
                skillsText += `  [[;#7aa2f7;]Frontend:] ${skills.frontend.join(', ')}\n`;
            }
            if (skills.frontendFrameworks && skills.frontendFrameworks.length > 0) {
                skillsText += `  [[;#7aa2f7;]Frontend Frameworks:] ${skills.frontendFrameworks.join(', ')}\n`;
            }
            if (skills.backend && skills.backend.length > 0) {
                skillsText += `  [[;#7aa2f7;]Backend:] ${skills.backend.join(', ')}\n\n`;
            }

            // Add mobile development skills
            if (skills.mobile && skills.mobile.length > 0) {
                skillsText += `[[;#9ece6a;]◆ Mobile Development:]\n  ${skills.mobile.join(', ')}\n\n`;
            }

            // Add database skills
            if (skills.databases && skills.databases.length > 0) {
                skillsText += `[[;#9ece6a;]◆ Databases & Data:]\n  ${skills.databases.join(', ')}\n\n`;
            }

            skillsText += `Type '[[;#bb9af7;]tech]' for my complete tech stack.`;

            return skillsText;
        } else {
            return `\n[[;#f7768e;]Error loading skills data. Please refresh the page.]`;
        }
    },
    tech: function(_, term) {
        displayHeader(term, 'tech');

        if (portfolioData.skills) {
            const skills = portfolioData.skills;
            let techText = `\n`;

            // Add languages if available
            if (skills.languages && skills.languages.length > 0) {
                techText += `[[;#9ece6a;]◆ Languages]\n  ${skills.languages.join(', ')}\n\n`;
            }

            // Add web development section
            techText += `[[;#9ece6a;]◆ Web Development]\n`;

            // Add frontend skills
            if (skills.frontend && skills.frontend.length > 0) {
                techText += `  [[;#7aa2f7;]Frontend:]\n  ${skills.frontend.join(', ')}\n\n`;
            }

            // Add frontend frameworks
            if (skills.frontendFrameworks && skills.frontendFrameworks.length > 0) {
                techText += `  [[;#7aa2f7;]Frontend Frameworks:]\n  ${skills.frontendFrameworks.join(', ')}\n\n`;
            }

            // Add backend skills
            if (skills.backend && skills.backend.length > 0) {
                techText += `  [[;#7aa2f7;]Backend:]\n  ${skills.backend.join(', ')}\n\n`;
            }

            // Add mobile development skills
            if (skills.mobile && skills.mobile.length > 0) {
                techText += `[[;#9ece6a;]◆ Mobile Development]\n  ${skills.mobile.join(', ')}\n\n`;
            }

            // Add database skills
            if (skills.databases && skills.databases.length > 0) {
                techText += `[[;#9ece6a;]◆ Databases & Data]\n  ${skills.databases.join(', ')}\n\n`;
            }

            // Add DevOps
            if (skills.devops && skills.devops.length > 0) {
                techText += `[[;#9ece6a;]◆ DevOps & Cloud]\n  ${skills.devops.join(', ')}\n\n`;
            }

            // Add tools
            if (skills.tools && skills.tools.length > 0) {
                techText += `[[;#9ece6a;]◆ Development Tools]\n  ${skills.tools.join(', ')}\n\n`;
            }

            // Add design skills
            if (skills.design && skills.design.length > 0) {
                techText += `[[;#9ece6a;]◆ Design Tools]\n  ${skills.design.join(', ')}\n\n`;
            }

            // Add exploring skills
            if (skills.exploring && skills.exploring.length > 0) {
                techText += `[[;#9ece6a;]◆ Currently Exploring]\n  ${skills.exploring.join(', ')}`;
            }

            return techText;
        } else {
            return `\n[[;#f7768e;]Error loading tech stack data. Please refresh the page.]`;
        }
    },
    projects: function(_, term) {
        displayHeader(term, 'projects');

        let allProjects = [];

        // Add portfolio projects
        if (portfolioData.projects && portfolioData.projects.length > 0) {
            allProjects = [...portfolioData.projects];
        }

        if (allProjects.length > 0) {
            let projectsText = `\n[[;#9ece6a;]◆ Featured Projects]\n\n`;

            // List all projects
            allProjects.forEach(project => {
                const projectName = project.name || project.title;
                const projectDesc = project.description;
                projectsText += `[[;#e0af68;]${project.id}.] [[;#7aa2f7;]${projectName}]\n`;

                // Display full description with proper wrapping
                // Split description into words and rebuild with proper wrapping
                const words = projectDesc.split(' ');
                let currentLine = '   ';
                const maxLineLength = 80; // Maximum characters per line

                words.forEach(word => {
                    // If adding this word would exceed the line length, start a new line
                    if (currentLine.length + word.length + 1 > maxLineLength) {
                        projectsText += `${currentLine}\n`;
                        currentLine = '   ' + word + ' '; // Start new line with indentation
                    } else {
                        currentLine += word + ' ';
                    }
                });

                // Add the last line if it's not empty
                if (currentLine.trim().length > 0) {
                    projectsText += `${currentLine}\n`;
                }

                // Add technologies if available
                if (project.technologies && project.technologies.length > 0) {
                    projectsText += `   [[;#bb9af7;]Technologies:] ${project.technologies.join(', ')}\n`;
                }
                projectsText += `\n`;
            });

            // Add instructions for viewing project details
            projectsText += `[[;#e0af68;]Available Project Commands:]\n`;
            for (let i = 1; i <= allProjects.length; i++) {
                projectsText += `Type '[[;#bb9af7;]project ${i}]' for details on ${allProjects[i-1].name}\n`;
            }

            return projectsText;
        } else {
            return `\n[[;#f7768e;]Error loading projects data. Please refresh the page.]`;
        }
    },
    theater: function(_, term) {
        displayHeader(term, 'theater');

        if (portfolioData.theater) {
            const theater = portfolioData.theater;
            let theaterText = `\n${theater.description}\n\n`;

            // Add quote if available
            if (theater.quote) {
                theaterText += `[[i;#e0af68;]"${theater.quote}"] [[;#bb9af7;]- ${theater.quoteAuthor || ''}]\n\n`;
            }

            // Add additional info if available
            if (theater.additionalInfo) {
                theaterText += `${theater.additionalInfo}`;
            }

            return theaterText;
        } else {
            return `\n[[;#f7768e;]Error loading theater data. Please refresh the page.]`;
        }
    },
    stats: function(_, term) {
        displayHeader(term, 'stats');

        // Create a full-screen overlay to display GitHub stats
        const $overlay = $('<div>').addClass('stats-overlay').appendTo('body');
        const $closeBtn = $('<button>').addClass('close-btn').html('&times;').appendTo($overlay);
        $('<iframe>').attr({
            src: 'assets/templates/github-stats-embed.html',
            frameborder: '0',
            title: 'GitHub Stats'
        }).appendTo($overlay);

        // Add event listener to close button
        $closeBtn.on('click', function() {
            $overlay.removeClass('visible');

            // Remove overlay after animation completes
            setTimeout(function() {
                $overlay.remove();
                $(document).off('keydown.stats');
            }, 500); // Match the transition duration
        });

        // Add escape key listener
        $(document).on('keydown.stats', function(e) {
            if (e.key === 'Escape') {
                $overlay.removeClass('visible');

                // Remove overlay after animation completes
                setTimeout(function() {
                    $overlay.remove();
                    $(document).off('keydown.stats');
                }, 500); // Match the transition duration
            }
        });

        // Show the overlay with animations
        // Small delay to ensure the overlay is in the DOM
        setTimeout(function() {
            $overlay.addClass('visible');
        }, 10);

        // Get GitHub username from portfolio data
        const username = portfolioData.github ? portfolioData.github.username : 'v-eenay';

        // Check if we're on a mobile device
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            return `

[[;#9ece6a;]Opening GitHub stats in fullscreen view...]]

GitHub Profile: [[u;#7aa2f7;]https://github.com/${username}]

[[;#bb9af7;]•] Press ESC or click the X button to close the stats view
[[;#bb9af7;]•] The dashboard shows your GitHub activity and statistics
[[;#bb9af7;]•] Stats include: contributions, streak, languages, and more
`;
        } else {
            return `

[[;#9ece6a;]Displaying GitHub stats in a visual dashboard...]]

GitHub Profile: [[u;#7aa2f7;]https://github.com/${username}]

[[;#bb9af7;]•] Press ESC or click the X button to close the stats view
[[;#bb9af7;]•] The dashboard shows real-time GitHub statistics
[[;#bb9af7;]•] Stats include: contributions, streak, languages, and more

[[i;#e0af68;]"Code is like humor. When you have to explain it, it's bad."] [[;#bb9af7;]- Cory House]
`;
        }
    },
    contact: function(_, term) {
        displayHeader(term, 'contact');

        if (portfolioData.contact) {
            const contact = portfolioData.contact;
            let contactText = `\n`;

            // Add contact information
            if (contact.email) {
                contactText += `[[;#bb9af7;]•] Email: [[;#7aa2f7;]${contact.email}]\n`;
            }
            if (contact.github) {
                contactText += `[[;#bb9af7;]•] GitHub: [[u;#7aa2f7;]${contact.github}]\n`;
            }
            if (contact.linkedin) {
                contactText += `[[;#bb9af7;]•] LinkedIn: [[u;#7aa2f7;]${contact.linkedin}]\n`;
            }

            // Add quote if available
            if (contact.quote) {
                contactText += `\n[[i;#e0af68;]"${contact.quote}"]\n`;
            }

            return contactText;
        } else {
            return `\n[[;#f7768e;]Error loading contact data. Please refresh the page.]`;
        }
    },
    cv: function(_, term) {
        displayHeader(term, 'cv');

        // Create a full-screen overlay to display CV
        const $overlay = $('<div>').addClass('stats-overlay').appendTo('body');
        const $closeBtn = $('<button>').addClass('close-btn').html('&times;').appendTo($overlay);
        $('<iframe>').attr({
            src: 'assets/templates/cv-embed.html',
            frameborder: '0',
            title: 'Curriculum Vitae'
        }).appendTo($overlay);

        // Add event listener to close button
        $closeBtn.on('click', function() {
            $overlay.removeClass('visible');

            // Remove overlay after animation completes
            setTimeout(function() {
                $overlay.remove();
                $(document).off('keydown.cv');
            }, 500); // Match the transition duration
        });

        // Add escape key listener
        $(document).on('keydown.cv', function(e) {
            if (e.key === 'Escape') {
                $overlay.removeClass('visible');

                // Remove overlay after animation completes
                setTimeout(function() {
                    $overlay.remove();
                    $(document).off('keydown.cv');
                }, 500); // Match the transition duration
            }
        });

        // Show the overlay with animations
        // Small delay to ensure the overlay is in the DOM
        setTimeout(function() {
            $overlay.addClass('visible');
        }, 10);

        // Check if we're on a mobile device
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            return `

[[;#9ece6a;]Opening CV in fullscreen view...]]

[[;#bb9af7;]•] Press ESC or click the X button to close the CV view
[[;#bb9af7;]•] The CV shows my professional experience, education, and skills
[[;#bb9af7;]•] For more details on specific sections, use the related commands:
   - Type '[[;#bb9af7;]teaching]' for teaching experience
   - Type '[[;#bb9af7;]achievements]' for awards and achievements
   - Type '[[;#bb9af7;]projects]' for project details
`;
        } else {
            return `

[[;#9ece6a;]Displaying CV in a visual format...]]

[[;#bb9af7;]•] Press ESC or click the X button to close the CV view
[[;#bb9af7;]•] The CV provides a comprehensive overview of my professional background
[[;#bb9af7;]•] For more details on specific sections, use the related commands:
   - Type '[[;#bb9af7;]teaching]' for teaching experience
   - Type '[[;#bb9af7;]achievements]' for awards and achievements
   - Type '[[;#bb9af7;]projects]' for project details

[[i;#e0af68;]"Education is not the filling of a pail, but the lighting of a fire."] [[;#bb9af7;]- W.B. Yeats]
`;
        }
    },
    teaching: function(_, term) {
        displayHeader(term, 'teaching');

        if (portfolioData.cv && portfolioData.cv.teaching) {
            const teaching = portfolioData.cv.teaching;
            let teachingText = `\n`;

            // Add teaching philosophy
            teachingText += `[[;#9ece6a;]◆ Teaching Philosophy]\n`;
            teachingText += `  I believe in creating an engaging, interactive learning environment that combines theoretical concepts with practical applications. My teaching approach focuses on fostering critical thinking, problem-solving skills, and technological creativity while adapting to diverse learning styles.\n\n`;

            // Add teaching experience
            if (teaching.length > 0) {
                teachingText += `[[;#9ece6a;]◆ Courses Taught]\n\n`;
                teaching.forEach(course => {
                    teachingText += `  [[;#7aa2f7;]${course.course}]\n`;
                    teachingText += `  [[;#bb9af7;]${course.institution}]\n`;
                    teachingText += `  ${course.description}\n\n`;
                });
            }

            // Add teaching methodologies
            teachingText += `[[;#9ece6a;]◆ Teaching Methodologies]\n`;
            teachingText += `  [[;#7aa2f7;]• Project-Based Learning:] Implementing real-world projects to enhance practical understanding\n`;
            teachingText += `  [[;#7aa2f7;]• Flipped Classroom:] Providing materials for pre-class study and focusing on interactive activities during class\n`;
            teachingText += `  [[;#7aa2f7;]• Peer Learning:] Encouraging collaborative problem-solving and knowledge sharing\n`;
            teachingText += `  [[;#7aa2f7;]• Technology Integration:] Utilizing digital tools and platforms to enhance learning experiences\n\n`;

            // Add professional development
            if (portfolioData.cv.professional_development && portfolioData.cv.professional_development.length > 0) {
                teachingText += `[[;#9ece6a;]◆ Professional Development]\n\n`;
                portfolioData.cv.professional_development.forEach(dev => {
                    teachingText += `  [[;#7aa2f7;]${dev.title}] (${dev.year})\n`;
                    teachingText += `  ${dev.provider}\n`;
                    teachingText += `  ${dev.description}\n\n`;
                });
            }

            // Add navigation
            teachingText += `[[;#e0af68;]Related Information:]\n`;
            teachingText += `Type '[[;#bb9af7;]cv]' to return to my curriculum vitae.\n`;
            teachingText += `Type '[[;#bb9af7;]achievements]' to view my awards and achievements.\n`;

            return teachingText;
        } else {
            return `\n[[;#f7768e;]Error loading teaching data. Please refresh the page.]`;
        }
    },
    achievements: function(_, term) {
        displayHeader(term, 'achievements');

        if (portfolioData.cv && portfolioData.cv.achievements) {
            const achievements = portfolioData.cv.achievements;
            let achievementsText = `\n`;

            // Add introduction
            achievementsText += `Throughout my academic and professional journey, I've been recognized for my contributions to education, technology, and community service.\n\n`;

            // Add achievements
            if (achievements.length > 0) {
                achievementsText += `[[;#9ece6a;]◆ Awards & Achievements]\n\n`;
                achievements.forEach(achievement => {
                    achievementsText += `  [[;#7aa2f7;]${achievement.title}] (${achievement.year})\n`;
                    achievementsText += `  [[;#bb9af7;]${achievement.issuer}]\n`;
                    achievementsText += `  ${achievement.description}\n\n`;
                });
            }

            // Add skills recognition
            achievementsText += `[[;#9ece6a;]◆ Skills Recognition]\n`;
            achievementsText += `  [[;#7aa2f7;]• Technical Excellence:] Recognized for implementing innovative technical solutions in educational contexts\n`;
            achievementsText += `  [[;#7aa2f7;]• Teaching Innovation:] Acknowledged for developing creative teaching methodologies that enhance student engagement\n`;
            achievementsText += `  [[;#7aa2f7;]• Community Impact:] Honored for contributions to technology education in the local community\n\n`;

            // Add navigation
            achievementsText += `[[;#e0af68;]Related Information:]\n`;
            achievementsText += `Type '[[;#bb9af7;]cv]' to return to my curriculum vitae.\n`;
            achievementsText += `Type '[[;#bb9af7;]teaching]' to view my teaching experience.\n`;
            achievementsText += `Type '[[;#bb9af7;]projects]' to view my projects.\n`;

            return achievementsText;
        } else {
            return `\n[[;#f7768e;]Error loading achievements data. Please refresh the page.]`;
        }
    },


    'project 1': function(_, term) {
        displayHeader(term, 'project1');

        if (portfolioData.projects && portfolioData.projects.length > 0) {
            const project = portfolioData.projects[0]; // Terminal Portfolio
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 2': function(_, term) {
        displayHeader(term, 'project2');

        if (portfolioData.projects && portfolioData.projects.length > 1) {
            const project = portfolioData.projects[1]; // AMERT
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 3': function(_, term) {
        displayHeader(term, 'project3');

        if (portfolioData.projects && portfolioData.projects.length > 2) {
            const project = portfolioData.projects[2]; // SkillForge E-Learning Platform
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 4': function(_, term) {
        displayHeader(term, 'project4');

        if (portfolioData.projects && portfolioData.projects.length > 3) {
            const project = portfolioData.projects[3]; // Java Servlet REST API
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 5': function(_, term) {
        displayHeader(term, 'project5');

        if (portfolioData.projects && portfolioData.projects.length > 4) {
            const project = portfolioData.projects[4]; // Student Folder Management System
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 6': function(_, term) {
        displayHeader(term, 'project6');

        if (portfolioData.projects && portfolioData.projects.length > 5) {
            const project = portfolioData.projects[5]; // Online Digital Library
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    },
    'project 7': function(_, term) {
        displayHeader(term, 'project7');

        if (portfolioData.projects && portfolioData.projects.length > 6) {
            const project = portfolioData.projects[6]; // Personalized Marketing Research
            return generateProjectDetails(project, portfolioData.github.username);
        } else {
            return `\n[[;#f7768e;]Error loading project data. Please refresh the page.]`;
        }
    }
};

// Theme management
function initThemeToggle() {
    // Check for saved theme preference or use default (dark)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');

        // Wait for iframes to load before notifying them
        setTimeout(() => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    iframe.contentWindow.postMessage('theme-changed', '*');
                } catch (e) {
                    console.error('Error notifying iframe about theme change:', e);
                }
            });
        }, 1000);
    }

    // Theme toggle functionality
    $('#theme-toggle-btn').on('click', function() {
        document.documentElement.classList.toggle('light-mode');

        // Save preference to localStorage
        const currentTheme = document.documentElement.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);

        // Notify iframes about theme change
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                iframe.contentWindow.postMessage('theme-changed', '*');
            } catch (e) {
                console.error('Error notifying iframe about theme change:', e);
            }
        });
    });
}

// Initialize terminal
$(async function() {
    // Initialize theme toggle
    initThemeToggle();

    // Load portfolio data before initializing the terminal
    await loadPortfolioData();

    // Terminal instance reference
    let terminal;

    // Handle responsive layout
    function handleResponsiveLayout() {
        // Hide stats hint on desktop, show on mobile
        if (window.innerWidth <= 768) {
            $('.stats-hint').show();
        } else {
            $('.stats-hint').hide();
        }

        // If terminal is initialized, refresh help command to update stats visibility
        if (terminal) {
            // We don't want to execute the command, just update the completion list
            terminal.refresh_completion();
        }
    }

    // Initial call
    handleResponsiveLayout();

    // Listen for window resize
    $(window).on('resize', handleResponsiveLayout);

    terminal = $('#terminal-container').terminal(function(command, term) {
        // Trim the command
        const trimmedCommand = command.trim();

        // First check if the full command exists (for commands with spaces like "project 1")
        if (trimmedCommand in commands) {
            return commands[trimmedCommand].call(this, [], term);
        }

        // If not, split by spaces and check the first part
        const parts = trimmedCommand.split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Check if the command exists
        if (cmd in commands) {
            return commands[cmd].call(this, args, term);
        } else {
            // Check if it's a project command
            if (cmd === 'project' && args.length > 0) {
                const projectCmd = `project ${args[0]}`;
                if (projectCmd in commands) {
                    return commands[projectCmd].call(this, args.slice(1), term);
                }
            }

            return `[[;#f7768e;]Command not found: ${trimmedCommand}]
Type '[[;#bb9af7;]help]' to see available commands.`;
        }
    }, {
        greetings: greetings,
        height: '100%',
        prompt: '[[;#bb9af7;]vinay@portfolio]:[[;#7aa2f7;]~]$ ',
        completion: function() {
            // Get base commands
            const baseCommands = Object.keys(commands);

            // Create the final list of commands
            let allCommands = [...baseCommands];

            // Add stats command if on mobile
            if (window.innerWidth <= 768) {
                allCommands.push('stats');
            }

            // Add project commands based on available projects
            if (portfolioData.projects) {
                const projectCount = portfolioData.projects.length;
                for (let i = 1; i <= projectCount; i++) {
                    allCommands.push(`project ${i}`);
                }
            }

            return allCommands;
        },
        exit: false,
        clear: function() {
            // Just clear the terminal without re-displaying the greeting
            this.clear();

            // Re-show the stats hint if on mobile
            if (window.innerWidth <= 768) {
                $('.stats-hint').show();
            }
        },
        onInit: function() {
            // Add a typing effect to the initial message
            this.echo('\nType [[;#7dcfff;]help] to see available commands.');
        },
        linksNoReferrer: false,
        convertLinks: true,
        allowedAttributes: ['href', 'target', 'title', 'style', 'class'],
        historySize: 50,
        scrollOnEcho: true
    });
});