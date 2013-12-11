module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['public_html/js/app/**/*.js']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
};