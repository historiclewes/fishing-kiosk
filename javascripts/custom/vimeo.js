// Define VimeoAjaxRequest
var VimeoAjaxRequest = (function () {
  var fetchVideoData = function(vimeo_id, callback) {
    Zepto.ajax(
        {
          url: VimeoAjaxRequest.vimeoVideoAPIUrl(vimeo_id),
          dataType: 'jsonp',
          type: 'GET',
          cache: false,
          success: function (result) {
            callback(result[0]);
          }
        }
    );
  }

  return {
    fetchVideoData : fetchVideoData,

    vimeoVideoAPIUrl: function(vimeo_id) {
      return 'http://vimeo.com/api/v2/video/' + vimeo_id + '.json';
    },

    getThumbnail: function(vimeo_id) {
      VimeoAjaxRequest.fetchVideoData(vimeo_id, function(response) {
        return response.thumbnail_medium;
      });
    }
  }
})();