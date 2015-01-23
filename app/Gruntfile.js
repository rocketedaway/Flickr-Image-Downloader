var LIVERELOAD_PORT = 35729,
	SERVER_PORT = 9000;

var connectLiveReload = require('connect-livereload')({port: LIVERELOAD_PORT}),
	mountFolder = function (connect, dir) {
	    return connect.static(require('path').resolve(dir));
	};

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
                nospawn: true,
                livereload: true
            },
			sass: {
				files: ['scss/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: [
					'*.html', 
					'js/**/*.{js,json}', 
					'css/*.css',
					'images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				],
				options: {
					livereload: LIVERELOAD_PORT
				}
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed',
				includePaths: require('node-bourbon').includePaths,
				includePaths: require('node-neat').includePaths
			},
			dist: {
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},
		connect: {
            options: {
                port: SERVER_PORT,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connectLiveReload,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
	});
	grunt.registerTask('serve', function () {
        grunt.task.run([
            'connect:livereload',
            'open:server',
            'sass:dist',
            'watch'
        ]);
    });
};
