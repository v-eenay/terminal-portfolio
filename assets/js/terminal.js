// Empty greetings - we'll use our custom typing animation instead
const greetings = '';

// Completely rewritten typing animation function
function typeText(term, text, options = {}) {
    const delay = options.delay || 30; // Default delay between characters

    // If text is empty, do nothing
    if (!text) return;

    // Create a unique ID for this typing instance
    const typingId = 'typing-' + Math.floor(Math.random() * 10000);

    // First, echo the raw text with proper formatting but make it invisible
    term.echo(text, {
        finalize: function($div) {
            // Add the ID to the div for later reference
            $div.attr('id', typingId);
            // Make all text initially invisible
            $div.find('span').css('opacity', '0');
            // Make the container visible
            $div.css('opacity', '1');
        }
    });

    // Get the container
    const $container = $('#' + typingId);

    // Get all text nodes and spans in the container
    const $elements = $container.find('span').addBack();
    const totalElements = $elements.length;

    // Variables for the animation
    let elementIndex = 0;
    let charIndex = 0;
    let currentElement = null;
    let currentText = '';
    let originalText = '';

    // Function to reveal the next element or character
    function revealNext() {
        // If we've processed all elements, we're done
        if (elementIndex >= totalElements) {
            return;
        }

        // Get the current element if we don't have one
        if (!currentElement) {
            currentElement = $elements.eq(elementIndex);
            originalText = currentElement.text();
            currentText = '';
            charIndex = 0;

            // If this element is empty or just whitespace, move to the next one
            if (!originalText || originalText.trim() === '') {
                elementIndex++;
                currentElement = null;
                setTimeout(revealNext, 0);
                return;
            }

            // Make the element visible but with no text
            currentElement.css('opacity', '1').text('');
        }

        // Add the next character
        currentText += originalText.charAt(charIndex);
        charIndex++;

        // Update the element text
        currentElement.text(currentText);

        // Play typing sound if available
        if (window.TerminalSounds && typeof window.TerminalSounds.playKeySound === 'function') {
            const char = originalText.charAt(charIndex - 1);
            if (char.trim() !== '') {
                window.TerminalSounds.playKeySound();
            }
        }

        // If we've revealed all characters in this element, move to the next one
        if (charIndex >= originalText.length) {
            elementIndex++;
            currentElement = null;
        }

        // Schedule the next character or element
        setTimeout(revealNext, delay);
    }

    // Start the animation
    revealNext();
}

// Portfolio data
let portfolioData = {};

// Helper function for text wrapping and justification
function formatParagraph(text, indentation = 0, maxWidth = 80, justify = true) {
    // Handle empty or undefined text
    if (!text) return '';

    // Split text into words, preserving hyphenated words as single units
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    const indent = ' '.repeat(indentation);

    // Calculate effective max width (accounting for indentation)
    const effectiveMaxWidth = maxWidth - indentation;

    // Process each word
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Special case: if a single word is longer than the effective max width
        if (word.length > effectiveMaxWidth) {
            // If we have content on the current line, add it first
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = '';
            }

            // Add the long word as its own line - never cut words
            lines.push(word);
            continue;
        }

        // Check if adding this word would exceed the line length
        if (currentLine.length + word.length + 1 > effectiveMaxWidth && currentLine.length > 0) {
            // Add the current line to lines array
            lines.push(currentLine);
            // Start a new line with the current word
            currentLine = word;
        } else {
            // Add the word to the current line with a space if not the first word
            if (currentLine.length > 0) {
                currentLine += ' ' + word;
            } else {
                currentLine = word;
            }
        }
    }

    // Add the last line if it's not empty
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    // Justify the text if requested (except for the last line)
    if (justify && lines.length > 1) {
        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            const words = line.split(' ');

            // Only justify if there are multiple words
            if (words.length > 1) {
                const totalSpaces = effectiveMaxWidth - line.replace(/ /g, '').length;
                const gaps = words.length - 1;
                const spacesPerGap = Math.floor(totalSpaces / gaps);
                let extraSpaces = totalSpaces - (spacesPerGap * gaps);

                // Rebuild the line with justified spacing
                let justifiedLine = words[0];
                for (let j = 1; j < words.length; j++) {
                    const spaces = spacesPerGap + (extraSpaces > 0 ? 1 : 0);
                    justifiedLine += ' '.repeat(spaces) + words[j];
                    extraSpaces--;
                }

                lines[i] = justifiedLine;
            }
        }
    }

    // Add indentation to each line
    return lines.map(line => indent + line).join('\n');
}

// Helper function to generate project details
function generateProjectDetails(project, username) {
    let projectText = `\n`;

    // Display project name
    projectText += `[[;#7aa2f7;]${project.name}]\n\n`;

    // Display full description with proper wrapping and justification
    const descTextColor = getTextColor();
    const formattedDescription = formatParagraph(project.description, 0, 80, true);
    projectText += `[[;${descTextColor};]${formattedDescription}]\n\n`;

    // Add features if available
    if (project.features && project.features.length > 0) {
        projectText += `[[;#9ece6a;]◆ Features:]\n`;
        project.features.forEach(feature => {
            const featureTextColor = getTextColor();
            // Format each feature with proper wrapping
            const formattedFeature = formatParagraph(feature, 4, 80, false);
            projectText += `  [[;#bb9af7;]•] [[;${featureTextColor};]${formattedFeature.trim()}]\n`;
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

// Function to get a neutral text color that works in both themes
function getTextColor() {
    // Return a neutral color that's readable in both light and dark modes
    // #2d4f67 is a muted blue-gray that has good contrast on both backgrounds
    return '#2d4f67';
}

// Function to force text color to a neutral color
function forceTextColor(term, text) {
    const textColor = getTextColor();

    // Replace any existing color formatting with the neutral color
    // This ensures text is always readable regardless of theme
    return text.replace(/\[\[;#[0-9a-fA-F]{6};/g, `[[;${textColor};`);
}

// Define commands
const commands = {
    help: function(_, term) {
        displayHeader(term, 'help');

        let helpText = `\n`;

        // Generate help text from JSON data with categories
        if (portfolioData.commands && portfolioData.commands.length > 0) {
            // Define command categories
            const categories = {
                "About Me": ["about", "cv", "download-cv", "teaching", "theater"],
                "Skills & Projects": ["skills", "tech", "projects"],
                "Connect": ["contact", "stats"],
                "Terminal Controls": ["help", "clear", "sound", "light", "dark"]
            };

            // Process each category
            for (const [category, cmdList] of Object.entries(categories)) {
                helpText += `[[;#9ece6a;]◆ ${category}:]\n`;

                // Filter commands that belong to this category
                const categoryCommands = portfolioData.commands.filter(cmd => cmdList.includes(cmd.name));

                // Add each command in this category
                categoryCommands.forEach(cmd => {
                    const textColor = getTextColor();
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]${cmd.name}][[;${textColor};]: ${cmd.description}]\n`;
                });

                // Add special commands for each category
                if (category === "Connect" && window.innerWidth <= 768) {
                    const statsTextColor = getTextColor();
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]stats][[;${statsTextColor};]: View GitHub statistics and activity]\n`;
                }

                if (category === "Terminal Controls") {
                    const textColor = getTextColor();
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]sound][[;${textColor};]: Toggle keyboard sound effects on/off]\n`;
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]sound test][[;${textColor};]: Play test sounds to verify audio is working]\n`;
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]light][[;${textColor};]: Switch to light mode theme]\n`;
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]dark][[;${textColor};]: Switch to dark mode theme]\n`;
                }

                helpText += `\n`;
            }

            // Add project commands if there are projects
            if (portfolioData.projects && portfolioData.projects.length > 0) {
                helpText += `[[;#9ece6a;]◆ Project Details:]\n`;
                for (let i = 1; i <= portfolioData.projects.length; i++) {
                    const project = portfolioData.projects[i-1];
                    const projectTextColor = getTextColor();
                    helpText += `  [[;#bb9af7;]❯] [[;#7aa2f7;]project ${i}][[;${projectTextColor};]: View details for ${project.name}]\n`;
                }
            }
        } else {
            helpText = `[[;#f7768e;]Error loading commands. Please refresh the page.]`;
        }

        // Return the text directly without typing animation
        return helpText;
    },
    sound: function(args, term) {
        if (args.length > 0 && args[0] === 'test') {
            // Play test sounds
            if ($.terminal.sound.playTest) {
                $.terminal.sound.playTest();
                return `\n[[;#9ece6a;]Playing test sounds...]]`;
            }
        } else {
            // Toggle sound effects
            const enabled = $.terminal.sound.toggle();
            return `\n[[;#9ece6a;]Sound effects ${enabled ? 'enabled' : 'disabled'}.]

Type '[[;#bb9af7;]sound test]' to play test sounds.`;
        }
    },
    about: function(_, term) {
        displayHeader(term, 'about');

        if (portfolioData.about) {
            const about = portfolioData.about;
            const aboutTextColor = getTextColor();

            // Format the description with proper wrapping and justification
            const formattedDesc = formatParagraph(about.description, 0, 80, true);
            let aboutText = `\n[[;${aboutTextColor};]${formattedDesc}]\n\n`;

            // Add quote if available
            if (about.quote) {
                aboutText += `[[i;#e0af68;]"${about.quote}"]\n\n`;
            }

            // Add highlights if available
            if (about.highlights && about.highlights.length > 0) {
                about.highlights.forEach(highlight => {
                    const highlightTextColor = getTextColor();
                    // Format each highlight with proper wrapping
                    const formattedHighlight = formatParagraph(highlight, 4, 80, true);
                    aboutText += `[[;#bb9af7;]❯] [[;${highlightTextColor};]${formattedHighlight.trim()}]\n`;
                });
            }

            // Return the text directly instead of using typing animation
            // This ensures the full text is displayed immediately
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
                const langTextColor = getTextColor();
                skillsText += `[[;#9ece6a;]◆ Languages:]\n  [[;${langTextColor};]${skills.languages.join(', ')}]\n\n`;
            }

            // Add web development skills
            skillsText += `[[;#9ece6a;]◆ Web Development:]\n`;
            if (skills.frontend && skills.frontend.length > 0) {
                const frontendTextColor = getTextColor();
                skillsText += `  [[;#7aa2f7;]Frontend:] [[;${frontendTextColor};]${skills.frontend.join(', ')}]\n`;
            }
            if (skills.frontendFrameworks && skills.frontendFrameworks.length > 0) {
                const frameworksTextColor = getTextColor();
                skillsText += `  [[;#7aa2f7;]Frontend Frameworks:] [[;${frameworksTextColor};]${skills.frontendFrameworks.join(', ')}]\n`;
            }
            if (skills.backend && skills.backend.length > 0) {
                const backendTextColor = getTextColor();
                skillsText += `  [[;#7aa2f7;]Backend:] [[;${backendTextColor};]${skills.backend.join(', ')}]\n\n`;
            }

            // Add mobile development skills
            if (skills.mobile && skills.mobile.length > 0) {
                const mobileTextColor = getTextColor();
                skillsText += `[[;#9ece6a;]◆ Mobile Development:]\n  [[;${mobileTextColor};]${skills.mobile.join(', ')}]\n\n`;
            }

            // Add database skills
            if (skills.databases && skills.databases.length > 0) {
                const dbTextColor = getTextColor();
                skillsText += `[[;#9ece6a;]◆ Databases & Data:]\n  [[;${dbTextColor};]${skills.databases.join(', ')}]\n\n`;
            }

            skillsText += `Type '[[;#bb9af7;]tech]' for my complete tech stack.`;

            // Return the text directly instead of using typing animation
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
                const langTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Languages]\n  [[;${langTextColor};]${skills.languages.join(', ')}]\n\n`;
            }

            // Add web development section
            techText += `[[;#9ece6a;]◆ Web Development]\n`;

            // Add frontend skills
            if (skills.frontend && skills.frontend.length > 0) {
                const frontendTextColor = getTextColor();
                techText += `  [[;#7aa2f7;]Frontend:]\n  [[;${frontendTextColor};]${skills.frontend.join(', ')}]\n\n`;
            }

            // Add frontend frameworks
            if (skills.frontendFrameworks && skills.frontendFrameworks.length > 0) {
                const frameworksTextColor = getTextColor();
                techText += `  [[;#7aa2f7;]Frontend Frameworks:]\n  [[;${frameworksTextColor};]${skills.frontendFrameworks.join(', ')}]\n\n`;
            }

            // Add backend skills
            if (skills.backend && skills.backend.length > 0) {
                const backendTextColor = getTextColor();
                techText += `  [[;#7aa2f7;]Backend:]\n  [[;${backendTextColor};]${skills.backend.join(', ')}]\n\n`;
            }

            // Add mobile development skills
            if (skills.mobile && skills.mobile.length > 0) {
                const mobileTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Mobile Development]\n  [[;${mobileTextColor};]${skills.mobile.join(', ')}]\n\n`;
            }

            // Add database skills
            if (skills.databases && skills.databases.length > 0) {
                const dbTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Databases & Data]\n  [[;${dbTextColor};]${skills.databases.join(', ')}]\n\n`;
            }

            // Add DevOps
            if (skills.devops && skills.devops.length > 0) {
                const devopsTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ DevOps & Cloud]\n  [[;${devopsTextColor};]${skills.devops.join(', ')}]\n\n`;
            }

            // Add tools
            if (skills.tools && skills.tools.length > 0) {
                const toolsTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Development Tools]\n  [[;${toolsTextColor};]${skills.tools.join(', ')}]\n\n`;
            }

            // Add design skills
            if (skills.design && skills.design.length > 0) {
                const designTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Design Tools]\n  [[;${designTextColor};]${skills.design.join(', ')}]\n\n`;
            }

            // Add exploring skills
            if (skills.exploring && skills.exploring.length > 0) {
                const exploringTextColor = getTextColor();
                techText += `[[;#9ece6a;]◆ Currently Exploring]\n  [[;${exploringTextColor};]${skills.exploring.join(', ')}]`;
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

                // Get the appropriate text color for the current theme
                const descTextColor = getTextColor();

                // Format the description with proper wrapping and justification
                const formattedDesc = formatParagraph(projectDesc, 3, 80, true);

                // Add the formatted description with color
                projectsText += `   [[;${descTextColor};]${formattedDesc}]\n`;

                // Add technologies if available
                if (project.technologies && project.technologies.length > 0) {
                    // Format technologies with proper wrapping if needed
                    const techText = project.technologies.join(', ');
                    if (techText.length > 70) {
                        const formattedTech = formatParagraph(techText, 18, 80, false);
                        projectsText += `   [[;#bb9af7;]Technologies:] [[;${descTextColor};]${formattedTech.substring(18)}]\n`;
                    } else {
                        projectsText += `   [[;#bb9af7;]Technologies:] [[;${descTextColor};]${techText}]\n`;
                    }
                }
                projectsText += `\n`;
            });

            // Add instructions for viewing project details
            projectsText += `[[;#e0af68;]Available Project Commands:]\n`;
            const cmdTextColor = getTextColor();
            for (let i = 1; i <= allProjects.length; i++) {
                projectsText += `[[;${cmdTextColor};]Type ]'[[;#bb9af7;]project ${i}]'[[;${cmdTextColor};] for details on ${allProjects[i-1].name}]\n`;
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
            const theaterTextColor = getTextColor();

            // Format the description with proper wrapping and justification
            const formattedDesc = formatParagraph(theater.description, 0, 80, true);
            let theaterText = `\n[[;${theaterTextColor};]${formattedDesc}]\n\n`;

            // Add quote if available
            if (theater.quote) {
                theaterText += `[[i;#e0af68;]"${theater.quote}"] [[;#bb9af7;]- ${theater.quoteAuthor || ''}]\n\n`;
            }

            // Add additional info if available
            if (theater.additionalInfo) {
                const additionalInfoTextColor = getTextColor();
                // Format additional info with proper wrapping and justification
                const formattedInfo = formatParagraph(theater.additionalInfo, 0, 80, true);
                theaterText += `[[;${additionalInfoTextColor};]${formattedInfo}]`;
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
            const contactTextColor = getTextColor();
            const introText = "Feel free to reach out to me through any of the following channels:";
            const formattedIntro = formatParagraph(introText, 0, 80, true);
            let contactText = `\n[[;${contactTextColor};]${formattedIntro}]\n\n`;

            // Add contact information
            if (contact.email) {
                if (typeof contact.email === 'object') {
                    if (contact.email.personal) {
                        contactText += `[[;#bb9af7;]•] Personal Email: [[;#7aa2f7;]${contact.email.personal}]\n`;
                    }
                    if (contact.email.professional) {
                        contactText += `[[;#bb9af7;]•] Professional Email: [[;#7aa2f7;]${contact.email.professional}]\n`;
                    }
                } else {
                    contactText += `[[;#bb9af7;]•] Email: [[;#7aa2f7;]${contact.email}]\n`;
                }
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
   - Type '[[;#bb9af7;]projects]' for project details
   - Type '[[;#bb9af7;]download-cv]' to download my CV as PDF
`;
        } else {
            return `

[[;#9ece6a;]Displaying CV in a visual format...]]

[[;#bb9af7;]•] Press ESC or click the X button to close the CV view
[[;#bb9af7;]•] The CV provides a comprehensive overview of my professional background
[[;#bb9af7;]•] For more details on specific sections, use the related commands:
   - Type '[[;#bb9af7;]teaching]' for teaching experience
   - Type '[[;#bb9af7;]projects]' for project details
   - Type '[[;#bb9af7;]download-cv]' to download my CV as PDF

[[i;#e0af68;]"Education is not the filling of a pail, but the lighting of a fire."] [[;#bb9af7;]- W.B. Yeats]
`;
        }
    },
    'download-cv': function(_, term) {
        displayHeader(term, 'cv');

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = 'assets/downloads/Binay_Koirala_CV.pdf';
        downloadLink.download = 'Binay_Koirala_CV.pdf';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(downloadLink);
        }, 100);

        return `
[[;#9ece6a;]Downloading CV as PDF...]]

[[;#bb9af7;]•] Your download should start automatically
[[;#bb9af7;]•] If the download doesn't start, please try again or use the download button in the CV view
[[;#bb9af7;]•] Type '[[;#bb9af7;]cv]' to view my curriculum vitae in the browser
`;
    },
    teaching: function(_, term) {
        displayHeader(term, 'teaching');

        if (portfolioData.cv && portfolioData.cv.teaching) {
            const teaching = portfolioData.cv.teaching;
            let teachingText = `\n`;

            // Add teaching philosophy
            teachingText += `[[;#9ece6a;]◆ Teaching Philosophy]\n`;
            const philosophyTextColor = getTextColor();
            const philosophyText = "I believe in creating an engaging, interactive learning environment that combines theoretical concepts with practical applications. My teaching approach focuses on fostering critical thinking, problem-solving skills, and technological creativity while adapting to diverse learning styles.";
            const formattedPhilosophy = formatParagraph(philosophyText, 2, 80, true);
            teachingText += `  [[;${philosophyTextColor};]${formattedPhilosophy}]\n\n`;

            // Add teaching experience
            if (teaching.length > 0) {
                teachingText += `[[;#9ece6a;]◆ Courses Taught]\n\n`;
                teaching.forEach(course => {
                    teachingText += `  [[;#7aa2f7;]${course.course}]\n`;
                    teachingText += `  [[;#bb9af7;]${course.institution}]\n`;
                    const courseTextColor = getTextColor();
                    // Format course description with proper wrapping and justification
                    const formattedDesc = formatParagraph(course.description, 2, 80, true);
                    teachingText += `  [[;${courseTextColor};]${formattedDesc}]\n\n`;
                });
            }

            // Add teaching methodologies
            teachingText += `[[;#9ece6a;]◆ Teaching Methodologies]\n`;
            const methodTextColor = getTextColor();
            // Format each methodology with proper wrapping
            const pbl = formatParagraph("Implementing real-world projects to enhance practical understanding", 4, 80, true);
            const flipped = formatParagraph("Providing materials for pre-class study and focusing on interactive activities during class", 4, 80, true);
            const peer = formatParagraph("Encouraging collaborative problem-solving and knowledge sharing", 4, 80, true);
            const tech = formatParagraph("Utilizing digital tools and platforms to enhance learning experiences", 4, 80, true);

            teachingText += `  [[;#7aa2f7;]• Project-Based Learning:] [[;${methodTextColor};]${pbl.substring(4)}]\n`;
            teachingText += `  [[;#7aa2f7;]• Flipped Classroom:] [[;${methodTextColor};]${flipped.substring(4)}]\n`;
            teachingText += `  [[;#7aa2f7;]• Peer Learning:] [[;${methodTextColor};]${peer.substring(4)}]\n`;
            teachingText += `  [[;#7aa2f7;]• Technology Integration:] [[;${methodTextColor};]${tech.substring(4)}]\n\n`;

            // Add professional development
            if (portfolioData.cv.professional_development && portfolioData.cv.professional_development.length > 0) {
                teachingText += `[[;#9ece6a;]◆ Professional Development]\n\n`;
                portfolioData.cv.professional_development.forEach(dev => {
                    teachingText += `  [[;#7aa2f7;]${dev.title}] (${dev.year})\n`;
                    const devTextColor = getTextColor();
                    // Format provider and description with proper wrapping
                    const formattedProvider = formatParagraph(dev.provider, 2, 80, true);
                    const formattedDesc = formatParagraph(dev.description, 2, 80, true);
                    teachingText += `  [[;${devTextColor};]${formattedProvider}]\n`;
                    teachingText += `  [[;${devTextColor};]${formattedDesc}]\n\n`;
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
    },

    // Theme commands
    light: function(_, term) {
        // Check if already in light mode
        const isLightMode = document.documentElement.classList.contains('light-mode');

        if (isLightMode) {
            return `\n[[;#9ece6a;]Light mode is already active.]`;
        } else {
            // Toggle to light mode
            document.documentElement.classList.add('light-mode');

            // Save preference to localStorage
            localStorage.setItem('theme', 'light');

            // Update terminal prompt
            if (globalTerminal) {
                // Store current command
                const currentCommand = globalTerminal.get_command();

                // Update the prompt
                globalTerminal.set_prompt(globalTerminal.settings().prompt);

                // Restore the command
                globalTerminal.set_command(currentCommand);
            }

            // Notify iframes about theme change
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    iframe.contentWindow.postMessage('theme-changed', '*');
                } catch (e) {
                    console.error('Error notifying iframe about theme change:', e);
                }
            });

            return `\n[[;#9ece6a;]Switched to light mode.]`;
        }
    },

    dark: function(_, term) {
        // Check if already in dark mode
        const isLightMode = document.documentElement.classList.contains('light-mode');

        if (!isLightMode) {
            return `\n[[;#9ece6a;]Dark mode is already active.]`;
        } else {
            // Toggle to dark mode
            document.documentElement.classList.remove('light-mode');

            // Save preference to localStorage
            localStorage.setItem('theme', 'dark');

            // Update terminal prompt
            if (globalTerminal) {
                // Store current command
                const currentCommand = globalTerminal.get_command();

                // Update the prompt
                globalTerminal.set_prompt(globalTerminal.settings().prompt);

                // Restore the command
                globalTerminal.set_command(currentCommand);
            }

            // Notify iframes about theme change
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    iframe.contentWindow.postMessage('theme-changed', '*');
                } catch (e) {
                    console.error('Error notifying iframe about theme change:', e);
                }
            });

            return `\n[[;#9ece6a;]Switched to dark mode.]`;
        }
    }
};

// Global terminal reference
let globalTerminal = null;

// Function to set terminal reference
window.setTerminalReference = function(term) {
    globalTerminal = term;
};

// Store terminal settings for recreation
let terminalSettings = {};
window.storeTerminalSettings = function(settings) {
    terminalSettings = settings;
};

// Theme management
function initThemeToggle() {
    // Function to update the terminal prompt when theme changes
    function updateTerminalPrompt() {
        if (!globalTerminal) return;

        // Store current command
        const currentCommand = globalTerminal.get_command();

        // Update the prompt (this will use the neutral color)
        globalTerminal.set_prompt(globalTerminal.settings().prompt);

        // Restore the command
        globalTerminal.set_command(currentCommand);
    }

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

        // Just update the prompt - no need to clear or recreate the terminal
        // since we're using neutral colors that work in both themes
        updateTerminalPrompt();

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

// Simple syntax highlighting function
function highlightCommand(command) {
    // For now, just return the command as is to avoid any issues
    return command;
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

        // If terminal is initialized, update the completion list
        if (terminal && typeof terminal.set_command === 'function') {
            // Get the current command
            const currentCommand = terminal.get_command();

            // Set it back to refresh the completion
            terminal.set_command(currentCommand);
        }
    }

    // Initial call
    handleResponsiveLayout();

    // Listen for window resize
    $(window).on('resize', handleResponsiveLayout);

    // No custom tab completion for now to avoid issues

    // Process command function - extracted to make it reusable for terminal recreation
    function processCommand(command, term) {
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
[[;#2d4f67;]Type ]'[[;#bb9af7;]help]'[[;#2d4f67;] to see available commands.]`;
        }
    }

    // Terminal settings
    const settings = {
        greetings: greetings,
        height: '100%',
        get prompt() {
            // Use a neutral color for the prompt
            return `[[;#bb9af7;]binay@portfolio]:[[;#7aa2f7;]~][[;#2d4f67;]$ ]`;
        },
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
            const term = this;

            // Store terminal reference for theme toggling
            if (window.setTerminalReference) {
                window.setTerminalReference(term);
            }

            // Enable sound by default and initialize
            if (window.TerminalSounds) {
                window.TerminalSounds.enable();

                // Play a silent sound to initialize audio context (needed for some browsers)
                const silentSound = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DcWLjdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");
                silentSound.play().catch(e => {});

                // Don't auto-play test sounds on page load
                // We'll let the user interaction trigger sounds naturally
            } else if ($.terminal.sound && typeof $.terminal.sound.enable === 'function') {
                $.terminal.sound.enable();
            }

            // Add a single welcome message without typing animation
            setTimeout(() => {
                // Create a welcome message with all text and proper spacing using neutral colors
                const welcomeMessage =
                    '[[;#7dcfff;]Welcome to my terminal portfolio!]\n\n' +
                    `[[;#2d4f67;]Type ][[;#bb9af7;]help][[;#2d4f67;] to see available commands.]\n\n` +
                    '[[;#9ece6a;]Keyboard sound effects are enabled. Type ][[;#bb9af7;]sound][[;#9ece6a;] to toggle.]';

                // Echo the message directly without typing animation
                term.echo(welcomeMessage);
            }, 300);
        },
        linksNoReferrer: false,
        convertLinks: true,
        allowedAttributes: ['href', 'target', 'title', 'style', 'class'],
        historySize: 50,
        scrollOnEcho: true
    };

    // Store settings for terminal recreation
    window.storeTerminalSettings(settings);

    // Initialize the terminal
    terminal = $('#terminal-container').terminal(processCommand, settings);
});