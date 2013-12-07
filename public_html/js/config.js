/**
 * Require.js configuration
 */
requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    }
});

requirejs(["app/app"], function(app){
    
});

