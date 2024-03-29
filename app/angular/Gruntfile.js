// Generated on 2013-11-22 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var serveStatic = require('serve-static');  
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var modRewrite = require('connect-modrewrite');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    credentials: function() {

      if (grunt.file.exists('.credentials.json')) {
        return grunt.file.readJSON('.credentials.json');  // Read the file
      }

      return {  // Use values if there is no file called .credentials.json
        AwsAccessKeyId: 'not set',
        AwsSecretAccessKey: 'not set',
        GoogleAnalyticsKey: 'UA-8697059-6',
        GoogleAnalyticsHost: 'citrus-mist.com'
      };
    },
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      // styles: {
      //   files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
      //   tasks: ['copy:styles', 'autoprefixer']
      // },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        // hostname: '0.0.0.0'
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              modRewrite([
                '!\\.html|\\images|\\.js|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf|\\.svg /index.html [L]'
              ]),
              serveStatic('.tmp'),
              serveStatic(yeomanConfig.app)
            ];
          }
        }
      },
      teste2e: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 8080,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              modRewrite([
                '!\\.html|\\images|\\.js|\\.css|\\.png|\\.jpg|\\.woff|\\.ttf|\\.svg /index.html [L]'
              ]),
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/,views/*/}*.html'],
      css:  ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      json: ['<%= yeoman.dist %>/data/{,*/}*.json'],
      options: {
        assetsDirs: '<%= yeoman.dist %>',
        patterns: {
          json: [
            [/(images\\?\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JSON to reference our revved images']
          ],
          css: [
            [
              /(images\\?\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm,
              'Update the CSS to reference our revved images'
            ],
            [
              /(?:src=|url\(\s*)['"]?([^'"\)(\?|#)]+)['"]?\s*\)?/gm,
              'Update the CSS to reference our revved images'
            ]
          ],
          html: [
            [
              /<script.+src=['"]([^"']+)["']/gm,
              'Update the HTML to reference our concat/min/revved script files'
            ],
            [
              /<link[^\>]+href=['"]([^"']+)["']/gm,
              'Update the HTML with the new css filenames'
            ],
            [
              /<img[^\>]*[^\>\S]+src=['"]([^"']+)["']/gm,
              'Update the HTML with the new img filenames'
            ],
            [
              /<object[^\>]*[^\>\S]+data=['"]([^"']+)["']/gm,
              'Update the HTML with the new object filenames'
            ],
            [
              /<video[^\>]+src=['"]([^"']+)["']/gm,
              'Update the HTML with the new video filenames'
            ],
            [
              /<video[^\>]+poster=['"]([^"']+)["']/gm,
              'Update the HTML with the new poster filenames'
            ],
            [
              /<source[^\>]+src=['"]([^"']+)["']/gm,
              'Update the HTML with the new source filenames'
            ],
            [
              /data-main\s*=['"]([^"']+)['"]/gm,
              'Update the HTML with data-main tags',
              function (m) {
                return m.match(/\.js$/) ? m : m + '.js';
              },
              function (m) {
                return m.replace('.js', '');
              }
            ],
            [
              /data-(?!main).[^=]+=['"]([^'"]+)['"]/gm,
              'Update the HTML with data-* tags'
            ],
            [
              /url\(\s*['"]?([^"'\)]+)["']?\s*\)/gm,
              'Update the HTML with background imgs, case there is some inline style'
            ],
            [
              /<a[^\>]+href=['"]([^"']+)["']/gm,
              'Update the HTML with anchors images'
            ],
            [
              /<input[^\>]+src=['"]([^"']+)["']/gm,
              'Update the HTML with reference in input'
            ],
            [
              /<meta[^\>]+content=['"]([^"']+)["']/gm,
              'Update the HTML with the new img filenames in meta tags'
            ]
          ]
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html', 'views/*/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'data/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'coffee:dist',
        // 'copy:styles'
        'compass:server'
      ],
      test: [
        'coffee',
        // 'copy:styles'
        'compass'
      ],
      dist: [
        'coffee',
        // 'copy:styles',
        'compass:dist',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    replace: {
      // Only add Analytics tracking when doing production build
      // Could add different credentials for test if required
      dist: {
        options: {
          patterns: [
            {
              match: 'GOOGLE_ANALYTICS_KEY',    // replace @@GOOGLE_ANALYTICS_KEY
              replacement: '<%= credentials().GoogleAnalyticsKey %>'
            },
            {
              match: 'GOOGLE_ANALYTICS_HOST',   // replace @@GOOGLE_ANALYTICS_HOST
              replacement: '<%= credentials().GoogleAnalyticsHost %>'
            }
          ],
          force: true
        },
        files: [
          {expand: true, flatten: true, src: ['<%= yeoman.dist %>/index.html'], dest: '<%= yeoman.dist %>'}
        ]
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: false
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/scripts/scripts.js': [
      //       '<%= yeoman.dist %>/scripts/scripts.js'
      //     ]
      //   }
      // }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test:unit', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('test:e2e', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    // 'livereload-start',
    // 'connect:livereload',
    'karma:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'replace:dist',
    'cdnify', 
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test:unit',
    'build'
  ]);
};
