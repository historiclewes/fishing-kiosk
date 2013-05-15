// Define DrupalRequest
var DrupalRequest = (function () {
  var fetchNode = function(node_id, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.actionUrl('node'),
        dataType: 'jsonp',
        data: {nid: node_id},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = {
            title: response[0].title,
            body: response[0].body
          }

          // if a kiosk description exists, use that instead of the existing node body
          if (response[0].kiosk_body && response[0].kiosk_body.length) {
            context.body = response[0].kiosk_body;
          }

          callback(context);
        }
      }
    );
  }

  var fetchCollectionsView = function(feed_id, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [] }

          $.each(response, function(key, value) {
            context.items.push({ 'title' : value.title, 'teaser': value.teaser, 'nid': value.nid });
          });

          callback(context);
        }
      }
    );
  }

  var fetchSlideshowView = function(feed_id, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [] };

          $.each(response, function(key, value) {
            context.items.push({ 'src' : value.picture });
          });

          callback(context);
        }
      }
    );
  }

  var doSearch = function(feed_id, keywords, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        data: {title: keywords},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [], keywords: keywords }

          $.each(response, function(key, value) {
            context.items.push({ 'title' : value.title, 'nid': value.nid, 'teaser': value.teaser });
          });

          callback(context);
        }
      }
    );
  }

  var newsletterSignup = function(email_address, callback) {
    Zepto.ajax(
      {
        url: 'http://oi.vresp.com?fid=873b7bef06' + '&email_address=' + email_address,
        type: 'POST',
        cache: false,
        success: function (result) {
          callback(result);
        },
        error: function (result) {
          callback(result);
        }
      }
    );
  }

  return {
    fetchNode: fetchNode,
    fetchCollectionsView: fetchCollectionsView,
    fetchSlideshowView: fetchSlideshowView,
    doSearch: doSearch,
    newsletterSignup: newsletterSignup
  }
})();