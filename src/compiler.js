/**
 * Compiler for the Markdown file of a Style Sherpa style guide.
 * Based on the original style-sherpa package, but refactored for usage as loader.
 */

const fs = require('fs');
const handlebars = require('handlebars');
const marked = require('marked');
const renderer = require('./renderer');

module.exports = function(source, options = {}) {

    // Read template file (default is same directory of markdown file)
    const templateFile = fs.readFileSync(options.template);

    // The divider for pages is four newlines
    let pages = source.toString().replace(/(?:\r\n)/mg, '\n').split('\n\n\n\n');

    // Process each page
    pages = pages.map(function(page, i) {

        // Convert Markdown to HTML
        let body = marked(page, { renderer: renderer });

        // Find the title of the page by identifying the <h1>
        // The second match is the inner group
        const foundHeadings = body.match('<h1.*>(.*)</h1>');
        const title = foundHeadings && foundHeadings[1] || 'Page ' + (i + 1);
        const anchor = title.toLowerCase().replace(/[^\w]+/g, '-');
        let subheadings = null;

        if (options.includeSubheadings) {
            const subheadRe = /(<h2.*?>(.*?)<\/h2>)/g;
            const foundSubheadings = [];
            let match;
            let i = 0;

            while ((match = subheadRe.exec(body)) !== null) {
                i = i + 1;
                const subTitle = match[2];
                const subAnchor = anchor + '-sub-' + i;
                foundSubheadings.push({title: subTitle, anchor: subAnchor, content: match[1]});
            }

            if (foundSubheadings.length) {
                subheadings = foundSubheadings.map(function(subheading) {
                    body = body.replace(subheading.content, '<section id="' + subheading.anchor +'"></section>' + subheading.content);

                    return {
                        title: subheading.title, 
                        anchor: subheading.anchor
                    };
                });
            }
        }

        const results = {
            title: title, 
            anchor: anchor, 
            body: body
        };
        if (subheadings) {
            results.subheadings = subheadings;
        }

        return results;
    });

    const template = handlebars.compile(templateFile.toString(), { noEscape: true });

    return template({ pages: pages });
};