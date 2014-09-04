/*
* grunt-envconfig
* https://github.com/martin.palmieri/envconfig
*
* Copyright (c) 2014 Martin Palmieri
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    
    var path = require('path');
    var fs = require('fs');

    grunt.registerMultiTask('envconfig', 'Create a file structure to override environment specific settings', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        this.searchPath = [path.dirname(options.file)];
        this.content = fs.readFileSync(options.file).toString();

        this.templ = grunt.template.process(this.content, this.data)

        grunt.log.writeln(this.templ);
        grunt.file.write(options.file, this.templ)

        //grunt.log.writeln(grunt.option('env'))

        // Iterate over all specified file groups.
        /*this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).                
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator));

            // Handle options.
            src += options.punctuation;

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });*/
    });
};
