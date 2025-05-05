/**
 * Simple Typing Animation for jQuery Terminal
 * 
 * This file provides a simpler typing animation that works better with jQuery Terminal
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery.terminal'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery, Terminal) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            if (Terminal === undefined) {
                Terminal = require('jquery.terminal');
            }
            factory(jQuery, Terminal);
            return jQuery;
        };
    } else {
        // Browser
        factory(jQuery, $.terminal);
    }
})(function($, Terminal) {
    // Audio objects for typing sounds
    const typingSounds = [
        new Audio('assets/sounds/key1.mp3'),
        new Audio('assets/sounds/key2.mp3'),
        new Audio('assets/sounds/key3.mp3'),
        new Audio('assets/sounds/key4.mp3')
    ];
    
    // Audio for return/enter key
    const returnSound = new Audio('assets/sounds/return.mp3');
    
    // Audio for backspace key
    const backspaceSound = new Audio('assets/sounds/backspace.mp3');
    
    // Flag to enable/disable sounds
    let soundEnabled = true;
    
    // Function to play a random typing sound
    function playTypingSound() {
        if (!soundEnabled) return;
        
        // Pick a random sound from the array
        const randomIndex = Math.floor(Math.random() * typingSounds.length);
        const sound = typingSounds[randomIndex];
        
        // Reset the sound to the beginning (in case it's still playing)
        sound.currentTime = 0;
        
        // Play the sound
        sound.play().catch(e => {
            // Ignore errors - browsers may block autoplay
            console.log("Sound playback blocked. Enable sound by interacting with the page first.");
        });
    }
    
    // Function to play the return/enter sound
    function playReturnSound() {
        if (!soundEnabled) return;
        
        returnSound.currentTime = 0;
        returnSound.play().catch(e => {
            // Ignore errors
        });
    }
    
    // Function to play the backspace sound
    function playBackspaceSound() {
        if (!soundEnabled) return;
        
        backspaceSound.currentTime = 0;
        backspaceSound.play().catch(e => {
            // Ignore errors
        });
    }
    
    // Add a typing animation function to the terminal
    $.fn.terminal.prototype.typing = function(text, options = {}) {
        const term = this;
        const delay = options.delay || 30; // milliseconds between characters
        
        // If text is a function, get its value
        const content = typeof text === 'function' ? text() : text;
        
        // If content is empty, do nothing
        if (!content) return Promise.resolve();
        
        // Create a promise to track completion
        return new Promise((resolve) => {
            // Split the content by lines to handle multi-line text
            const lines = content.split('\n');
            let lineIndex = 0;
            let charIndex = 0;
            
            // Function to type the next character
            function typeNextChar() {
                // If we've finished all lines, resolve the promise
                if (lineIndex >= lines.length) {
                    resolve();
                    return;
                }
                
                // Get the current line
                const line = lines[lineIndex];
                
                // If we've finished the current line
                if (charIndex >= line.length) {
                    // Move to the next line
                    lineIndex++;
                    charIndex = 0;
                    
                    // If there are more lines, echo a newline
                    if (lineIndex < lines.length) {
                        term.echo('');
                    }
                    
                    // Continue with the next character
                    typeNextChar();
                    return;
                }
                
                // Get the next character
                const char = line[charIndex];
                
                // Play typing sound for non-whitespace characters
                if (char.trim() !== '') {
                    playTypingSound();
                }
                
                // If this is the first character of the line, echo it
                if (charIndex === 0) {
                    term.echo(char, { animation: false });
                } else {
                    // Otherwise, append it to the current line
                    const lastIndex = term.last_index();
                    const currentText = term.get_line(lastIndex);
                    term.update(lastIndex, currentText + char);
                }
                
                // Increment the character index
                charIndex++;
                
                // Schedule the next character
                setTimeout(typeNextChar, delay);
            }
            
            // Start typing
            typeNextChar();
        });
    };
    
    // Add a method to type formatted text
    $.fn.terminal.prototype.typingFormatted = function(text, options = {}) {
        const term = this;
        const delay = options.delay || 30; // milliseconds between characters
        
        // If text is a function, get its value
        const content = typeof text === 'function' ? text() : text;
        
        // If content is empty, do nothing
        if (!content) return Promise.resolve();
        
        // Create a promise to track completion
        return new Promise((resolve) => {
            // Parse the formatted text to get formatting and text segments
            const segments = $.terminal.parse_formatting(content);
            let segmentIndex = 0;
            let charIndex = 0;
            
            // Function to type the next character
            function typeNextChar() {
                // If we've finished all segments, resolve the promise
                if (segmentIndex >= segments.length) {
                    resolve();
                    return;
                }
                
                // Get the current segment
                const segment = segments[segmentIndex];
                const text = segment.text;
                const format = segment.format;
                
                // If we've finished the current segment
                if (charIndex >= text.length) {
                    // Move to the next segment
                    segmentIndex++;
                    charIndex = 0;
                    
                    // Continue with the next character
                    typeNextChar();
                    return;
                }
                
                // Get the next character
                const char = text[charIndex];
                
                // Play typing sound for non-whitespace characters
                if (char.trim() !== '') {
                    playTypingSound();
                }
                
                // Format the character with the segment's formatting
                const formattedChar = format ? 
                    '[[' + format + ']' + char + ']' : 
                    char;
                
                // If this is the first character, echo it
                if (segmentIndex === 0 && charIndex === 0) {
                    term.echo(formattedChar, { animation: false });
                } else {
                    // Otherwise, append it to the current line
                    const lastIndex = term.last_index();
                    const currentLine = term.get_line(lastIndex);
                    
                    // Handle newlines
                    if (char === '\n') {
                        term.echo('');
                    } else {
                        term.update(lastIndex, currentLine + formattedChar);
                    }
                }
                
                // Increment the character index
                charIndex++;
                
                // Schedule the next character
                setTimeout(typeNextChar, delay);
            }
            
            // Start typing
            typeNextChar();
        });
    };
    
    // Add keydown event to play sounds
    $(document).on('keydown', function(e) {
        // Only play sounds if the terminal is focused
        const term = $.terminal.active();
        if (!term || !term.enabled()) return;
        
        // Enter key
        if (e.which === 13) {
            playReturnSound();
        }
        // Backspace key
        else if (e.which === 8) {
            playBackspaceSound();
        }
        // Other keys (only for printable characters)
        else if (
            (e.which >= 32 && e.which <= 126) || // Standard ASCII printable chars
            (e.which >= 186 && e.which <= 222)   // Special chars like ;=,-./` etc.
        ) {
            playTypingSound();
        }
    });
    
    // Add methods to control sound
    $.terminal.toggleSound = function(enable) {
        if (enable === undefined) {
            soundEnabled = !soundEnabled;
        } else {
            soundEnabled = !!enable;
        }
        return soundEnabled;
    };
});
