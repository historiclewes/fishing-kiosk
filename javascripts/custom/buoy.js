// Define BuoyRequest
var BuoyRequest = (function () {
  var getData = function(buoy_id, callback) {
    Zepto.ajax(
        {
          url: dataFeedUrl(buoy_id),
          type: 'GET',
          dataType: 'json',
          cache: false,
          success: function (result) {
            callback(result);
          }
        }
    );
  }

  var dataFeedUrl = function(buoy_id) {
    return '../../json/' + buoy_id + '.json';
  }

  return {
    getData : getData
  }
})();