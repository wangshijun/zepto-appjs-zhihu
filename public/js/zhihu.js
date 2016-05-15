// 微型模板引擎，不支持循环的
$.fn.template = function (data) {
    var template = $(this[0]).html().trim();

    if (typeof data === 'object') {
        for (var key in data) {
            template = template.replace(new RegExp('\\${' + key + '}', 'g'), data[key]);
        }
    }

    return template;
};


App.controller('home', function (page) {
    $container = $(page).find('#js-story-container');
    $template = $(page).find('#js-story-template');

    $.getJSON('/api/4/news/latest', function (data) {
        console.log(data);

        if (data.stories && data.stories.length) {
            for (var i = 0, n = data.stories.length; i < n; i++) {
                var tplData = {
                    image: '/img/proxy?img=' + encodeURIComponent(data.stories[i].images[0]),
                    title: data.stories[i].title,
                };

                $container.append($template.template(tplData));
            }
        }
    });
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
