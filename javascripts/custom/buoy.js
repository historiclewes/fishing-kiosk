// Define BuoyRequest
var BuoyRequest = (function () {
  var getData = function(buoy_id, callback) {
    Zepto.ajax(
        {
          url: dataFeedUrl(buoy_id),
          type: 'GET',
          dataType: 'json',
          cache: false,
          success: function (response) {
            var context = {
              wave_height: response[0].WVHT,
              wave_length: response[0].wavelength,
              wave_period: response[0].DPD,
              wave_direction: response[0].MWD,
              air_pressure: response[0].PRES,
              air_pressure_change: response[0].PTDY,
              air_temperature: response[0].ATMP,
              water_temperature: response[0].WTMP,
              wind_speed: response[0].WSPD,
              wind_direction: response[0].WDIR,
              wind_gusts: response[0].GST,
            };

            callback(context);
          }
        }
    );
  }

  var dataFeedUrl = function(buoy_id) {
    return 'json/' + buoy_id + '.json';
  }

  return {
    getData : getData
  }
})();