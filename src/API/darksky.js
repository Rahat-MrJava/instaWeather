import $ from 'jquery';


const fetchDailyForecast = (apiKey, lat, lon) => {
  var result = '';
  var url = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?units=uk2";
  $.ajax({
    url: url,
    dataType: "jsonp",
    async: false,
    success : function(data){
      result = data;
    },
    error : function(req, err){ console.log('Daily: Weather API call failed, error: ' + err); }
  });
  return result;
}




export default fetchDailyForecast;