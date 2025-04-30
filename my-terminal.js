const greetings = `[[;#7dcfff;]Welcome to my terminal portfolio!] Type '[[;#bb9af7;]help]' to see available commands.`;

// Define commands
const commands = {
    help: function() {
        return `
[[;#7dcfff;]╭─────────────────────────────╮
│     Available Commands      │
╰─────────────────────────────╯]

[[;#bb9af7;]❯] [[;#7aa2f7;]about]: Learn about me
[[;#bb9af7;]❯] [[;#7aa2f7;]skills]: See my technical skills
[[;#bb9af7;]❯] [[;#7aa2f7;]tech]: View my complete tech stack
[[;#bb9af7;]❯] [[;#7aa2f7;]projects]: View my projects
[[;#bb9af7;]❯] [[;#7aa2f7;]stats]: View my GitHub stats
[[;#bb9af7;]❯] [[;#7aa2f7;]theater]: Learn about my theater background
[[;#bb9af7;]❯] [[;#7aa2f7;]contact]: Get my contact information
[[;#bb9af7;]❯] [[;#7aa2f7;]clear]: Clear the terminal
[[;#bb9af7;]❯] [[;#7aa2f7;]help]: Show this help message
`;
    },
    about: function() {
        return `
[[;#7dcfff;]╭─────────────────╮
│    ABOUT ME     │
╰─────────────────╯]

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
    },
    skills: function() {
        return `
[[;#7dcfff;]╭──────────────────────────╮
│  TECH ARSENAL - SKILLS   │
╰──────────────────────────╯]

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
    },
    tech: function() {
        return `
[[;#7dcfff;]╭─────────────────────────╮
│   COMPLETE TECH STACK   │
╰─────────────────────────╯]

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
    },
    projects: function() {
        return `
[[;#7dcfff;]╭─────────────────╮
│   MY PROJECTS   │
╰─────────────────╯]

[[;#e0af68;]1.] [[;#7aa2f7;]Terminal Portfolio] - This interactive terminal-based portfolio
[[;#e0af68;]2.] [[;#7aa2f7;][Project 2]] - Description of project 2
[[;#e0af68;]3.] [[;#7aa2f7;][Project 3]] - Description of project 3

Type '[[;#bb9af7;]project 1]', '[[;#bb9af7;]project 2]', etc. for more details.
`;
    },
    theater: function() {
        return `
[[;#7dcfff;]╭───────────────────────────╮
│  THE STAGE & THE SCREEN   │
╰───────────────────────────╯]

My background in theater has enhanced my professional capabilities, particularly in
communication, presentation, and audience engagement - skills that are invaluable
in the technology sector. Theater experience has developed my ability to collaborate
effectively and deliver compelling presentations.

[[i;#e0af68;]"All the world's a stage, and all the men and women merely players."] [[;#bb9af7;]- William Shakespeare]

The methodical approach required in theatrical productions parallels software development
practices, emphasizing precision, iteration, and team coordination. Both disciplines
require structured creativity and meticulous attention to detail.
`;
    },
    stats: function() {
        return `
[[;#7dcfff;]╭────────────────────────────────╮
│   GITHUB STATS & ACHIEVEMENTS  │
╰────────────────────────────────╯]

GitHub Profile: [[u;#7aa2f7;]https://github.com/v-eenay]

[[;#9ece6a;]◆ GitHub Trophies]
  Multiple achievements and recognitions for contributions

[[;#9ece6a;]◆ Contribution Metrics]
  [[;#bb9af7;]•] Active contributor with consistent activity
  [[;#bb9af7;]•] Diverse language usage across repositories
  [[;#bb9af7;]•] Strong streak of daily contributions

Visit my GitHub profile for detailed statistics and contribution graphs.
`;
    },
    contact: function() {
        return `
[[;#7dcfff;]╭──────────────────────────╮
│   CONTACT INFORMATION    │
╰──────────────────────────╯]

[[;#bb9af7;]•] Email: [[;#7aa2f7;]koiralavinay@gmail.com]
[[;#bb9af7;]•] GitHub: [[u;#7aa2f7;]github.com/v-eenay]
[[;#bb9af7;]•] LinkedIn: [[u;#7aa2f7;]linkedin.com/in/veenay]

[[i;#e0af68;]"Whether writing code or performing on stage, I'm always looking to create something meaningful.
Let's collaborate and build something extraordinary together."]
`;
    },
    'project 1': function() {
        return `
[[;#7dcfff;]╭─────────────────────────╮
│   TERMINAL PORTFOLIO    │
╰─────────────────────────╯]

An interactive terminal-based portfolio showcasing my skills, projects, and background.
Built using HTML, CSS, and JavaScript with jQuery Terminal.

[[;#9ece6a;]◆ Features:]
  [[;#bb9af7;]•] Interactive command-line interface
  [[;#bb9af7;]•] Custom styling with Tokyo Night theme
  [[;#bb9af7;]•] Responsive design for all devices
  [[;#bb9af7;]•] Easy navigation through various sections
`;
    }
};

// Initialize terminal
$(function() {
    $('#terminal-container').terminal(commands, {
        greetings: greetings,
        height: '100%',
        prompt: '[[;#bb9af7;]vinay@portfolio]:[[;#7aa2f7;]~]$ ',
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
            this.echo('\nType [[;#7dcfff;]help] to see available commands.');
        },
        linksNoReferrer: false,
        convertLinks: true,
        allowedAttributes: ['href', 'target', 'title', 'style', 'class'],
        historySize: 50,
        scrollOnEcho: true
    });
});