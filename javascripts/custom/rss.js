// Define RSSRequest
var RSSRequest = (function () {
  var getFeed = function(url, callback) {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(15);

    feed.load(function(response) {
      var context = { items: [] }

      $.each(response.feed.entries, function(key, value) {console.log(value.link);
        context.items.push({ 'title' : value.title, 'description': value.contentSnippet, 'permalink': value.link, 'date': value.publishedDate });
      });

      callback(context);
    });
  }

  return {
    getFeed : getFeed
  }
})();