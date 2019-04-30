const path = require('path');
const compiler = require('../src/compiler');

describe('compiler', () => {

    test('empty Markdown file', () => {
        const source = '';
        const options = {
            template: path.resolve(__dirname, '../src/template.hbs')
        };
        const res = compiler(source, options);
        
        expect(res.length).toBeGreaterThan(0);
    });

    test('Markdown file with 2 pages', () => {
        const source = '# Section A\n\nLorem ipsum dolor sit\n\n\n\n# Section B\n\nLorem ipsum dolor sit';
        const options = {
            template: path.resolve(__dirname, '../src/template.hbs')
        };
        const res = compiler(source, options);
        const pages = res.match(/\btabs\-title\b/gm).length;
        
        expect(pages).toBe(2);
    });

    test('Markdown file with sub heading', () => {
        const source = '# Section\n\n## Sub Section';
        const options = {
            template: path.resolve(__dirname, '../src/template.hbs'),
            includeSubheadings: true
        };
        const res = compiler(source, options);
        const subHeading = res.match(/(<h2.*?>(.*?)<\/h2>)/);
        
        expect(subHeading).not.toBeNull();
    });
});