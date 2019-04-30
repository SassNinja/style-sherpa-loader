const path = require('path');
const { getOptions, interpolateName } = require('loader-utils');
const compile = require('./compiler');

module.exports = function(source) {

    const cb = this.async();
    const options = Object.assign({
        template: path.resolve(__dirname, 'template.hbs')
    }, getOptions(this));

    if (options.template.match(/\[\w+\]/)) {
        options.template = interpolateName(this, options.template, {});
    }

    this.addDependency(options.template);

    cb(null, compile(source, options));
};