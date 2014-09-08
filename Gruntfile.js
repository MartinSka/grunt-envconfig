/*
 * grunt-envconfig
 * https://github.com/martin.palmieri/envconfig
 *
 * Copyright (c) 2014 Martin Palmieri
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        envconfig: {
            all: {                
                options: {
                    defaultenv: 'dev',
                    override: ['autoInit', 'render']
                },
                qa: {
                    files:[{
                        src: '.tmp/scripts/registration.js',
                        data: {
                            hammer_dom: 'true QA',
                            gigyaConfig: {
                                enabledProviders: 'facebook QA',
                                autoLogin: 'true QA',
                            }
                        }
                    },{
                        src: '.tmp/scripts/globalNav.js',
                        data: {
                            autoInit: 'true QA',
                            render: 'true QA'
                        }
                    }]
                },
                dev: {
                    files:[{
                        src: '.tmp/scripts/registration2.js',
                        dest: '.tmp/scripts/registration.js',
                        data: {
                            hammer_dom: 'true DEV',
                            gigyaConfig: {
                                enabledProviders: 'facebook DEV',
                                autoLogin: true,
                            }
                        }
                    },{
                        src: '.tmp/scripts/globalNav2.js',
                        dest: '.tmp/scripts/globalNav.js',
                        data: {
                            autoInit: true,
                            render: true
                        }
                    }]
                },
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'envconfig', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
