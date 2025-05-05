/**
 * Enhanced Tab Completion for jQuery Terminal
 *
 * This file provides enhanced tab completion functionality for the terminal
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
    // Command database for intelligent completion
    var commandDatabase = {
        // Base commands
        'help': {
            description: 'Show available commands',
            args: []
        },
        'about': {
            description: 'Display information about me',
            args: []
        },
        'skills': {
            description: 'List my technical skills',
            args: []
        },
        'tech': {
            description: 'Show my complete tech stack',
            args: []
        },
        'experience': {
            description: 'Display my work experience',
            args: []
        },
        'education': {
            description: 'Show my educational background',
            args: []
        },
        'projects': {
            description: 'List my projects',
            args: []
        },
        'contact': {
            description: 'Display my contact information',
            args: []
        },
        'clear': {
            description: 'Clear the terminal screen',
            args: []
        },
        'theme': {
            description: 'Change the terminal theme',
            args: ['dark', 'light']
        },
        'cv': {
            description: 'View my curriculum vitae',
            args: []
        },
        'download-cv': {
            description: 'Download my CV as PDF',
            args: []
        },
        'stats': {
            description: 'View GitHub statistics',
            args: []
        },
        'project': {
            description: 'View details of a specific project',
            args: ['1', '2', '3', '4', '5']
        }
    };

    // Function to get command suggestions based on input
    function getCommandSuggestions(input, commands) {
        var suggestions = [];
        var inputLower = input.toLowerCase();

        // If input is empty, return all commands
        if (!input) {
            return Object.keys(commands);
        }

        // Check for command matches
        for (var cmd in commands) {
            if (cmd.toLowerCase().indexOf(inputLower) === 0) {
                suggestions.push(cmd);
            }
        }

        return suggestions;
    }

    // Function to get argument suggestions based on command
    function getArgumentSuggestions(cmd, arg, commands) {
        if (!commands[cmd] || !commands[cmd].args || commands[cmd].args.length === 0) {
            return [];
        }

        var suggestions = [];
        var argLower = arg.toLowerCase();

        for (var i = 0; i < commands[cmd].args.length; i++) {
            var argument = commands[cmd].args[i];
            if (argument.toLowerCase().indexOf(argLower) === 0) {
                suggestions.push(argument);
            }
        }

        return suggestions;
    }

    // Main completion function
    $.terminal.completion = function(term, command, callback) {
        // Split command into parts
        var parts = command.split(' ');
        var cmd = parts[0];

        // If we're completing the command itself
        if (parts.length === 1) {
            callback(getCommandSuggestions(cmd, commandDatabase));
        }
        // If we're completing an argument
        else if (parts.length > 1) {
            var lastArg = parts[parts.length - 1];
            callback(getArgumentSuggestions(cmd, lastArg, commandDatabase));
        }
    };

    // Store the command database globally for other plugins to access
    $.terminal.commandDatabase = commandDatabase;

    // Function to update command database
    $.terminal.updateCompletionDatabase = function(newCommands) {
        $.extend(commandDatabase, newCommands);
    };
});
