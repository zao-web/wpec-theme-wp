module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			single_file: {
				src: 'style.css',
				dest: 'style.css'
			},
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					lineNumbers: false
				},
				files: {
					'style.css': 'style.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'autoprefixer'],
				options: {
					spawn: false,
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['sass', 'autoprefixer']);
};