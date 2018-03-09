import { h, Component } from 'preact';
import style from './style';
import Tile from'../tile';
import $ from 'jquery';
import SimpleMap from './maps';

export default class Home extends Component {

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
			error : function(req, err){ console.log('Home: Weather API call failed, error: ' + err); }
		})
	}

	/* Render home screen by placing Tile components in organized rows */
	render() {
		var dailyRating = this.getDailyRating();

		return (
			<div class={"allRows " + style.home}>
				<div class={"row " + style.row}>
					<Tile title="Temperature" data={this.state.tempurature}/>
					<Tile title="Chance Of Rain" data={this.state.chanceOfRain}/>
				</div>
				<div class={"row " + style.row}>
					<Tile title="Average Visibility" data={this.state.visibility}/>
					<Tile title="Wind Speed" data={this.state.windspeed}/>
				</div>
				<div class={"row " + style.row}>
					<Tile title="Cloud Cover" data={this.state.cloudCoverage}/>
					<Tile title="Humidity" data={this.state.humidity}/>
		  		</div>
		  		<div class={"row " + style.row}>
		  			<Tile title="Rating" data={dailyRating}/>
		  		</div>
		  	</div>
  		);
	}

	/* Parse response from API, setting states which will be necessary to build Home components */
	parseResponse = (parsed_json) => {
		console.log('Home: Weather API call sucessful');
		this.setState({
			cloudCoverage: parsed_json['currently']['cloudCover'], 
			chanceOfRain: parsed_json['currently']['precipProbability'], 
			visibility: parsed_json['currently']['visibility'],
			windspeed: parsed_json['currently']['windSpeed'],
			tempurature: parsed_json['currently']['temperature'],
			humidity: parsed_json['currently']['humidity'],
			pressure: parsed_json['currently']['pressure'],
			sunsetTime: parsed_json['daily']['data'][0]['sunsetTime'],
			sunriseTime: parsed_json['daily']['data'][0]['sunriseTime'],

			wS0: parsed_json['daily']['data'][0]['windSpeed'],
			cR0: parsed_json['daily']['data'][0]['precipProbability'], 
			cC0: parsed_json['daily']['data'][0]['cloudCover'],
			v0: parsed_json['daily']['data'][0]['visibility'],
			tMax: parsed_json['daily']['data'][0]['temperatureMax'],
			tMin: parsed_json['daily']['data'][0]['temperatureMin'],
			h0: parsed_json['daily']['data'][0]['humidity'],
			p0: parsed_json['daily']['data'][0]['pressure'],

		});      
	}

	/* Assess optimality of stargazing given todays weather conditions */
	getDailyRating = () => {
		var rating = "";
		var cloudCoverage = this.state.cC0 * 0.33;
		var visibility = ((this.state.v0 - 0.06) / 11.99) * 0.31;
		var chanceRain = this.state.cR0 * 0.25;
		var windspeed = (this.state.wS0 / 173.0) * 0.07;
		var pressure = ((this.state.p0 - 925.60) / 128.00) * 0.005;
		var averageTemp = (this.state.tMax + this.state.tMin) / 2;
		var temperature = ((averageTemp + 27.20) / 65.70) * 0.005;
		var humidity = this.state.h0 * 0.02;
		var sunset = new Date(0);
		sunset.setUTCSeconds(this.state.sunsetTime);
		var sunrise = new Date(0);
		sunrise.setUTCSeconds(this.state.sunriseTime);
		var hoursSunlight = (((sunset.getHours() - sunrise.getHours()) - 6.0) / 12) * 0.01;
		var negativeElementSum = cloudCoverage + chanceRain + humidity + windspeed + hoursSunlight + temperature;
		var positiveElementSum = pressure + visibility;
		var rating = 0.5 + positiveElementSum - negativeElementSum;
		console.log("rating: " + rating);
		if (rating <= 0.35) {
			return "Poor";
		}
		else if (rating >= 0.61) {
			return "Excellent";
		}
		else {
			return "Fair";
		}
	}

}
