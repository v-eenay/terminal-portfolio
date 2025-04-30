const greetings = `Welcome to my terminal portfolio! Type 'help' to see available commands.`;

// Define commands
const commands = {
    help: function() {
        return `
Available commands:
- about: Learn about me
- skills: See my technical skills
- tech: View my complete tech stack
- projects: View my projects
- stats: View my GitHub stats
- theater: Learn about my theater background
- contact: Get my contact information
- clear: Clear the terminal
- help: Show this help message
`;
    },
    about: function() {
        return `
\x1b[1m+-------------+\x1b[0m
\x1b[1m|  ABOUT ME   |\x1b[0m
\x1b[1m+-------------+\x1b[0m

Versatile technology enthusiast with a unique blend of technical expertise and creative expression.
My background in computer science engineering and business administration provides me with a
holistic perspective on technology and its applications. When I'm not immersed in code,
you'll find me on stage, where I channel my passion for theatrical arts.

"At the intersection of logic and creativity lies true innovation."

- [>] Computer Science Engineer with an MBA
- [>] Theater performer exploring the art of expression
- [>] Constantly exploring emerging technologies
- [>] Ask me about the parallels between coding and performing arts
`;
    },
    skills: function() {
        return `
\x1b[1m+----------------------+\x1b[0m
\x1b[1m| TECH ARSENAL - SKILLS |\x1b[0m
\x1b[1m+----------------------+\x1b[0m

[*] Languages:
- C#, Python, JavaScript, TypeScript, Java, C++, Dart

[*] Web Development:
- Frontend: HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery
- Frontend Frameworks: React, Next.js, Angular, Vue.js, Redux, Blazor
- Backend: Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

[*] Mobile Development:
- Flutter, React Native, Xamarin, Android, MAUI

[*] Databases & Data:
- MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

Type 'tech' for my complete tech stack.
`;
    },
    tech: function() {
        return `
\x1b[1m+-------------------+\x1b[0m
\x1b[1m| COMPLETE TECH STACK |\x1b[0m
\x1b[1m+-------------------+\x1b[0m

\x1b[1m[*] Languages\x1b[0m
- C#, Python, JavaScript, TypeScript, Java, C++, Dart

\x1b[1m[*] Web Development\x1b[0m
Frontend:
- HTML5, CSS3, SASS, Bootstrap, Tailwind CSS, jQuery

Frontend Frameworks:
- React, Next.js, Angular, Vue.js, Redux, Blazor

Backend:
- Node.js, Express.js, Django, Flask, Spring, ASP.NET, .NET

\x1b[1m[*] Mobile Development\x1b[0m
- Flutter, React Native, Xamarin, Android, MAUI

\x1b[1m[*] Databases & Data\x1b[0m
- MySQL, PostgreSQL, SQL Server, MongoDB, Firebase, Redis, GraphQL

\x1b[1m[*] DevOps & Cloud\x1b[0m
- Git, GitHub, Docker, Kubernetes, AWS, Azure

\x1b[1m[*] Development Tools\x1b[0m
- VS Code, Visual Studio, IntelliJ, Android Studio, Postman

\x1b[1m[*] Design Tools\x1b[0m
- Figma, Adobe Photoshop, Adobe Illustrator, Canva

\x1b[1m[*] Currently Exploring\x1b[0m
- TensorFlow, PyTorch, Blockchain, Web3.js, Rust, Go
`;
    },
    projects: function() {
        return `
\x1b[1m+-------------+\x1b[0m
\x1b[1m| MY PROJECTS |\x1b[0m
\x1b[1m+-------------+\x1b[0m

1. Terminal Portfolio - This interactive terminal-based portfolio
2. [Project 2] - Description of project 2
3. [Project 3] - Description of project 3

Type 'project 1', 'project 2', etc. for more details.
`;
    },
    theater: function() {
        return `
\x1b[1m+----------------------+\x1b[0m
\x1b[1m| THE STAGE & THE SCREEN |\x1b[0m
\x1b[1m+----------------------+\x1b[0m

My background in theater has enhanced my professional capabilities, particularly in
communication, presentation, and audience engagement - skills that are invaluable
in the technology sector. Theater experience has developed my ability to collaborate
effectively and deliver compelling presentations.

"All the world's a stage, and all the men and women merely players." - William Shakespeare

The methodical approach required in theatrical productions parallels software development
practices, emphasizing precision, iteration, and team coordination. Both disciplines
require structured creativity and meticulous attention to detail.
`;
    },
    stats: function() {
        return `
\x1b[1m+-------------------------+\x1b[0m
\x1b[1m| GITHUB STATS & ACHIEVEMENTS |\x1b[0m
\x1b[1m+-------------------------+\x1b[0m

GitHub Profile: https://github.com/v-eenay

[*] GitHub Trophies
- Multiple achievements and recognitions for contributions

[*] Contribution Metrics
- Active contributor with consistent activity
- Diverse language usage across repositories
- Strong streak of daily contributions

Visit my GitHub profile for detailed statistics and contribution graphs.
`;
    },
    contact: function() {
        return `
\x1b[1m+---------------------+\x1b[0m
\x1b[1m| CONTACT INFORMATION |\x1b[0m
\x1b[1m+---------------------+\x1b[0m

- Email: koiralavinay@gmail.com
- GitHub: github.com/v-eenay
- LinkedIn: linkedin.com/in/veenay

"Whether writing code or performing on stage, I'm always looking to create something meaningful.
Let's collaborate and build something extraordinary together."
`;
    },
    'project 1': function() {
        return `
\x1b[1m+-------------------+\x1b[0m
\x1b[1m| TERMINAL PORTFOLIO |\x1b[0m
\x1b[1m+-------------------+\x1b[0m

An interactive terminal-based portfolio showcasing my skills, projects, and background.
Built using HTML, CSS, and JavaScript with jQuery Terminal.

Features:
- Interactive command-line interface
- Custom styling and animations
- Responsive design for all devices
- Easy navigation through various sections
`;
    }
};

// Initialize terminal
$(function() {
    $('#terminal-container').terminal(commands, {
        greetings: greetings,
        height: '100%',
        prompt: '\x1b[1;36mvinay@portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ',
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
            this.echo('\nType \x1b[1;32mhelp\x1b[0m to see available commands.');
        },
        linksNoReferrer: false,
        convertLinks: true,
        allowedAttributes: ['href', 'target', 'title', 'style', 'class'],
        historySize: 50,
        scrollOnEcho: true
    });
});