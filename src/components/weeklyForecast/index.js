import { h, Component } from 'preact';
import Forecast from '../forecast';
import style from './style';
import $ from 'jquery'; 

export default class WeeklyForecast extends Component {
	
	/* Make initial call for weather data */
	constructor(props){
		super(props);
		this.fetchWeatherData();
	}

	/* Call for weather data utilizing elements passed in as properties */
	fetchWeatherData = () => {
		var apiKey = "" + this.props.apiKey;
		var latitude = "" + this.props.lat;
		var longitude = "" + this.props.lon;
		var url = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?units=uk2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('Weekly: Weather API call failed, error: ' + err); }
		})
	}

	render() {
		/* Initialize lists which will be utilized in constructing Forecast components */
		var days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var winSpe = [this.state.wS0, this.state.wS1, this.state.wS2, this.state.wS3, this.state.wS4, this.state.wS5, this.state.wS6];
		var chaRai = [this.state.cR0, this.state.cR1, this.state.cR2, this.state.cR3, this.state.cR4, this.state.cR5, this.state.cR6];
		var cloCov = [this.state.cC0, this.state.cC1, this.state.cC2, this.state.cC3, this.state.cC4, this.state.cC5, this.state.cC6];
		var vis = [this.state.v0, this.state.v1, this.state.v2, this.state.v3, this.state.v4, this.state.v5, this.state.v6];

		/* Create seven Forecast components, starting with current day and looped at Saturday if necessary
			wherein day 0 is Sunday and day 6 is Saturday */
		var forecasts = [];
		var currentDay = new Date().getDay();
		var dayNo = currentDay;
		var i;
		/* Build components including and after the current day */
		for (i = 0; i < 7-currentDay; i++){
			forecasts[i] = <Forecast 
					desc={days[dayNo]} 
					windSpeed={parseInt(winSpe[i]) + " mph"}
					chanceRain={parseInt(chaRai[i]*100) + "%"} 
					cloudCoverage={parseInt(cloCov[i]*100) +"%"}
					visibility={parseInt(vis[i])+ " mi"}/>;
			dayNo++
		}
		var j;
		/* Build components leading up to current day */
		for (j = 0; j < currentDay; j++){
			forecasts[i] = <Forecast 
					desc={days[j]} 
					windSpeed={parseInt(winSpe[j]) + " mph"}
					chanceRain={parseInt(chaRai[j]*100) + "%"} 
					cloudCoverage={parseInt(cloCov[j]*100) +"%"}
					visibility={parseInt(vis[j])+ " mi"}/>;
					i++;
		}

		/* Place Forecast components into application */
		return (
			<div class ={"allWeekly " +style.weeklyForecast}>
				{forecasts[0]}{forecasts[1]}{forecasts[2]}{forecasts[3]}{forecasts[4]}{forecasts[5]}{forecasts[6]}
			</div>
		);

	}

	/* Parse response from API, setting states which will be necessary to build Forecast components */
	parseResponse = (parsed_json) => { 
		console.log('Weekly: Weather API call sucessful');
		this.setState({ 
				wS0: [parsed_json['daily']['data'][0]['windSpeed']],
				cR0: [parsed_json['daily']['data'][0]['precipProbability']], 
				cC0: [parsed_json['daily']['data'][0]['cloudCover']],
				v0: [parsed_json['daily']['data'][0]['visibility']],

  				wS1: [parsed_json['daily']['data'][1]['windSpeed']],
				cR1: [parsed_json['daily']['data'][1]['precipProbability']], 
				cC1: [parsed_json['daily']['data'][1]['cloudCover']],
				v1: [parsed_json['daily']['data'][1]['visibility']],

				wS2: [parsed_json['daily']['data'][2]['windSpeed']],
				cR2: [parsed_json['daily']['data'][2]['precipProbability']], 
				cC2: [parsed_json['daily']['data'][2]['cloudCover']],
				v2: [parsed_json['daily']['data'][2]['visibility']],

				wS3: [parsed_json['daily']['data'][3]['windSpeed']],
				cR3: [parsed_json['daily']['data'][3]['precipProbability']], 
				cC3: [parsed_json['daily']['data'][3]['cloudCover']],
				v3: [parsed_json['daily']['data'][3]['visibility']],

				wS4: [parsed_json['daily']['data'][4]['windSpeed']],
				cR4: [parsed_json['daily']['data'][4]['precipProbability']], 
				cC4: [parsed_json['daily']['data'][4]['cloudCover']],
				v4: [parsed_json['daily']['data'][4]['visibility']],

				wS5: [parsed_json['daily']['data'][5]['windSpeed']],
				cR5: [parsed_json['daily']['data'][5]['precipProbability']], 
				cC5: [parsed_json['daily']['data'][5]['cloudCover']],
				v5: [parsed_json['daily']['data'][5]['visibility']],

				wS6: [parsed_json['daily']['data'][6]['windSpeed']],
				cR6: [parsed_json['daily']['data'][6]['precipProbability']], 
				cC6: [parsed_json['daily']['data'][6]['cloudCover']],
				v6: [parsed_json['daily']['data'][6]['visibility']]
		});
	}

}

