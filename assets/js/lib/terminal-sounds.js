/**
 * Terminal Sounds for jQuery Terminal
 *
 * This file provides keyboard sound effects for the terminal
 */

// Create a global object to manage terminal sounds
window.TerminalSounds = (function() {
    // Create audio elements for each sound
    const keySoundElement1 = document.createElement('audio');
    keySoundElement1.src = 'assets/sounds/key1.mp3';
    keySoundElement1.preload = 'auto';

    const keySoundElement2 = document.createElement('audio');
    keySoundElement2.src = 'assets/sounds/key2.mp3';
    keySoundElement2.preload = 'auto';

    const returnSoundElement = document.createElement('audio');
    returnSoundElement.src = 'assets/sounds/return.mp3';
    returnSoundElement.preload = 'auto';

    const backspaceSoundElement = document.createElement('audio');
    backspaceSoundElement.src = 'assets/sounds/backspace.mp3';
    backspaceSoundElement.preload = 'auto';

    // Add elements to the DOM
    document.body.appendChild(keySoundElement1);
    document.body.appendChild(keySoundElement2);
    document.body.appendChild(returnSoundElement);
    document.body.appendChild(backspaceSoundElement);

    // Flag to enable/disable sounds
    let soundEnabled = true;

    // Function to play a sound with a specific element
    function playSound(element) {
        if (!soundEnabled) return;

        try {
            // Stop and reset the sound
            element.pause();
            element.currentTime = 0;

            // Play the sound
            const playPromise = element.play();

            // Handle play promise (required for Chrome)
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Sound playback failed:', error);
                });
            }
        } catch (e) {
            console.log('Error playing sound:', e);
        }
    }

    // Function to play a random key sound
    function playKeySound() {
        // Randomly choose between key1 and key2
        const element = Math.random() < 0.5 ? keySoundElement1 : keySoundElement2;
        playSound(element);
    }

    // Function to play the return/enter sound
    function playReturnSound() {
        playSound(returnSoundElement);
    }

    // Function to play the backspace sound
    function playBackspaceSound() {
        playSound(backspaceSoundElement);
    }

    // Initialize the keyboard event listeners
    function initKeyboardSounds() {
        // Add keydown event to play sounds
        document.addEventListener('keydown', function(e) {
            // Enter key
            if (e.key === 'Enter') {
                playReturnSound();
            }
            // Backspace key
            else if (e.key === 'Backspace') {
                playBackspaceSound();
            }
            // Other keys (only for printable characters)
            else if (
                (e.key.length === 1) || // Single character keys
                (e.key === 'Space') ||  // Space key
                (e.key === 'Tab')       // Tab key
            ) {
                playKeySound();
            }
        });

        // Also handle terminal input specifically
        if (typeof jQuery !== 'undefined') {
            jQuery(document).on('keydown', '.cmd-cursor', function(e) {
                // This is a more direct way to capture terminal input
                if (e.key === 'Enter') {
                    playReturnSound();
                } else if (e.key === 'Backspace') {
                    playBackspaceSound();
                } else if (e.key.length === 1) {
                    playKeySound();
                }
            });
        }
    }

    // Initialize when the document is ready
    if (document.readyState === 'complete') {
        initKeyboardSounds();
    } else {
        window.addEventListener('load', initKeyboardSounds);
    }

    // Public API
    return {
        enable: function() {
            soundEnabled = true;
            console.log('Terminal sounds enabled');
            return true;
        },
        disable: function() {
            soundEnabled = false;
            console.log('Terminal sounds disabled');
            return false;
        },
        toggle: function() {
            soundEnabled = !soundEnabled;
            console.log('Terminal sounds ' + (soundEnabled ? 'enabled' : 'disabled'));
            return soundEnabled;
        },
        isEnabled: function() {
            return soundEnabled;
        },
        playTest: function() {
            // Play a test sound to verify everything is working
            playKeySound();
            setTimeout(playReturnSound, 300);
            setTimeout(playBackspaceSound, 600);
            return true;
        }
    };
})();

// Add compatibility with jQuery Terminal
(function($) {
    if (typeof $ === 'undefined' || typeof $.terminal === 'undefined') {
        console.warn('jQuery Terminal not found. Sound toggle command may not work.');
        return;
    }

    // Add methods to control sound via jQuery Terminal
    $.terminal.sound = {
        enable: function() {
            return window.TerminalSounds.enable();
        },
        disable: function() {
            return window.TerminalSounds.disable();
        },
        toggle: function() {
            return window.TerminalSounds.toggle();
        },
        isEnabled: function() {
            return window.TerminalSounds.isEnabled();
        },
        playTest: function() {
            return window.TerminalSounds.playTest();
        }
    };
})(jQuery);
