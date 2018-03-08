import { h, Component } from 'preact';
import Forecast from '../forecast';
import style from './style';
import $ from 'jquery';

export default class DailyForecast extends Component {
	
	/* Make initial call for weather data */
	constructor(props) {
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
			error : function(req, err){ console.log('Daily: Weather API call failed, error: ' + err); }
		})
	}

	render() {
		/* Initialize lists which will be utilized in constructing Forecast components */
		var times = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
		var winSpe = [this.state.wS0, this.state.wS1, this.state.wS2, this.state.wS3, this.state.wS4, this.state.wS5, this.state.wS6, this.state.wS7, this.state.wS8, this.state.wS9, this.state.wS10, this.state.wS11, this.state.wS12, this.state.wS13, this.state.wS14, this.state.wS15, this.state.wS16, this.state.wS17, this.state.wS18, this.state.wS19, this.state.wS20, this.state.wS21, this.state.wS22, this.state.wS23,];
		var chaRai = [this.state.cR0, this.state.cR1, this.state.cR2, this.state.cR3, this.state.cR4, this.state.cR5, this.state.cR6, this.state.cR7, this.state.cR8, this.state.cR9, this.state.cR10, this.state.cR11, this.state.cR12, this.state.cR13, this.state.cR14, this.state.cR15, this.state.cR16, this.state.cR17, this.state.cR18, this.state.cR19, this.state.cR20, this.state.cR21, this.state.cR22, this.state.cR23,];
		var cloCov = [this.state.cC0, this.state.cC1, this.state.cC2, this.state.cC3, this.state.cC4, this.state.cC5, this.state.cC6, this.state.cC7, this.state.cC8, this.state.cC9, this.state.cC10, this.state.cC11, this.state.cC12, this.state.cC13, this.state.cC14, this.state.cC15, this.state.cC16, this.state.cC17, this.state.cC18, this.state.cC19, this.state.cC20, this.state.cC21, this.state.cC22, this.state.cC23,];
		var vis = [this.state.v0, this.state.v1, this.state.v2, this.state.v3, this.state.v4, this.state.v5, this.state.v6, this.state.v7, this.state.v8, this.state.v9, this.state.v10, this.state.v11, this.state.v12, this.state.v13, this.state.v14, this.state.v15, this.state.v16, this.state.v17, this.state.v18, this.state.v19, this.state.v20, this.state.v21, this.state.v22, this.state.v23,];

		/* Create 24 Forecast components, starting with current time and looped at 23:00 hours if necessary */
		var forecasts = [];
		var currentTime = new Date().getHours();
		var timeNo = currentTime;
		var i;
		/* Build components including and after the current time */
		for (i = 0; i < 24-currentTime; i++) {
			forecasts[i] = <Forecast 
					desc={times[timeNo]} 
					windSpeed={parseInt(winSpe[i]) + " mph"}
					chanceRain={parseInt(chaRai[i]*100) + "%"} 
					cloudCoverage={parseInt(cloCov[i]*100) +"%"}
					visibility={parseInt(vis[i])+ " mi"}/>;
			timeNo++
		}
		var j;
		/* Build components leading up to current time */
		for (j = 0; j <= currentTime; j++) {
			forecasts[i] = <Forecast 
					desc={times[j]} 
					windSpeed={parseInt(winSpe[j]) + " mph"}
					chanceRain={parseInt(chaRai[j]*100) + "%"} 
					cloudCoverage={parseInt(cloCov[j]*100) +"%"}
					visibility={parseInt(vis[j])+ " mi"}/>;
					i++;
		}

		/* Place Forecast components into application */
		return (
			<div class="page-content">
	       			{forecasts[0]}{forecasts[1]}{forecasts[2]}{forecasts[3]}{forecasts[4]}{forecasts[5]}
	       			{forecasts[6]}{forecasts[7]}{forecasts[8]}{forecasts[9]}{forecasts[10]}{forecasts[11]}
	       			{forecasts[12]}{forecasts[13]}{forecasts[14]}{forecasts[15]}{forecasts[16]}{forecasts[17]}
	       			{forecasts[18]}{forecasts[19]}{forecasts[20]}{forecasts[21]}{forecasts[22]}{forecasts[23]}{forecasts[23]}
			</div>

		);

	}

	/* Parse response from API, setting states which will be necessary to build Forecast components */
	parseResponse = (parsed_json) => { 
		console.log('Daily: Weather API call sucessful');
		this.setState({ 
				wS0: [parsed_json['hourly']['data'][0]['windSpeed']],
				cR0: [parsed_json['hourly']['data'][0]['precipProbability']], 
				cC0: [parsed_json['hourly']['data'][0]['cloudCover']],
				v0: [parsed_json['hourly']['data'][0]['visibility']],

  				wS1: [parsed_json['hourly']['data'][1]['windSpeed']],
				cR1: [parsed_json['hourly']['data'][1]['precipProbability']], 
				cC1: [parsed_json['hourly']['data'][1]['cloudCover']],
				v1: [parsed_json['hourly']['data'][1]['visibility']],

				wS2: [parsed_json['hourly']['data'][2]['windSpeed']],
				cR2: [parsed_json['hourly']['data'][2]['precipProbability']], 
				cC2: [parsed_json['hourly']['data'][2]['cloudCover']],
				v2: [parsed_json['hourly']['data'][2]['visibility']],

				wS3: [parsed_json['hourly']['data'][3]['windSpeed']],
				cR3: [parsed_json['hourly']['data'][3]['precipProbability']], 
				cC3: [parsed_json['hourly']['data'][3]['cloudCover']],
				v3: [parsed_json['hourly']['data'][3]['visibility']],

				wS4: [parsed_json['hourly']['data'][4]['windSpeed']],
				cR4: [parsed_json['hourly']['data'][4]['precipProbability']], 
				cC4: [parsed_json['hourly']['data'][4]['cloudCover']],
				v4: [parsed_json['hourly']['data'][4]['visibility']],

				wS5: [parsed_json['hourly']['data'][5]['windSpeed']],
				cR5: [parsed_json['hourly']['data'][5]['precipProbability']], 
				cC5: [parsed_json['hourly']['data'][5]['cloudCover']],
				v5: [parsed_json['hourly']['data'][5]['visibility']],

				wS6: [parsed_json['hourly']['data'][6]['windSpeed']],
				cR6: [parsed_json['hourly']['data'][6]['precipProbability']], 
				cC6: [parsed_json['hourly']['data'][6]['cloudCover']],
				v6: [parsed_json['hourly']['data'][6]['visibility']],

				wS7: [parsed_json['hourly']['data'][7]['windSpeed']],
				cR7: [parsed_json['hourly']['data'][7]['precipProbability']], 
				cC7: [parsed_json['hourly']['data'][7]['cloudCover']],
				v7: [parsed_json['hourly']['data'][7]['visibility']],

  				wS8: [parsed_json['hourly']['data'][8]['windSpeed']],
				cR8: [parsed_json['hourly']['data'][8]['precipProbability']], 
				cC8: [parsed_json['hourly']['data'][8]['cloudCover']],
				v8: [parsed_json['hourly']['data'][8]['visibility']],

				wS9: [parsed_json['hourly']['data'][9]['windSpeed']],
				cR9: [parsed_json['hourly']['data'][9]['precipProbability']], 
				cC9: [parsed_json['hourly']['data'][9]['cloudCover']],
				v9: [parsed_json['hourly']['data'][9]['visibility']],

				wS10: [parsed_json['hourly']['data'][10]['windSpeed']],
				cR10: [parsed_json['hourly']['data'][10]['precipProbability']], 
				cC10: [parsed_json['hourly']['data'][10]['cloudCover']],
				v10: [parsed_json['hourly']['data'][10]['visibility']],

  				wS11: [parsed_json['hourly']['data'][11]['windSpeed']],
				cR11: [parsed_json['hourly']['data'][11]['precipProbability']], 
				cC11: [parsed_json['hourly']['data'][11]['cloudCover']],
				v11: [parsed_json['hourly']['data'][11]['visibility']],

				wS12: [parsed_json['hourly']['data'][12]['windSpeed']],
				cR12: [parsed_json['hourly']['data'][12]['precipProbability']], 
				cC12: [parsed_json['hourly']['data'][12]['cloudCover']],
				v12: [parsed_json['hourly']['data'][12]['visibility']],

				wS13: [parsed_json['hourly']['data'][13]['windSpeed']],
				cR13: [parsed_json['hourly']['data'][13]['precipProbability']], 
				cC13: [parsed_json['hourly']['data'][13]['cloudCover']],
				v13: [parsed_json['hourly']['data'][13]['visibility']],

				wS14: [parsed_json['hourly']['data'][14]['windSpeed']],
				cR14: [parsed_json['hourly']['data'][14]['precipProbability']], 
				cC14: [parsed_json['hourly']['data'][14]['cloudCover']],
				v14: [parsed_json['hourly']['data'][14]['visibility']],

				wS15: [parsed_json['hourly']['data'][15]['windSpeed']],
				cR15: [parsed_json['hourly']['data'][15]['precipProbability']], 
				cC15: [parsed_json['hourly']['data'][15]['cloudCover']],
				v15: [parsed_json['hourly']['data'][15]['visibility']],

				wS16: [parsed_json['hourly']['data'][16]['windSpeed']],
				cR16: [parsed_json['hourly']['data'][16]['precipProbability']], 
				cC16: [parsed_json['hourly']['data'][16]['cloudCover']],
				v16: [parsed_json['hourly']['data'][16]['visibility']],

				wS17: [parsed_json['hourly']['data'][17]['windSpeed']],
				cR17: [parsed_json['hourly']['data'][17]['precipProbability']], 
				cC17: [parsed_json['hourly']['data'][17]['cloudCover']],
				v17: [parsed_json['hourly']['data'][17]['visibility']],

  				wS18: [parsed_json['hourly']['data'][18]['windSpeed']],
				cR18: [parsed_json['hourly']['data'][18]['precipProbability']], 
				cC18: [parsed_json['hourly']['data'][18]['cloudCover']],
				v18: [parsed_json['hourly']['data'][18]['visibility']],

				wS19: [parsed_json['hourly']['data'][19]['windSpeed']],
				cR19: [parsed_json['hourly']['data'][19]['precipProbability']], 
				cC19: [parsed_json['hourly']['data'][19]['cloudCover']],
				v19: [parsed_json['hourly']['data'][19]['visibility']],

				wS20: [parsed_json['hourly']['data'][20]['windSpeed']],
				cR20: [parsed_json['hourly']['data'][20]['precipProbability']], 
				cC20: [parsed_json['hourly']['data'][20]['cloudCover']],
				v20: [parsed_json['hourly']['data'][20]['visibility']],

  				wS21: [parsed_json['hourly']['data'][21]['windSpeed']],
				cR21: [parsed_json['hourly']['data'][21]['precipProbability']], 
				cC21: [parsed_json['hourly']['data'][21]['cloudCover']],
				v21: [parsed_json['hourly']['data'][21]['visibility']],

				wS22: [parsed_json['hourly']['data'][22]['windSpeed']],
				cR22: [parsed_json['hourly']['data'][22]['precipProbability']], 
				cC22: [parsed_json['hourly']['data'][22]['cloudCover']],
				v22: [parsed_json['hourly']['data'][22]['visibility']],

				wS23: [parsed_json['hourly']['data'][23]['windSpeed']],
				cR23: [parsed_json['hourly']['data'][23]['precipProbability']], 
				cC23: [parsed_json['hourly']['data'][23]['cloudCover']],
				v23: [parsed_json['hourly']['data'][23]['visibility']],

			});
	}

}
