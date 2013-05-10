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
        success: function (result) {
          callback(result);
        }
      }
    );
  }

  var fetchView = function(feed_id, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        success: function (result) {
          callback(result);
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
        success: function (result) {
          callback(result);
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
          }
        }
    );
  }

  return {
    fetchNode: fetchNode,
    fetchView: fetchView,
    doSearch: doSearch,
    newsletterSignup: newsletterSignup
  }
})();