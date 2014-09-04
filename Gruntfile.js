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
            qa: {
                data: {
                    hammer_dom: true,
                    force_desktop: true,
                    show_app_switcher: false,
                    headerContainer: '.identity_bar',
                    mmdbHost: 'https://mmdb.nationalgeographic.com',
                    memcenHost: 'https://members.nationalgeographic.com',
                    notificationsHost:
                        'https://notifications-uat.nationalgeographic.com',
                    notificationsKey:
                        '2dfca6e94df5b053b0264e1a0a5a4d46a31507d57e6200cb3d',
                    crossDomain: true,
                    noSSL: false,
                    staticMedia: 'mc.dev.nationalgeographic.com:8010/static-media/ngs-header/',
                    refreshOnLogin: true,
                    refreshOnLogout: true,
                    serverSideLogin: false,
                    debug: true,
                    debug_lvl: 5,
                    alertContainerSelector: 'header nav',
                    gigyaKey:
                        '3_LOaUF9fHrs7lFHW7YFFA22qD6MhVsbO_bpqkn6nnKj9-AbGRsec864eKWqmR2Jdu',
                    gigyaConfig:{
                        enabledProviders: 'facebook',
                        autoLogin: true,
                    }
                },
                options: {
                    file: '.tmp/scripts/registration.js'
                }
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
