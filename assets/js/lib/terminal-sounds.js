/**
 * Terminal Sounds for jQuery Terminal
 * 
 * This file provides keyboard sound effects for the terminal
 */

(function($) {
    // Sound objects
    const keySound1 = new Audio('assets/sounds/key1.mp3');
    const keySound2 = new Audio('assets/sounds/key2.mp3');
    const returnSound = new Audio('assets/sounds/return.mp3');
    const backspaceSound = new Audio('assets/sounds/backspace.mp3');
    
    // Flag to enable/disable sounds
    let soundEnabled = true;
    
    // Function to play a random key sound
    function playKeySound() {
        if (!soundEnabled) return;
        
        // Randomly choose between key1 and key2
        const sound = Math.random() < 0.5 ? keySound1 : keySound2;
        
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
            console.log("Return sound playback failed:", e);
        });
    }
    
    // Function to play the backspace sound
    function playBackspaceSound() {
        if (!soundEnabled) return;
        
        backspaceSound.currentTime = 0;
        backspaceSound.play().catch(e => {
            // Ignore errors
            console.log("Backspace sound playback failed:", e);
        });
    }
    
    // Add keydown event to play sounds
    $(document).on('keydown', function(e) {
        // Only play sounds if the terminal is focused
        const term = $('.terminal');
        if (!term.length || !term.is(':focus')) return;
        
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
            playKeySound();
        }
    });
    
    // Add methods to control sound
    $.terminal.sound = {
        enable: function() {
            soundEnabled = true;
            return soundEnabled;
        },
        disable: function() {
            soundEnabled = false;
            return soundEnabled;
        },
        toggle: function() {
            soundEnabled = !soundEnabled;
            return soundEnabled;
        },
        isEnabled: function() {
            return soundEnabled;
        }
    };
})(jQuery);
