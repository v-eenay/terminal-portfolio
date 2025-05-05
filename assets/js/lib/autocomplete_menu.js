/**
 * jQuery Terminal Autocomplete Menu
 *
 * This plugin adds a dropdown menu for tab completion in jQuery Terminal
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
    // Store the original complete method
    var original_complete = $.terminal.defaults.completion;

    // Create a menu element for autocomplete
    function createMenu(term, completions, descriptions) {
        // Remove any existing menu
        $('.terminal-autocomplete-menu').remove();

        // If no completions, don't create a menu
        if (!completions || completions.length === 0) {
            return;
        }

        // Create the menu element
        var $menu = $('<div class="terminal-autocomplete-menu"></div>');

        // Add each completion as an item
        completions.forEach(function(completion, index) {
            var description = descriptions && descriptions[completion] ? descriptions[completion] : '';
            var $item = $('<div class="terminal-autocomplete-item"></div>')
                .text(completion)
                .attr('data-completion', completion);

            // Add description if available
            if (description) {
                $item.append($('<span class="description"></span>').text(description));
            }

            // Add to menu
            $menu.append($item);
        });

        // Position the menu below the cursor
        var offset = term.offset();
        var position = term.cmd().position();

        $menu.css({
            position: 'absolute',
            top: offset.top + term.height() / 2,
            left: offset.left + position * term.char_width()
        });

        // Add to body
        $('body').append($menu);

        // Add click handlers
        $menu.on('click', '.terminal-autocomplete-item', function() {
            var completion = $(this).attr('data-completion');
            term.insert(completion);
            $menu.remove();
            term.focus();
        });

        // Add keyboard navigation
        var selectedIndex = 0;
        $menu.find('.terminal-autocomplete-item').eq(selectedIndex).addClass('selected');

        term.on('keydown.autocomplete', function(e) {
            // Arrow down
            if (e.which === 40) {
                selectedIndex = (selectedIndex + 1) % completions.length;
                $menu.find('.terminal-autocomplete-item').removeClass('selected')
                    .eq(selectedIndex).addClass('selected');
                return false;
            }
            // Arrow up
            else if (e.which === 38) {
                selectedIndex = (selectedIndex - 1 + completions.length) % completions.length;
                $menu.find('.terminal-autocomplete-item').removeClass('selected')
                    .eq(selectedIndex).addClass('selected');
                return false;
            }
            // Enter or Tab
            else if (e.which === 13 || e.which === 9) {
                var completion = $menu.find('.terminal-autocomplete-item.selected').attr('data-completion');
                term.insert(completion);
                $menu.remove();
                term.off('keydown.autocomplete');
                return false;
            }
            // Escape
            else if (e.which === 27) {
                $menu.remove();
                term.off('keydown.autocomplete');
                return false;
            }
        });

        // Remove menu when terminal loses focus
        term.on('blur.autocomplete', function() {
            $menu.remove();
            term.off('keydown.autocomplete blur.autocomplete');
        });
    }

    // Create a custom completion function that will be used instead of overriding the default
    $.terminal.autocomplete_menu = function(term, command, callback) {
        // Only show menu on tab press, not automatically
        if (!term.data('tab_pressed')) {
            callback([]);
            return;
        }

        // Get command descriptions from the command database
        var descriptions = {};
        if ($.terminal.updateCompletionDatabase) {
            var commandDatabase = $.terminal.commandDatabase || {};
            Object.keys(commandDatabase).forEach(function(cmd) {
                descriptions[cmd] = commandDatabase[cmd].description || '';
            });
        }

        // Call the original completion method
        if (typeof original_complete === 'function') {
            original_complete.call(this, term, command, function(completions) {
                if (completions && completions.length > 0) {
                    // Create the menu with completions
                    createMenu(term, completions, descriptions);
                }

                // Call the original callback
                callback(completions);

                // Reset tab pressed flag
                term.data('tab_pressed', false);
            });
        } else if (Array.isArray(original_complete)) {
            // Filter completions based on command
            var completions = original_complete.filter(function(item) {
                return item.indexOf(command) === 0;
            });

            if (completions && completions.length > 0) {
                // Create the menu with completions
                createMenu(term, completions, descriptions);
            }

            // Call the callback
            callback(completions);

            // Reset tab pressed flag
            term.data('tab_pressed', false);
        } else {
            callback([]);
            term.data('tab_pressed', false);
        }
    };

    // Add a keydown handler to detect tab key press
    $(document).on('keydown', function(e) {
        if (e.which === 9) { // Tab key
            var term = $.terminal.active();
            if (term) {
                term.data('tab_pressed', true);
            }
        }
    });
});
