// Define DrupalAjaxRequest
var DrupalAjaxRequest = (function () {
  var fetch = function(feed_id, callback) {
    Zepto.ajax(
        {
          url: Kiosk.contentUrl(feed_id),
          dataType: 'jsonp',
          type: 'GET',
          cache: false,
          success: function (result) {
            callback(result);
          }
        }
    );
  }

  return {
    fetch : fetch
  }
})();