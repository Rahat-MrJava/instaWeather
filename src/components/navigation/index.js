import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';
import App from '../';
import $ from 'jquery';
	
export default class Navigation extends Component {	

	constructor(props) {
		super(props);
	}

	/* Select appropriate icon */
	selectData(title) {
  		switch(title) {
  			case "#view-day":
  				this.props.icon = "alarm";
  				break; 
	  		case "#view-index":
  				this.props.icon = "home";
  				break;
			case "#view-week":
  				this.props.icon = "event";
  				break;
			default:		
				return;
		}
	}

	/* Render appropriate icon and assess whether icon should be in "active" or "inactive" mode */
	render(){
		{this.selectData(this.props.title)}
		return (
			<div class={`
				${style.navigation} 				
			`}>
				<a href={this.props.title} class="link" onClick={() => this.props.onClick()}>
					<i class={`"icon"
						material-icons
						${this.props.active ? style.iconSelected : style.iconNotSelected}
					`} >
						{this.props.icon}
					</i>
				</a>
			</div>
		);
	}	
}

