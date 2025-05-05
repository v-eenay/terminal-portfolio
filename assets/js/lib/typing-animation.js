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
        
        // Create a temporary div to hold the text
        const $temp = $('<div>').html(textContent);
        
        // Get the text nodes and their parent elements
        const textNodes = [];
        
        function getTextNodes(node) {
            if (node.nodeType === 3) { // Text node
                textNodes.push({
                    node: node,
                    parent: node.parentNode
                });
            } else if (node.nodeType === 1) { // Element node
                for (let i = 0; i < node.childNodes.length; i++) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }
        
        getTextNodes($temp[0]);
        
        // Replace text nodes with empty strings
        textNodes.forEach(item => {
            item.originalText = item.node.nodeValue;
            item.node.nodeValue = '';
        });
        
        // Echo the empty structure first
        originalEcho.call(this, $temp.html(), options);
        
        // Get the last line element
        const $lastLine = this.find('.terminal-output > div:last-child');
        
        // Animate each text node
        let currentNodeIndex = 0;
        let currentCharIndex = 0;
        
        const animateNextChar = () => {
            if (currentNodeIndex >= textNodes.length) {
                deferred.resolve();
                return;
            }
            
            const currentNode = textNodes[currentNodeIndex];
            const originalText = currentNode.originalText;
            
            if (currentCharIndex >= originalText.length) {
                currentNodeIndex++;
                currentCharIndex = 0;
                animateNextChar();
                return;
            }
            
            // Add the next character
            currentNode.node.nodeValue = originalText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            // Play typing sound
            playTypingSound();
            
            // Schedule the next character
            setTimeout(animateNextChar, 1000 / speed);
        };
        
        // Start the animation
        animateNextChar();
        
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
