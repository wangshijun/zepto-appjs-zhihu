App.controller('home', function (page) {
    // put stuff here
});

App.controller('page2', function (page) {
    // put stuff here
});

App.controller('page3', function (page) {
    // put stuff here
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}
