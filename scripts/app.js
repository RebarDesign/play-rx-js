requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        scripts: '../scripts',
        rx: 'rx/dist/rx'
    }
});

requirejs(['scripts/init']);
requirejs(['scripts/obs']);