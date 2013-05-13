// Define VimeoRequest
var VimeoRequest = (function () {
  var getData = function(type, id, callback) {
    Zepto.ajax(
        {
          url: vimeoAPIRequestURL(type, id),
          dataType: 'jsonp',
          type: 'GET',
          cache: true,
          success: function (result) {
            callback(result);
          }
        }
    );
  }

  var vimeoAPIRequestURL = function(type, id) {
    switch (type) {
      case 'user':
        return 'http://vimeo.com/api/v2/' + id + '/videos.json';
        break;
      case 'album':
        return 'http://vimeo.com/api/v2/album/' + id + '/videos.json';
        break;
      default:
        break;
    }
  }

  return {
    getData : getData
  }
})();