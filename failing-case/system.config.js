/**
 * System configuration
 */
(function () {
    // map tells the System loader where to look for things
    var map = {
        'app': './'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js', format: 'cjs' }
    };

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);
})();