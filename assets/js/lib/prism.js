/**
 * Prism.js integration with jQuery Terminal
 * 
 * This file provides syntax highlighting for the terminal using Prism.js
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery.terminal', 'prismjs'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery, Terminal, Prism) {
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
            if (Prism === undefined) {
                Prism = require('prismjs');
            }
            factory(jQuery, Terminal, Prism);
            return jQuery;
        };
    } else {
        // Browser
        factory(jQuery, $.terminal, Prism);
    }
})(function($, Terminal, Prism) {
    if (!Prism) {
        throw new Error('Prism.js not found');
    }

    // Add terminal formatting output for Prism
    var orig_wrap = Prism.Token.prototype.wrap;
    Prism.Token.prototype.wrap = function(env, content) {
        if (typeof content === 'string') {
            if (env.type === 'comment') {
                content = '[[;#6a9955;]' + content + ']';
            } else if (env.type === 'string') {
                content = '[[;#ce9178;]' + content + ']';
            } else if (env.type === 'keyword') {
                content = '[[;#569cd6;]' + content + ']';
            } else if (env.type === 'function') {
                content = '[[;#dcdcaa;]' + content + ']';
            } else if (env.type === 'number') {
                content = '[[;#b5cea8;]' + content + ']';
            } else if (env.type === 'operator') {
                content = '[[;#d4d4d4;]' + content + ']';
            } else if (env.type === 'punctuation') {
                content = '[[;#d4d4d4;]' + content + ']';
            } else if (env.type === 'property') {
                content = '[[;#9cdcfe;]' + content + ']';
            } else if (env.type === 'tag') {
                content = '[[;#569cd6;]' + content + ']';
            } else if (env.type === 'selector') {
                content = '[[;#d7ba7d;]' + content + ']';
            } else if (env.type === 'attr-name') {
                content = '[[;#9cdcfe;]' + content + ']';
            } else if (env.type === 'attr-value') {
                content = '[[;#ce9178;]' + content + ']';
            } else if (env.type === 'regex') {
                content = '[[;#d16969;]' + content + ']';
            } else if (env.type === 'boolean') {
                content = '[[;#569cd6;]' + content + ']';
            } else if (env.type === 'builtin') {
                content = '[[;#4ec9b0;]' + content + ']';
            } else if (env.type === 'class-name') {
                content = '[[;#4ec9b0;]' + content + ']';
            } else if (env.type === 'constant') {
                content = '[[;#4fc1ff;]' + content + ']';
            } else if (env.type === 'symbol') {
                content = '[[;#f8c555;]' + content + ']';
            } else if (env.type === 'important') {
                content = '[[;#569cd6;]' + content + ']';
            } else if (env.type === 'atrule') {
                content = '[[;#c586c0;]' + content + ']';
            } else if (env.type === 'url') {
                content = '[[;#9cdcfe;]' + content + ']';
            }
        }
        return orig_wrap.call(this, env, content);
    };

    // Function to highlight code using Prism
    $.terminal.prism = function(language, code) {
        if (!Prism.languages[language]) {
            // If language not found, try to load it
            try {
                require('prismjs/components/prism-' + language);
            } catch (e) {
                // If can't load, return unmodified code
                return code;
            }
        }
        
        if (Prism.languages[language]) {
            return Prism.highlight(code, Prism.languages[language], language);
        }
        return code;
    };

    // Helper function to enable syntax highlighting
    $.terminal.syntax = function(language) {
        if (typeof language === 'string') {
            $.terminal.defaults.formatters.push(function(string) {
                return $.terminal.prism(language, string);
            });
        } else if (Array.isArray(language)) {
            language.forEach(function(lang) {
                $.terminal.syntax(lang);
            });
        }
    };
});
