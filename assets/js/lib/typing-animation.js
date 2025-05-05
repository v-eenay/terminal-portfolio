/**
 * Typing Animation for jQuery Terminal
 *
 * This file provides typing animation and sound effects for the terminal
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

    // Override the original echo method to add typing animation
    const originalEcho = $.fn.terminal.prototype.echo;

    $.fn.terminal.prototype.echo = function(text, options) {
        // If animation is disabled or this is raw HTML, use the original echo
        if (options && (options.raw || options.animation === false)) {
            return originalEcho.call(this, text, options);
        }

        // Default animation speed (characters per second)
        const speed = (options && options.typingSpeed) || 50;

        // Create a deferred object to handle the animation completion
        const deferred = $.Deferred();

        // If text is a function, get its value
        const textContent = typeof text === 'function' ? text() : text;

        // If text is empty, just call the original echo
        if (!textContent) {
            originalEcho.call(this, textContent, options);
            deferred.resolve();
            return deferred.promise();
        }

        // Create a new options object without animation to avoid recursion
        const newOptions = Object.assign({}, options || {}, { animation: false });

        // For a simpler and more reliable approach, we'll animate character by character
        // by echoing each character with a delay

        // First, create a div to hold the content temporarily
        const $temp = $('<div>').html(textContent);

        // Get the full text content (this will include formatting)
        const fullContent = $temp.html();

        // Create a function to handle the animation
        const term = this;
        let currentText = '';
        let charIndex = 0;

        // Function to add the next character
        const addNextChar = () => {
            // If we've reached the end of the text, resolve the promise
            if (charIndex >= fullContent.length) {
                // Clear the line and echo the full content to ensure proper formatting
                term.last_index();
                term.update(-1, '');
                originalEcho.call(term, textContent, newOptions);
                deferred.resolve();
                return;
            }

            // Get the next character
            const nextChar = fullContent.charAt(charIndex);
            currentText += nextChar;
            charIndex++;

            // Play typing sound
            if (nextChar.trim() !== '') {
                playTypingSound();
            }

            // Update the last line with the current text
            if (charIndex === 1) {
                // First character, use original echo
                originalEcho.call(term, currentText, newOptions);
            } else {
                // Update the last line
                term.last_index();
                term.update(-1, currentText);
            }

            // Schedule the next character
            setTimeout(addNextChar, 1000 / speed);
        };

        // Start the animation
        addNextChar();

        return deferred.promise();
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

    // Add a command to toggle sound
    $.terminal.defaults.toggleSoundCommand = function() {
        const enabled = $.terminal.toggleSound();
        this.echo(`Sound effects ${enabled ? 'enabled' : 'disabled'}.`);
    };
});
