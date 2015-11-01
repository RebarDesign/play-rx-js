requirejs.config({
    baseUrl: 'node_modules',
    paths: {
        scripts: '../scripts',
        rx: 'rx/dist/rx.all',
    }
});

requirejs(['scripts/init']);
requirejs(['scripts/obs']);