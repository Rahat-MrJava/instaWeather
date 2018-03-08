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
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="day-forecast">
												<TableHeader daily={true} />
												<DailyForecast apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE}/>
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-index'?'view tab':'view-main tab active'}`} div id="view-index">
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="index">
												<Home apiKey={APIKEY} lat={LATITUDE} lon={LONGITUDE}/>
												<EventHandler count="6" />
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-week'?'view tab':'view-main tab active'}`} div id="view-week">
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
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
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="day-forecast">
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-index'?'view tab':'view-main tab active'}`} div id="view-index">
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
										<div class="pages navbar-fixed toolbar-fixed">
											<div class="page" data-page="index">
												<EventHandler count="6" />
											</div>
										</div>
									<Footer active={this.state.active} onSelectionChange={active => this.setState({...this.state, active})}/>
								</div>
								<div class={`view ${this.state.active!=='view-week'?'view tab':'view-main tab active'}`} div id="view-week">
									<Header onModeChange={mode => this.setState({...this.state, mode})} />
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
