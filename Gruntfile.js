module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '*',
                    keepalive: true,
                    debug: true,
                    // onCreateServer: function(server, connect, options) {
                    //     var io = require('socket.io').listen(server);
                    //     io.sockets.on('connection', function(socket) {
                    //     // do something with socket
                    //     });
                    // }
                }
            }
        },
        ts: {
            main: {
                src: ['src/**/*.ts','lib/**/*.ts'],
                out: "js/app.js"
            },
            options: {
                module: 'amd',
                fast: 'never',
                target: 'es5',
                declaration: false,
                sourceMap: false,
                removeComments: true,
                noImplicitAny: false
            }
        },
        removelogging: {
            dist: {
                src: "js/app.js",
                dest: "js/app-clean.js",
                options: {
                }
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            dev: {
                files: {
                'js/app.min.js': ['js/app.js']
                }
            },
            dist: {
                files: {
                'js/app.min.js': ['js/app-clean.js']
                }
            }
        },
        watch: {
            scripts: {
                files: 'src/**/*.ts',
                tasks: ['ts'],
                options: {
                    spawn: false,
                },
            },
        },
        open: {
            dev: {
                path: 'https://studysidescroller-venus6669.c9users.io'
            }
        }
    });
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.registerTask("default", ["connect","open","watch"]);
    grunt.registerTask('dev', ['ts','uglify:dev']);
    grunt.registerTask("dist", ["ts","removelogging","uglify:dist"]);
};