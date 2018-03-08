import { h, Component } from 'preact';
import style from './style';
import $ from 'jquery';

export default class Event extends Component {
	
	constructor(props) {
		super(props);
	}

	/* Render Event with appropriate date, name, and description */
	render() {
		return(
			<div class={"swiper-slide " + style.event}>
			<span class={style.eventDate}>{this.props.eventDate}</span>
			<span class={style.eventTitle}>{this.props.eventName}</span>
			<span class={style.eventDescription}>{this.props.eventDesc}</span>
			</div>
		);
	}
}
