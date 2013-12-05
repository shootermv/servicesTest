module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
	clean: {
	  build: {
		src: ["dist/ThingsToAdd.txt","dist/bugs.txt","dist/js/templates"]
	  }
	},		
	requirejs: {
	  compile: {
		options: {
		  appDir: 'serviceTest/',
		  baseUrl: 'js',
		  dir: 'dist',
		  name: 'config',
		  skipDirOptimize:true,
		  fileExclusionRegExp: /^(r|build)\.js$/,
		  excludeShallow: ['settings'],
		  mainConfigFile: 'serviceTest/js/config.js',
		  optimizeCss: 'standard',
		  removeCombined: true,
		  deps:["config","app"],
		  done: function(done, output) {
		     grunt.log.subhead('finished, cleaning...');
			 grunt.task.run('clean');
			 done();
		  }
		}
	  }
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "clean" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that provides the "requirejs" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  // Default task(s).
  
 
  // Default task(s).
  grunt.registerTask('default', ['requirejs']);
  
  //r build
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
};