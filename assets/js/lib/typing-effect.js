/**
 * Typing Effect for jQuery Terminal
 * 
 * This file provides smooth typing animations for terminal output
 */

(function($) {
    // Store the original echo method
    const originalEcho = $.fn.terminal.prototype.echo;
    
    // Add a typing animation method to the terminal
    $.fn.terminal.prototype.typewrite = function(text, options = {}) {
        const term = this;
        const delay = options.delay || 30; // Milliseconds between characters
        const finalDelay = options.finalDelay || 0; // Delay after typing completes
        
        // Default options for echo
        const echoOptions = Object.assign({}, options);
        delete echoOptions.delay;
        delete echoOptions.finalDelay;
        
        // If text is empty, just return
        if (!text) {
            return Promise.resolve();
        }
        
        // Create a promise to track completion
        return new Promise((resolve) => {
            // Create a temporary div to parse formatting
            const $temp = $('<div>').html(text);
            const rawText = $temp.text();
            
            // Create a container for the output
            const outputId = 'typing-' + Math.floor(Math.random() * 10000);
            originalEcho.call(term, '<span id="' + outputId + '"></span>', { raw: true });
            
            const $output = $('#' + outputId);
            let currentText = '';
            let charIndex = 0;
            
            // Function to update the output with the current text
            function updateOutput() {
                // Replace the content with the current text
                $output.html(currentText);
                
                // Scroll to the bottom if needed
                if (options.scrollOnEcho !== false) {
                    term.scroll_to_bottom();
                }
            }
            
            // Function to type the next character
            function typeNextChar() {
                if (charIndex >= text.length) {
                    // We're done typing
                    setTimeout(resolve, finalDelay);
                    return;
                }
                
                // Get the next character
                const char = text.charAt(charIndex);
                currentText += char;
                charIndex++;
                
                // Update the output
                updateOutput();
                
                // Play typing sound if available
                if (window.TerminalSounds && typeof window.TerminalSounds.playKeySound === 'function') {
                    // Only play sound for visible characters
                    if (char.trim() !== '' && !char.startsWith('[') && !char.startsWith(']')) {
                        window.TerminalSounds.playKeySound();
                    }
                }
                
                // Schedule the next character
                setTimeout(typeNextChar, delay);
            }
            
            // Start typing
            typeNextChar();
        });
    };
    
    // Override the echo method to add typing animation
    $.fn.terminal.prototype.echo = function(text, options = {}) {
        // If animation is disabled or this is raw HTML, use the original echo
        if (options.animation === false || options.raw || !text) {
            return originalEcho.call(this, text, options);
        }
        
        // Use the typewrite method for animation
        return this.typewrite(text, options);
    };
})(jQuery);
