import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';
import Notification from '../notification';
import $ from 'jquery';

export default class Header extends Component {

	/* Set initial state of app as "outdoor" mode */
	constructor(props) {
		super(props);
		this.setState({
			mode: 'day',
		});
	}

	/* Switch between "outdoor" and "indoor" CSS */
	changeMode() {
		if (this.state.mode === 'day') {
			this.setState({...this.state, mode: 'night'})
			this.props.onModeChange('night')

		} else {
			this.setState({...this.state, mode: 'day'})
			this.props.onModeChange('day')
		}
	}
	
	toggleSearch = () => {
		var headerForm = $('.header-search-form');
		if(headerForm.css('display') === 'none'){
			headerForm.css('display', 'block');
		} else {
			headerForm.css('display', 'none');
		}
	}
	
	handleChange = (e) => {
		this.setState({
			...this.state,
			city: e.target.value
		})
	}
	
	submitHandler = e => {
		e.preventDefault();
		this.props.getWeatherInfo(this.state.city);
	}

	/* Render Header component in application with appropriate icons and application name */
	render() {
		return (
				<div class={"navbar " + style.navbar}>  
					<div class="navbar-inner">
						<div class="left">
							<a href="#" class="link open-notification ">
								<i class={`material-icons ${style.iconNotification}`}>
									notifications
								</i>
							</a> 
						</div>
						<div class="left">InstaWeather</div>
						<div class="right">
							<a href="#" class="link icon-only" onClick={() => this.toggleSearch()}>
								<i class={`material-icons ${style.icon}`}>search</i>
							</a> 
						</div>
						<div class="right">
							<a href="#" class="link icon-only" onClick={() => this.changeMode()}>
								<i class={`material-icons ${style.icon}`}>brightness_4</i>
							</a> 
						</div>
					</div>
					
					<div class="header-search-form" style="display: none">
						<form onSubmit={this.submitHandler}>
							<input type="text" name="city" placeholder="Enter City..." onChange={this.handleChange}/>
							<button type="submit" style="display: none;"></button>
						</form>
					</div>
					
				</div>
		);

	}
}
