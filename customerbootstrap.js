(function () {
    var match = window.location.search.match(/(\?|&)customerurl\=([^&]*)/);

    if (match && match[2] && !window.customerUrl.length) {
        window.customerUrl = decodeURIComponent(match[2]);
    }
})();
