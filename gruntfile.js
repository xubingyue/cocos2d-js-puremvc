"use strict";

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        shell: {
            options: {
                stderr: true,
                stdout: true
            },
            build: {
                command: 'browserify main_dev.js -o main.js'
            },
            ios_debug: {
                command: ''
            },
            ios_release: {
                command: ''
            },
            android_debug: {
                command: ''
            },
            android_release: {
                command: ''
            }
        }
    });

    grunt.registerTask('build', '生成main.js文件', 'shell:build');
};