import { h, Component } from 'preact';
import style from './style';
import $ from 'jquery';

export default class Notification extends Component {
	/* Make initial call for weather data, if necessary,
		and set initial state of app as "daytime" mode */



	constructor(props){
		super(props);
		this.fetchWeatherData();
		this.setState({
			mode: 'day',
			fetchWeatherData: false,
		});
	}

	/* Call for weather data utilizing elements passed in as properties */
	fetchWeatherData = () => {
		console.log("Notification: fetchWeatherData entered")
		var apiKey = "" + this.props.apiKey;
		var latitude = "" + this.props.lat;
		var longitude = "" + this.props.lon;
		var url = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?units=uk2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('Notification: Weather API call failed, error: ' + err); }
		})
	}

	/* Render of the suggestion whether it is recommended to go outside or not */


	render() {	
		if (!this.state.fetchWeatherData) {
			this.fetchWeatherData();
		}
		if (this.props.notificationStatus) {
			console.log("Reccomendation for outdoor event = " + this.state.chanceOfRain1);
			var currentTime = new Date().getHours();
			var nextHour = currentTime+1;
			/* Construct message presented if there is a chance of rain >= 50% in the current hour */
			if ( (this.state.chanceOfRain1 > 0.49) ){
				return (
					<div class={"popover popover-notification " + style.notification}>
						<span class={style.notData}>
								<p>
									<b>Reccomendation of events outdoor:</b><br/> 
									{nextHour}:00 Reccomendation of outdoor is {parseInt((this.state.chanceOfRain1)*100)}%
								</p>
								<a href="#" class="link close-popover"></a>
						</span>
					</div>
		  		);
		  	}
		  	else {
		  		var chancesOfRain = [this.state.chanceOfRain2, this.state.chanceOfRain3, this.state.chanceOfRain4, this.state.chanceOfRain5, this.state.chanceOfRain6, this.state.chanceOfRain7, this.state.chanceOfRain8, this.state.chanceOfRain9, this.state.chanceOfRain10, this.state.chanceOfRain11, this.state.chanceOfRain12];
		  		var i;
		  		var chanceOfRainFuture = "";
		  		var message = "";
		  		var futureHour = currentTime+2;
		  		for (i = 0; i<chancesOfRain.length; i++){
		  			/* Check if there is a chance of rain >= 50% in the next 11 hours */
		  			if (chancesOfRain[i] > 0.49) {
		  				chanceOfRainFuture = parseInt((chancesOfRain[i])*100);
		  				futureHour = futureHour + i;
		  				break;
		  			}
		  		}
		  		/* Construct message presented if there is no chance of rain >= 50% in the next 11 hours */
		  		if ( i === 11 ) {
		  			message = "Outdoor is recommended for the next 11 hours";
		  		}
		  		/* Construct message presented if there is a chance of rain >= 50% in the next 11 hours */
		  		else {
		  			message = "Indoor is recommended for next few hours" + chanceOfRainFuture + "%";
		  		}
		  		
		  		/* Return correct notification message given weather data in the current hour 
		  			and in the 11 subsequent hours*/
		  		return (
		  			<div class={"popover popover-notification " + style.notification}>
						<span class={style.notData}>
								<p>
									<b>Reccomendation for Outdoor Sport:</b><br/> 
										{message}
								</p>
								<a href="#" class="link close-popover"></a>
						</span>
					</div>
		  		);
		  	}
		}
		else {
			return (
		  			<div class={"popover popover-notification " + style.notification}>
						<span class={style.notData}>
								<p>
									<b>NaN</b><br/> 
								</p>
								<a href="#" class="link close-popover"></a>
						</span>
					</div>
		  		);

		}
	}

	/* Parse response from API, setting states which will be necessary to build Notification component */
	parseResponse = (parsed_json) => {
		console.log('Notification: Weather API call sucessful');
		this.setState({
			chanceOfRain1: parsed_json['hourly']['data'][1]['precipProbability'], 
			chanceOfRain2: parsed_json['hourly']['data'][2]['precipProbability'], 
			chanceOfRain3: parsed_json['hourly']['data'][3]['precipProbability'], 
			chanceOfRain4: parsed_json['hourly']['data'][4]['precipProbability'], 
			chanceOfRain5: parsed_json['hourly']['data'][5]['precipProbability'], 
			chanceOfRain6: parsed_json['hourly']['data'][6]['precipProbability'], 
			chanceOfRain7: parsed_json['hourly']['data'][7]['precipProbability'], 
			chanceOfRain8: parsed_json['hourly']['data'][8]['precipProbability'], 
			chanceOfRain9: parsed_json['hourly']['data'][9]['precipProbability'], 
			chanceOfRain10: parsed_json['hourly']['data'][10]['precipProbability'], 
			chanceOfRain11: parsed_json['hourly']['data'][11]['precipProbability'], 
			chanceOfRain12: parsed_json['hourly']['data'][12]['precipProbability'],
			fetchWeatherData: true, 
		});      
	}

}