const format = require('string-template');
const hljs = require('highlight.js');
const marked = require('marked');

const renderer = new marked.Renderer();

// Prevents Marked from adding an ID to headings
renderer.heading = function(text, level) {
    return format('<h{1}>{0}</h{1}>', [text, level]);
};

// Allows for the creation of HTML examples and live code in one snippet
renderer.code = function(code, language = 'html') {
    
    let extraOutput = '';

    // If the language is *_example, live code will print out along with the sample
    if (language.match(/_example$/)) {
        extraOutput = format('\n\n<div class="ss-code-live">{0}</div>', [code]);
        language = language.replace(/_example$/, '');
    }

    const renderedCode = hljs.highlight(language, code).value;
    const output = format('<div class="ss-code"><pre><code class="{0}">{1}</code></pre></div>', [language, renderedCode]);

    return output + extraOutput;
};

module.exports = renderer;