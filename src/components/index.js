import { h, Component } from 'preact';
import $ from 'jquery';

/* Import components necessary to build application */
import Header from './header';
import Footer from './footer';
import Events from './events';
import EventHandler from './eventHandler';
import Tile from './tile';
import DailyForecast from './dailyForecast';
import WeeklyForecast from './weeklyForecast';
import TableHeader from './tableHeader';
import Navigation from './navigation';
import Home from './home';
import Notification from './notification';

export default class App extends Component {

	/* Make initial call for location data and set initial state
		of application to "daytime" mode */
	constructor() {
		super();
		this.fetchLocation();
		this.setState({
			active: 'view-index',
			mode: 'day',
			fetchLocationCalled: false,
		});
	}

	/* Call for location data utilizing an external API */
	fetchLocation = () => {
		var url = "https://ipapi.co/json/";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseLocation,
			error: function(req, err){
				console.log('App: Location API call failed, error: ' + err);
			}
		})
	}
	
	getInfo = data => {
		if(data){
			var that = this;
			const apiKey = 'c8413dc39a56948004abf521e27ea290';
			const units = 'metric';
			const baseUrl = 'https://api.openweathermap.org/data/2.5/';
			var locationUrlEncoded = encodeURIComponent(data);
			
			var url = `${baseUrl}weather?appid=${apiKey}&units=metric&cnt=5&q=${locationUrlEncoded}`;
			
			var result = '';
			
			$.ajax({
				url: url,
				dataType: "json",
				success: function(res){
					console.log(res);
					if(res){
						var activityType = 'outdoor';
							const GM_API_KEY = 'AIzaSyAckapvwgWjPzEpPn4US7QD2-fNb8WuU0U';
							
							switch(res.weather[0].main){
						    case 'Rain':
						    case 'Thunderstorm':
						    case 'Snow':
						    case 'Mist':
						      activityType = 'indoor';
									break;
						    default:
								break;
						  }
						$.ajax({
								url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${activityType}+activities+in+${res.name}&location=${res.coord.lat},${res.coord.lon}&radius=12000&key=${GM_API_KEY}`,
								dataType: "json",
								success: function(gmres) {
									that.setState({
										longitude: res.coord.lon,
										latitude: res.coord.lan,
										fetchLocationCalled: true,
										places: gmres
									});
									// that.parsePlaces(gmres);
									console.log(gmres);
								},
								error: function(req,err){
									
								}
							});
					}
					
				},
				error: function(req, err){
					console.log('App: Location API call failed, error: ' + err);
				}
			});
		}
	}

	render() {
		/* Initialize elements necessary to make API calls and obtain weather data */
		var APIKEY = "" + "9211576f6b204ec1c8eb8dde7bbcfdaa";
		var LATITUDE = String(this.state.latitude); 
		var LONGITUDE = String(this.state.longitude);
		if (this.state.fetchLocationCalled){
			return (
				<div class="device-wrapper">
					<div class="device device-android"> 
						<div id="app" class={`framework7-root ${this.state.active} ${this.state.mode} ${this.state.notification}`}> 
						<Notification apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE} notificationStatus={true}/>
							<div class="views tabs">
								<div class={`view ${this.state.active!=='view-day'?'view tab':'view-main tab active'}`} div id="view-day">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="day-forecast">
												<TableHeader daily={true} />
												<DailyForecast apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE}/>
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-index'?'view tab':'view-main tab active'}`} div id="view-index">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="index">
												<Home apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE}/>
												<EventHandler count="6" />
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-week'?'view tab':'view-main tab active'}`} div id="view-week">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page " data-page="week-forecast">
												<TableHeader daily={false} />
												<WeeklyForecast apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE}/>
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		else {
			return (	
				<div class="device-wrapper">
					<div class="device device-android"> 
						<div id="app" class={`framework7-root ${this.state.active} ${this.state.mode} ${this.state.notification}`}> 
							<Notification apiKey="" lat="" lon="" notificationStatus={false}/>
							<div class="views tabs">
								<div class={`view ${this.state.active!=='view-day'?'view tab':'view-main tab active'}`} div id="view-day">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="day-forecast">
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-index'?'view tab':'view-main tab active'}`} div id="view-index">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="index">
												<EventHandler count="6" />
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-week'?'view tab':'view-main tab active'}`} div id="view-week">
									<Header getWeatherInfo={this.getInfo}onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page " data-page="week-forecast">
											
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	/* Parse longitude and latitude data from pulled API data */
	parseLocation = (parsed_json) => {
		console.log('App: Location API call sucessful');
		this.setState({
			longitude: parsed_json['longitude'],
			latitude: parsed_json['latitude'],
			fetchLocationCalled: true,
		});
	}
}
