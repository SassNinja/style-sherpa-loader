# Style Sherpa

[![Npm Version](https://badge.fury.io/js/style-sherpa-loader.svg)](https://www.npmjs.com/package/style-sherpa-loader) 
[![Month Downloads](https://img.shields.io/npm/dm/style-sherpa-loader.svg)](http://npm-stat.com/charts.html?package=style-sherpa-loader)

This webpack loader converts a single Style Sherpa Markdown file to a pre-made HTML template with tabbed sections as your style guide. The template is powered by [Foundation for Sites](http://foundation.zurb.com) and compiled with [Handlebars](https://handlebarsjs.com/).

# Installation

Simply install the package with your prefered package manager.

- npm
```bash
npm install style-sherpa-loader --save-dev
```

- yarn
```bash
yarn add style-sherpa-loader --dev
```

**Note:** it's not necessary to install the `style-sherpa` package itself as it's already part of the loader

## Getting Started

First you need to create an entry point for your style guide (e.g. `styleguide.js`) that imports a Mardown file (and any other stuff you need such as CSS).
Then create a single Markdown file (e.g. `styleguide.md`) where all of your style guide lives in.

Your style guide is divided into sections. Sections are titled with a Markdown heading, which is a single hash mark. To create new sections add **four** line breaks.
For further information about Style Sherpa and how to write content for your style guide, please read the [official docs](https://foundation.zurb.com/sites/docs/style-sherpa.html).

**styleguide.js**

```javascript
import `./styleguide.md`;
```

**styleguide.md**

```
# Buttons

Lorem ipsum dolor sit amet, **consectetur adipisicing** elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.




# Forms

Lorem ipsum dolor sit amet, `<form>` elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

## Webpack Setup

Add your style guide entry point and the loader to your webpack config.

```javascript
module.exports = {
    entry: {
        styleguide: './path/to/your/styleguide.js'
    }
    module: {
        rules: [
            {
                test: /styleguide\.md$/,
                use: [
                    {
                        loader: 'style-sherpa-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};
```

## Options

The following loader options are available.

### template

By default Style Sherpa uses a Handlebars template which is extended by your Markdown file.
If you wanna customize it you can override the default one with your own template file.

```javascript
{
    loader: 'style-sherpa-loader',
    options: {
        template: path.resolve('path/to/your/template.hbs')
    }
}
```

**Tip:** if your template is located in the same directory as your Markdown file you can set the option `template` to `[path]template.html` to use it (all tokens of [interpolateName](https://github.com/webpack/loader-utils#interpolatename) are supported)

## Contribution

If you find any bug or miss a feature just create an issue or a PR to do the job.

**And last but not least, if you like this loader please give it a star on github and share it!**