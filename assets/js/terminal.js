const greetings = `[[;#7dcfff;]Welcome to my terminal portfolio!] Type '[[;#bb9af7;]help]' to see available commands.`;

// Portfolio data
let portfolioData = {};

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
        const headerPath = `assets/images/headers/${command}.svg`;
        const headerHTML = `<img src="${headerPath}" alt="${command} header" style="width: 100%; max-width: 500px; margin: 10px 0;">`;
        term.echo(headerHTML, {raw: true});
    }
}

// Define commands
const commands = {
    help: function(arg, term) {
        displayHeader(term, 'help');

        let helpText = `\n`;

        // Check if portfolio data is loaded
        if (portfolioData.commands && portfolioData.commands.length > 0) {
            // Generate help text from JSON data
            portfolioData.commands.forEach(cmd => {
                helpText += `[[;#bb9af7;]❯] [[;#7aa2f7;]${cmd.name}]: ${cmd.description}\n`;
            });
        } else {
            // Fallback if data isn't loaded
            helpText = `
[[;#bb9af7;]❯] [[;#7aa2f7;]about]: Learn about me
[[;#bb9af7;]❯] [[;#7aa2f7;]skills]: See my technical skills
[[;#bb9af7;]❯] [[;#7aa2f7;]tech]: View my complete tech stack
[[;#bb9af7;]❯] [[;#7aa2f7;]projects]: View my projects
[[;#bb9af7;]❯] [[;#7aa2f7;]theater]: Learn about my theater background
[[;#bb9af7;]❯] [[;#7aa2f7;]contact]: Get my contact information
[[;#bb9af7;]❯] [[;#7aa2f7;]clear]: Clear the terminal
[[;#bb9af7;]❯] [[;#7aa2f7;]help]: Show this help message
`;
        }

        return helpText;
    },
    about: function(arg, term) {
        displayHeader(term, 'about');

        // Check if portfolio data is loaded
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
            // Fallback if data isn't loaded
            return `
Versatile technology enthusiast with a unique blend of technical expertise and creative expression.
My background in computer science engineering and business administration provides me with a
holistic perspective on technology and its applications. When I'm not immersed in code,
you'll find me on stage, where I channel my passion for theatrical arts.

[[i;#e0af68;]"At the intersection of logic and creativity lies true innovation."]

[[;#bb9af7;]❯] Computer Science Engineer with an MBA
[[;#bb9af7;]❯] Theater performer exploring the art of expression
[[;#bb9af7;]❯] Constantly exploring emerging technologies
[[;#bb9af7;]❯] Ask me about the parallels between coding and performing arts
`;
        }
    },
    skills: function(arg, term) {
        displayHeader(term, 'skills');

        // Check if portfolio data is loaded
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
            // Fallback if data isn't loaded
            return `
[[;#9ece6a;]◆ Languages:]
  C#, Python, JavaScript, TypeScript, Java, C++, Dart

[[;#9ece6a;]◆ Web Development:]
  [[;#7aa2f7;]Frontend:] HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery
  [[;#7aa2f7;]Frontend Frameworks:] React, Next.js, Angular, Vue.js, Redux, Blazor
  [[;#7aa2f7;]Backend:] Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

[[;#9ece6a;]◆ Mobile Development:]
  Flutter, React Native, Xamarin, Android, MAUI

[[;#9ece6a;]◆ Databases & Data:]
  MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

Type '[[;#bb9af7;]tech]' for my complete tech stack.
`;
        }
    },
    tech: function(arg, term) {
        displayHeader(term, 'tech');

        // Check if portfolio data is loaded
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
            // Fallback if data isn't loaded
            return `

[[;#9ece6a;]◆ Languages]
  C#, Python, JavaScript, TypeScript, Java, C++, Dart

[[;#9ece6a;]◆ Web Development]
  [[;#7aa2f7;]Frontend:]
  HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery

  [[;#7aa2f7;]Frontend Frameworks:]
  React, Next.js, Angular, Vue.js, Redux, Blazor

  [[;#7aa2f7;]Backend:]
  Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

[[;#9ece6a;]◆ Mobile Development]
  Flutter, React Native, Xamarin, Android, MAUI

[[;#9ece6a;]◆ Databases & Data]
  MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

[[;#9ece6a;]◆ DevOps & Cloud]
  Git, GitHub, Docker, Kubernetes, AWS, Azure

[[;#9ece6a;]◆ Development Tools]
  VS Code, Visual Studio, IntelliJ, Android Studio, Postman

[[;#9ece6a;]◆ Design Tools]
  Figma, Adobe Photoshop, Adobe Illustrator, Canva

[[;#9ece6a;]◆ Currently Exploring]
  TensorFlow, PyTorch, Blockchain, Web3.js, Rust, Go
`;
        }
    },
    projects: function(arg, term) {
        displayHeader(term, 'projects');

        // Check if portfolio data is loaded
        if (portfolioData.projects && portfolioData.projects.length > 0) {
            let projectsText = `\n`;

            // List all projects
            portfolioData.projects.forEach(project => {
                projectsText += `[[;#e0af68;]${project.id}.] [[;#7aa2f7;]${project.name}] - ${project.description.substring(0, 50)}${project.description.length > 50 ? '...' : ''}\n`;
            });

            projectsText += `\nType '[[;#bb9af7;]project 1]', '[[;#bb9af7;]project 2]', etc. for more details.`;

            return projectsText;
        } else {
            // Fallback if data isn't loaded
            return `

[[;#e0af68;]1.] [[;#7aa2f7;]Terminal Portfolio] - This interactive terminal-based portfolio
[[;#e0af68;]2.] [[;#7aa2f7;][Project 2]] - Description of project 2
[[;#e0af68;]3.] [[;#7aa2f7;][Project 3]] - Description of project 3

Type '[[;#bb9af7;]project 1]', '[[;#bb9af7;]project 2]', etc. for more details.
`;
        }
    },
    theater: function(arg, term) {
        displayHeader(term, 'theater');

        // Check if portfolio data is loaded
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
            // Fallback if data isn't loaded
            return `

My background in theater has enhanced my professional capabilities, particularly in
communication, presentation, and audience engagement - skills that are invaluable
in the technology sector. Theater experience has developed my ability to collaborate
effectively and deliver compelling presentations.

[[i;#e0af68;]"All the world's a stage, and all the men and women merely players."] [[;#bb9af7;]- William Shakespeare]

The methodical approach required in theatrical productions parallels software development
practices, emphasizing precision, iteration, and team coordination. Both disciplines
require structured creativity and meticulous attention to detail.
`;
        }
    },
    stats: function(arg, term) {
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
            $overlay.fadeOut(300, function() {
                $(this).remove();
            });
        });

        // Add escape key listener
        $(document).on('keydown.stats', function(e) {
            if (e.key === 'Escape') {
                $overlay.fadeOut(300, function() {
                    $(this).remove();
                });
                $(document).off('keydown.stats');
            }
        });

        // Show the overlay with a fade-in effect
        $overlay.hide().fadeIn(300);

        return `

[[;#9ece6a;]Displaying GitHub stats in a visual dashboard...]]

GitHub Profile: [[u;#7aa2f7;]https://github.com/v-eenay]

[[;#bb9af7;]•] Press ESC or click the X button to close the stats view
[[;#bb9af7;]•] The dashboard shows real-time GitHub statistics
[[;#bb9af7;]•] Stats include: contributions, streak, languages, and trophies

[[i;#e0af68;]"Code is like humor. When you have to explain it, it's bad."] [[;#bb9af7;]- Cory House]
`;
    },
    contact: function(arg, term) {
        displayHeader(term, 'contact');

        // Check if portfolio data is loaded
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
            // Fallback if data isn't loaded
            return `

[[;#bb9af7;]•] Email: [[;#7aa2f7;]koiralavinay@gmail.com]
[[;#bb9af7;]•] GitHub: [[u;#7aa2f7;]github.com/v-eenay]
[[;#bb9af7;]•] LinkedIn: [[u;#7aa2f7;]linkedin.com/in/veenay]

[[i;#e0af68;]"Whether writing code or performing on stage, I'm always looking to create something meaningful.
Let's collaborate and build something extraordinary together."]
`;
        }
    },
    'project 1': function(arg, term) {
        displayHeader(term, 'project1');

        // Check if portfolio data is loaded
        if (portfolioData.projects && portfolioData.projects.length > 0) {
            // Get the first project (Terminal Portfolio)
            const project = portfolioData.projects[0];
            let projectText = `\n`;

            projectText += `${project.description}\n\n`;

            // Add features if available
            if (project.features && project.features.length > 0) {
                projectText += `[[;#9ece6a;]◆ Features:]\n`;
                project.features.forEach(feature => {
                    projectText += `  [[;#bb9af7;]•] ${feature}\n`;
                });
            }

            return projectText;
        } else {
            // Fallback if data isn't loaded
            return `

An interactive terminal-based portfolio showcasing my skills, projects, and background.
Built using HTML, CSS, and JavaScript with jQuery Terminal.

[[;#9ece6a;]◆ Features:]
  [[;#bb9af7;]•] Interactive command-line interface
  [[;#bb9af7;]•] Custom styling with Tokyo Night theme
  [[;#bb9af7;]•] Responsive design for all devices
  [[;#bb9af7;]•] Easy navigation through various sections
`;
        }
    }
};

// Initialize terminal
$(async function() {
    // Load portfolio data before initializing the terminal
    await loadPortfolioData();

    $('#terminal-container').terminal(function(command, term) {
        // Split the command to handle arguments
        const parts = command.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Check if the command exists
        if (cmd in commands) {
            return commands[cmd].call(this, args, term);
        } else {
            return `[[;#f7768e;]Command not found: ${cmd}]
Type '[[;#bb9af7;]help]' to see available commands.`;
        }
    }, {
        greetings: greetings,
        height: '100%',
        prompt: '[[;#bb9af7;]vinay@portfolio]:[[;#7aa2f7;]~]$ ',
        completion: Object.keys(commands),
        exit: false,
        clear: function() {
            // Just clear the terminal without re-displaying the greeting
            this.clear();
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