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
        var options = this.options({
                override: []
            }),
            env = grunt.option('env') || options.defaultenv,
            envdata = this.data[env];

        if (envdata === undefined) {
            grunt.warn('An environment is required');
        }

        // Iterate over all src files.
        envdata.files.forEach(function(f) {
            var dest = f.dest || f.src,
                content, templ;

            if (!grunt.file.exists(f.src)) {
                grunt.warn('Source file "' + f.src + '" not found.');
            }
            
            overrideValues(f.data, options.override);

            content = grunt.file.read(f.src);
            templ = grunt.template.process(content, f);
            
            //Parse string to boolean
            templ = templ.replace(/'\!true'/ig, true);
            templ = templ.replace(/'\!false'/ig, false);

            grunt.file.write(dest, templ)
        });

        // Print a success message.
        grunt.log.ok('All environment files created');


        /**
         * Override file.data settings with grunt CLI parameters
         *
         * @param {Object} data File data
         * @param {Object} override Options vars to override
         */
        function overrideValues(data, override) {
            override.forEach(function(i) {
                // If Grunt CLI parameters is an override option
                if (grunt.option(i) !== undefined) {
                    data[i] = grunt.option(i);
                }
            });
        }
    });
};
