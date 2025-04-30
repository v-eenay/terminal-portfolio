const greetings = `\x1b[1;38;2;125;207;255mWelcome to my terminal portfolio!\x1b[0m Type '\x1b[1;38;2;187;154;247mhelp\x1b[0m' to see available commands.`;

// Define commands
const commands = {
    help: function() {
        return `
\x1b[1;38;2;125;207;255m╭─────────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│     Available Commands      │\x1b[0m
\x1b[1;38;2;125;207;255m╰─────────────────────────────╯\x1b[0m

\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mabout\x1b[0m: Learn about me
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mskills\x1b[0m: See my technical skills
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mtech\x1b[0m: View my complete tech stack
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mprojects\x1b[0m: View my projects
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mstats\x1b[0m: View my GitHub stats
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mtheater\x1b[0m: Learn about my theater background
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mcontact\x1b[0m: Get my contact information
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mclear\x1b[0m: Clear the terminal
\x1b[1;38;2;187;154;247m❯\x1b[0m \x1b[1;38;2;122;162;247mhelp\x1b[0m: Show this help message
`;
    },
    about: function() {
        return `
\x1b[1;38;2;125;207;255m╭─────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│    ABOUT ME     │\x1b[0m
\x1b[1;38;2;125;207;255m╰─────────────────╯\x1b[0m

Versatile technology enthusiast with a unique blend of technical expertise and creative expression.
My background in computer science engineering and business administration provides me with a
holistic perspective on technology and its applications. When I'm not immersed in code,
you'll find me on stage, where I channel my passion for theatrical arts.

\x1b[3;38;2;224;175;104m"At the intersection of logic and creativity lies true innovation."\x1b[0m

\x1b[1;38;2;187;154;247m❯\x1b[0m Computer Science Engineer with an MBA
\x1b[1;38;2;187;154;247m❯\x1b[0m Theater performer exploring the art of expression
\x1b[1;38;2;187;154;247m❯\x1b[0m Constantly exploring emerging technologies
\x1b[1;38;2;187;154;247m❯\x1b[0m Ask me about the parallels between coding and performing arts
`;
    },
    skills: function() {
        return `
\x1b[1;38;2;125;207;255m╭──────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│  TECH ARSENAL - SKILLS   │\x1b[0m
\x1b[1;38;2;125;207;255m╰──────────────────────────╯\x1b[0m

\x1b[1;38;2;158;206;106m◆ Languages:\x1b[0m
  C#, Python, JavaScript, TypeScript, Java, C++, Dart

\x1b[1;38;2;158;206;106m◆ Web Development:\x1b[0m
  \x1b[1;38;2;122;162;247mFrontend:\x1b[0m HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery
  \x1b[1;38;2;122;162;247mFrontend Frameworks:\x1b[0m React, Next.js, Angular, Vue.js, Redux, Blazor
  \x1b[1;38;2;122;162;247mBackend:\x1b[0m Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

\x1b[1;38;2;158;206;106m◆ Mobile Development:\x1b[0m
  Flutter, React Native, Xamarin, Android, MAUI

\x1b[1;38;2;158;206;106m◆ Databases & Data:\x1b[0m
  MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

Type '\x1b[1;38;2;187;154;247mtech\x1b[0m' for my complete tech stack.
`;
    },
    tech: function() {
        return `
\x1b[1;38;2;125;207;255m╭─────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│   COMPLETE TECH STACK   │\x1b[0m
\x1b[1;38;2;125;207;255m╰─────────────────────────╯\x1b[0m

\x1b[1;38;2;158;206;106m◆ Languages\x1b[0m
  C#, Python, JavaScript, TypeScript, Java, C++, Dart

\x1b[1;38;2;158;206;106m◆ Web Development\x1b[0m
  \x1b[1;38;2;122;162;247mFrontend:\x1b[0m
  HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery

  \x1b[1;38;2;122;162;247mFrontend Frameworks:\x1b[0m
  React, Next.js, Angular, Vue.js, Redux, Blazor

  \x1b[1;38;2;122;162;247mBackend:\x1b[0m
  Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

\x1b[1;38;2;158;206;106m◆ Mobile Development\x1b[0m
  Flutter, React Native, Xamarin, Android, MAUI

\x1b[1;38;2;158;206;106m◆ Databases & Data\x1b[0m
  MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

\x1b[1;38;2;158;206;106m◆ DevOps & Cloud\x1b[0m
  Git, GitHub, Docker, Kubernetes, AWS, Azure

\x1b[1;38;2;158;206;106m◆ Development Tools\x1b[0m
  VS Code, Visual Studio, IntelliJ, Android Studio, Postman

\x1b[1;38;2;158;206;106m◆ Design Tools\x1b[0m
  Figma, Adobe Photoshop, Adobe Illustrator, Canva

\x1b[1;38;2;158;206;106m◆ Currently Exploring\x1b[0m
  TensorFlow, PyTorch, Blockchain, Web3.js, Rust, Go
`;
    },
    projects: function() {
        return `
\x1b[1;38;2;125;207;255m╭─────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│   MY PROJECTS   │\x1b[0m
\x1b[1;38;2;125;207;255m╰─────────────────╯\x1b[0m

\x1b[1;38;2;224;175;104m1.\x1b[0m \x1b[1;38;2;122;162;247mTerminal Portfolio\x1b[0m - This interactive terminal-based portfolio
\x1b[1;38;2;224;175;104m2.\x1b[0m \x1b[1;38;2;122;162;247m[Project 2]\x1b[0m - Description of project 2
\x1b[1;38;2;224;175;104m3.\x1b[0m \x1b[1;38;2;122;162;247m[Project 3]\x1b[0m - Description of project 3

Type '\x1b[1;38;2;187;154;247mproject 1\x1b[0m', '\x1b[1;38;2;187;154;247mproject 2\x1b[0m', etc. for more details.
`;
    },
    theater: function() {
        return `
\x1b[1;38;2;125;207;255m╭───────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│  THE STAGE & THE SCREEN   │\x1b[0m
\x1b[1;38;2;125;207;255m╰───────────────────────────╯\x1b[0m

My background in theater has enhanced my professional capabilities, particularly in
communication, presentation, and audience engagement - skills that are invaluable
in the technology sector. Theater experience has developed my ability to collaborate
effectively and deliver compelling presentations.

\x1b[3;38;2;224;175;104m"All the world's a stage, and all the men and women merely players."\x1b[0m \x1b[38;2;187;154;247m- William Shakespeare\x1b[0m

The methodical approach required in theatrical productions parallels software development
practices, emphasizing precision, iteration, and team coordination. Both disciplines
require structured creativity and meticulous attention to detail.
`;
    },
    stats: function() {
        return `
\x1b[1;38;2;125;207;255m╭────────────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│   GITHUB STATS & ACHIEVEMENTS  │\x1b[0m
\x1b[1;38;2;125;207;255m╰────────────────────────────────╯\x1b[0m

GitHub Profile: \x1b[4;38;2;122;162;247mhttps://github.com/v-eenay\x1b[0m

\x1b[1;38;2;158;206;106m◆ GitHub Trophies\x1b[0m
  Multiple achievements and recognitions for contributions

\x1b[1;38;2;158;206;106m◆ Contribution Metrics\x1b[0m
  \x1b[38;2;187;154;247m•\x1b[0m Active contributor with consistent activity
  \x1b[38;2;187;154;247m•\x1b[0m Diverse language usage across repositories
  \x1b[38;2;187;154;247m•\x1b[0m Strong streak of daily contributions

Visit my GitHub profile for detailed statistics and contribution graphs.
`;
    },
    contact: function() {
        return `
\x1b[1;38;2;125;207;255m╭──────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│   CONTACT INFORMATION    │\x1b[0m
\x1b[1;38;2;125;207;255m╰──────────────────────────╯\x1b[0m

\x1b[38;2;187;154;247m•\x1b[0m Email: \x1b[38;2;122;162;247mkoiralavinay@gmail.com\x1b[0m
\x1b[38;2;187;154;247m•\x1b[0m GitHub: \x1b[4;38;2;122;162;247mgithub.com/v-eenay\x1b[0m
\x1b[38;2;187;154;247m•\x1b[0m LinkedIn: \x1b[4;38;2;122;162;247mlinkedin.com/in/veenay\x1b[0m

\x1b[3;38;2;224;175;104m"Whether writing code or performing on stage, I'm always looking to create something meaningful.
Let's collaborate and build something extraordinary together."\x1b[0m
`;
    },
    'project 1': function() {
        return `
\x1b[1;38;2;125;207;255m╭─────────────────────────╮\x1b[0m
\x1b[1;38;2;125;207;255m│   TERMINAL PORTFOLIO    │\x1b[0m
\x1b[1;38;2;125;207;255m╰─────────────────────────╯\x1b[0m

An interactive terminal-based portfolio showcasing my skills, projects, and background.
Built using HTML, CSS, and JavaScript with jQuery Terminal.

\x1b[1;38;2;158;206;106m◆ Features:\x1b[0m
  \x1b[38;2;187;154;247m•\x1b[0m Interactive command-line interface
  \x1b[38;2;187;154;247m•\x1b[0m Custom styling with Tokyo Night theme
  \x1b[38;2;187;154;247m•\x1b[0m Responsive design for all devices
  \x1b[38;2;187;154;247m•\x1b[0m Easy navigation through various sections
`;
    }
};

// Initialize terminal
$(function() {
    $('#terminal-container').terminal(commands, {
        greetings: greetings,
        height: '100%',
        prompt: '\x1b[1;38;2;187;154;247mvinay@portfolio\x1b[0m:\x1b[1;38;2;122;162;247m~\x1b[0m$ ',
        completion: Object.keys(commands),
        exit: false,
        clear: function() {
            // Clear the terminal but keep the greeting
            this.clear();

            // Re-display the greeting
            this.echo(greetings);
        },
        onInit: function() {
            // Add a typing effect to the initial message
            this.echo('\nType \x1b[1;38;2;125;207;255mhelp\x1b[0m to see available commands.');
        },
        linksNoReferrer: false,
        convertLinks: true,
        allowedAttributes: ['href', 'target', 'title', 'style', 'class'],
        historySize: 50,
        scrollOnEcho: true
    });
});