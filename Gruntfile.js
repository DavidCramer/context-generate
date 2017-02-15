module.exports = function (grunt) {
    // Project configuration.

    grunt.initConfig({
        pkg     : grunt.file.readJSON( 'package.json' ),
        gitclone: {
            clone: {
                options: {
                    repository: 'https://github.com/Desertsnowman/context',
                    branch: 'master',
                    directory: 'context-install'
                }
            }
        },
        shell: {
            install: {
                command: 'npm install --prefix ./context-install'
            },
            build: {
                command: "grunt --slug=<%= pkg.namespace %> --base ./context-install --gruntfile ./context-install/GruntFile.js default"
            },
            setup: {
                command: "grunt"
            }
        },
        replace : {
            plugin_file: {
                src: [ '*.neon', '*.php', 'includes/**/*.php', 'classes/**/*.php','assets/**/*.css','assets/**/*.js','languages/**/*.po', ],
                overwrite: true,
                replacements: [
                    {
                        from: "context plugin",
                        to: "<%= pkg.plugin_name.toLocaleLowerCase() %>"
                    },
                    {
                        from: "context_plugin",
                        to: "<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '_' ) %>"
                    },
                    {
                        from: "Context_Plugin",
                        to: "<%= pkg.plugin_name.replace(/[^a-z0-9]/gi, '_' ) %>"
                    },
                    {
                        from: "Context Plugin",
                        to: "<%= pkg.plugin_name %>"
                    },
                    {
                        from: "%description%",
                        to: "<%= pkg.description %>"
                    },
                    {
                        from: "%author%",
                        to: "<%= pkg.author %>"
                    },
                    {
                        from: "%author_url%",
                        to: "<%= pkg.author_url %>"
                    },
                    {
                        from: "%plugin_url%",
                        to: "<%= pkg.plugin_url %>"
                    },
                    {
                        from: "1.0.0",
                        to: "<%= pkg.version %>"
                    },
                    {
                        from: "context-plugin",
                        to: "<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '-' ) %>"
                    },
                    {
                        from: "%textdomain%",
                        to: "<%= pkg.plugin_name.toLocaleLowerCase().replace(/[^a-z0-9]/gi, '-' ) %>"
                    },
                    {
                        from: 'CNTXT',
                        to: "<%= pkg.prefix %>"
                    }
                ]
            }
        },
        clean: {
            installer: ["context-install/**"],
        }
    });

    //load modules
    grunt.loadNpmTasks( 'grunt-shell');
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-git' );
    grunt.loadNpmTasks( 'grunt-text-replace' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );

    //register default task
    grunt.registerTask( 'default', [ 'gitclone', 'shell:install', 'shell:build', 'clean', 'replace', 'shell:setup' ] );

};
