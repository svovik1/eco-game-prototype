/** 
 * Require.js configuration of tests
 */
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/-test\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    baseUrl: "/base/js/libs",
    paths: {
        app: "../../public_html/js/app"
    },
    shim: {
        "jquery": {
            exports: "$"
        },
        "bootstrap": {
            deps: ["jquery"]
        }
        
    },
    deps: tests,
    callback: window.__karma__.start
});