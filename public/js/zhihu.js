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

function getImgProxyUrl(img) {
    return '/img/proxy?img=' + encodeURIComponent(img);
}

App.controller('home', function (page) {
    $container = $(page).find('#js-story-container');
    $template = $(page).find('#js-story-template');

    $.getJSON('/api/4/news/latest', function (data) {
        console.log(data);

        if (data.stories && data.stories.length) {
            for (var i = 0, n = data.stories.length; i < n; i++) {
                var tplData = {
                    image: getImgProxyUrl(data.stories[i].images[0]),
                    title: data.stories[i].title,
                    id: data.stories[i].id,
                };

                $container.append($template.template(tplData));
            }
        }
    });
});

App.controller('detail', function (page, args) {
    $.getJSON('/api/4/news/' + args.id, function (data) {
        console.log(data);

        var body = $(data.body);
        body.find('img').each(function (i, img) {
            var ndImg = $(img);
            ndImg.attr('src', getImgProxyUrl(ndImg.attr('src')));
        });

        $(page).find('.js-story-title').html(data.title);
        $(page).find('.js-story-cover').attr('src', getImgProxyUrl(data.image));
        $(page).find('.js-story-content').html(body);
    });
});

App.controller('page3', function (page) {
    // put stuff here
});

try {
    App.restore();
} catch (err) {
    App.load('home');
}
