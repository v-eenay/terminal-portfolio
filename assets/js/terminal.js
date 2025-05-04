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

// Load portfolio data from JSON
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

// Display header SVG
function displayHeader(term, headerName) {
    // Check if we're in light mode
    const isLightMode = document.documentElement.classList.contains('light-mode');
    
    // Determine the path based on the theme
    const basePath = isLightMode ? 'assets/images/light-mode/headers/' : 'assets/images/headers/';
    const headerPath = `${basePath}${headerName}.svg`;
    
    // Display the header
    term.echo(`<img src="${headerPath}" alt="${headerName} header" class="command-header">`, {raw: true});
}

// Available commands
const commands = {
    help: function() {
        return `
[[;#9ece6a;]Available Commands:]]

[[;#7aa2f7;]General:]]
  [[;#bb9af7;]help]        - Show this help message
  [[;#bb9af7;]about]       - About me
  [[;#bb9af7;]skills]      - My technical skills
  [[;#bb9af7;]projects]    - View my projects
  [[;#bb9af7;]contact]     - Contact information
  [[;#bb9af7;]cv]          - View my curriculum vitae
  [[;#bb9af7;]clear]       - Clear the terminal
  [[;#bb9af7;]theme]       - Toggle light/dark theme

[[;#7aa2f7;]Navigation:]]
  Use the [[;#bb9af7;]Tab] key to autocomplete commands
  Use [[;#bb9af7;]↑/↓] arrows to navigate command history
  
[[;#7aa2f7;]Tips:]]
  Try '[[;#bb9af7;]projects]' to see what I've been working on
  Type '[[;#bb9af7;]contact]' to get in touch with me
`;
    },
    about: function(_, term) {
        displayHeader(term, 'about');

        if (portfolioData.about && portfolioData.personal) {
            const about = portfolioData.about;
            const personal = portfolioData.personal;
            
            // Display personal information
            let aboutText = `\n[[;#9ece6a;]◆ Personal Information]\n`;
            aboutText += `  [[;#7aa2f7;]Name:] ${personal.name}\n`;
            aboutText += `  [[;#7aa2f7;]Title:] ${personal.title}\n`;
            aboutText += `  [[;#7aa2f7;]Email:] ${personal.email}\n`;
            aboutText += `  [[;#7aa2f7;]GitHub:] [[u;#7aa2f7;]${personal.github}]\n`;
            aboutText += `  [[;#7aa2f7;]LinkedIn:] [[u;#7aa2f7;]${personal.linkedin}]\n\n`;
            
            // Display about description
            aboutText += `[[;#9ece6a;]◆ About Me]\n`;
            aboutText += `  ${about.description}\n\n`;

            // Add quote if available
            if (about.quote) {
                aboutText += `[[i;#e0af68;]"${about.quote}"]\n\n`;
            }

            // Add highlights if available
            if (about.highlights && about.highlights.length > 0) {
                aboutText += `[[;#9ece6a;]◆ Highlights]\n`;
                about.highlights.forEach(highlight => {
                    aboutText += `  [[;#bb9af7;]❯] ${highlight}\n`;
                });
            }
            
            // Add navigation options
            aboutText += `\n[[;#e0af68;]Related Commands:]\n`;
            aboutText += `Type '[[;#bb9af7;]skills]' to see my technical skills\n`;
            aboutText += `Type '[[;#bb9af7;]projects]' to view my projects\n`;
            aboutText += `Type '[[;#bb9af7;]contact]' for contact information\n`;

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

            // Add introduction
            skillsText += `I have experience with various technologies across different domains of software development.\n\n`;

            // Add skills by category
            Object.keys(skills).forEach(category => {
                skillsText += `[[;#9ece6a;]◆ ${category}]\n`;
                
                skills[category].forEach(skill => {
                    // If skill has a proficiency level
                    if (typeof skill === 'object' && skill.name && skill.level) {
                        const stars = '★'.repeat(skill.level) + '☆'.repeat(5 - skill.level);
                        skillsText += `  [[;#7aa2f7;]${skill.name}] [[;#e0af68;]${stars}]\n`;
                    } else {
                        // Simple skill name
                        skillsText += `  [[;#7aa2f7;]${skill}]\n`;
                    }
                });
                
                skillsText += `\n`;
            });

            // Add learning section if available
            if (portfolioData.learning && portfolioData.learning.length > 0) {
                skillsText += `[[;#9ece6a;]◆ Currently Learning]\n`;
                portfolioData.learning.forEach(item => {
                    skillsText += `  [[;#bb9af7;]•] ${item}\n`;
                });
                skillsText += `\n`;
            }

            return skillsText;
        } else {
            return `\n[[;#f7768e;]Error loading skills data. Please refresh the page.]`;
        }
    },
    projects: function(_, term) {
        displayHeader(term, 'projects');

        // Only use projects from the portfolio data, not from CV
        let allProjects = [];

        // Add portfolio projects
        if (portfolioData.projects && portfolioData.projects.length > 0) {
            allProjects = [...portfolioData.projects];
        }

        let projectsText = `\n`;

        if (allProjects.length === 0) {
            projectsText += `[[;#f7768e;]No projects found. Please refresh the page.]\n`;
        } else {
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
        }

        return projectsText;
    },
    contact: function(_, term) {
        displayHeader(term, 'contact');

        if (portfolioData.personal) {
            const personal = portfolioData.personal;
            let contactText = `\n`;

            // Add contact information
            contactText += `[[;#9ece6a;]◆ Contact Information]\n\n`;
            
            if (personal.email) {
                contactText += `  [[;#7aa2f7;]Email:] [[u;#bb9af7;]${personal.email}]\n`;
            }
            
            if (personal.linkedin) {
                contactText += `  [[;#7aa2f7;]LinkedIn:] [[u;#bb9af7;]${personal.linkedin}]\n`;
            }
            
            if (personal.github) {
                contactText += `  [[;#7aa2f7;]GitHub:] [[u;#bb9af7;]${personal.github}]\n`;
            }
            
            if (personal.location) {
                contactText += `  [[;#7aa2f7;]Location:] ${personal.location}\n`;
            }
            
            // Add contact form information
            contactText += `\n[[;#9ece6a;]◆ Get In Touch]\n\n`;
            contactText += `  I'm open to freelance opportunities, collaborations, and interesting projects.\n`;
            contactText += `  Feel free to reach out if you'd like to discuss potential collaborations or just say hello!\n\n`;
            
            // Add response time
            contactText += `  [[;#e0af68;]Response Time:] I typically respond within 24-48 hours.\n`;

            return contactText;
        } else {
            return `\n[[;#f7768e;]Error loading contact data. Please refresh the page.]`;
        }
    },
    theme: function() {
        // Toggle the theme
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
        
        return `\n[[;#9ece6a;]Theme switched to ${currentTheme} mode!]`;
    },
    cv: function(_, term) {
        // Create a fullscreen overlay for the CV
        const $overlay = $('<div class="fullscreen-overlay"><div class="overlay-content"><div class="overlay-header"><button class="overlay-close">×</button><h2>Curriculum Vitae</h2></div><div class="overlay-body"><iframe src="assets/templates/cv-embed.html" frameborder="0"></iframe></div></div></div>');
        
        // Add to the body
        $('body').append($overlay);
        
        // Add close button handler
        $overlay.find('.overlay-close').on('click', function() {
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
[[;#bb9af7;]•] For more details on specific sections, use the related command:
   - Type '[[;#bb9af7;]teaching]' for teaching experience
`;
        } else {
            return `

[[;#9ece6a;]Displaying CV in a visual format...]]

[[;#bb9af7;]•] Press ESC or click the X button to close the CV view
[[;#bb9af7;]•] The CV provides a comprehensive overview of my professional background
[[;#bb9af7;]•] For more details on specific sections, use the related command:
   - Type '[[;#bb9af7;]teaching]' for teaching experience

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

            return teachingText;
        } else {
            return `\n[[;#f7768e;]Error loading teaching data. Please refresh the page.]`;
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
