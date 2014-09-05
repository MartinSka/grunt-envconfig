/*
* grunt-envconfig
* https://github.com/martin.palmieri/envconfig
*
* Copyright (c) 2014 Martin Palmieri
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {    
    grunt.registerMultiTask('envconfig', 'Create a file structure to override environment specific settings', function() {
        var options = this.options(),
            env = grunt.option('env') || options.defaultenv,
            envdata = this.data[env];

        // Copy similate generated file (Only for test now)
            grunt.file.copy('.tmp/scripts/registration2.js', '.tmp/scripts/registration.js');
            grunt.file.copy('.tmp/scripts/globalNav2.js', '.tmp/scripts/globalNav.js');

        // Iterate over all src-dest file pairs.
        envdata.files.forEach(function(f){            
            var content, templ;

            if (!grunt.file.exists(f.src)) {
                grunt.log.warn('Source file "' + f.src + '" not found.');
                return false;
            }
            
            content = grunt.file.read(f.src);
            changeValue(f, options);
            templ = grunt.template.process(content, f);

            grunt.file.write(f.src, templ)
        });

        // Print a success message.
        grunt.log.writeln('Success message');


        function changeValue(f, options) {
            options.individual.forEach(function(i) {
                if (grunt.option(i) !== undefined) {
                    f.data[i] = grunt.option(i);
                }
            });
        }
    });
};
