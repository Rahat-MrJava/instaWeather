import { h, Component } from 'preact';
import style from './style';
import $ from 'jquery';// import jquery for API calls for JSON

export default class Tile extends Component {

	constructor(props) {
		super(props);
	}

	/* Select appropriate data and associated CSS stylings for a given Tile 
		component based on properties passed in */
	selectData(title) {
  		switch(title) {
  			case "Temperature":
	  			this.props.large = true;
	  			this.props.colour = "shade1";
  				this.props.icon = "thermometer";
	  			this.props.data = parseInt(this.props.data) + "'C"; 
	  			break;
  			case "Cloud Cover":
  				this.props.large = true;
  				this.props.colour = "shade3";
  				this.props.icon = "cloud";
	  			this.props.data = parseInt(this.props.data*100) +"%"; 
	  			break;
	  		case "Chance Of Rain":
	  			this.props.large = true;
	  			this.props.colour = "shade2";
  				this.props.icon = "rain";
	  			this.props.data = parseInt(this.props.data*100) + "%"; 
	  			break;
	  		case "Average Visibility":
	  			this.props.large = true;
	  			this.props.colour = "shade4";
  				this.props.icon = "dust";
	  			this.props.data = parseInt(this.props.data) + " mi"; 
	  			break;
			case "Wind Speed":
				this.props.large = true;
				this.props.colour = "shade1";
  				this.props.icon = "strong-wind";
	  			this.props.data = parseInt(this.props.data) + " mph"; 
	  			break;
	  		case "Humidity":
	  			this.props.large = true;
	  			this.props.colour = "shade2";
  				this.props.icon = "humidity";
	  			this.props.data = parseInt(this.props.data*100) + "%"; 
	  			break;
	  		default:
	  			return;
	  	}
  	}

  	/* Render appropriate Tile utilizing associated data, icon, and CSS properties */
	render() {
		if (this.props.title == "Rating") {
			return (
				<div class={`
					${style.tile} 
					${style.rating } 
					${style[this.props.colour]}
				`}>
				</div>
			);
		}
		this.selectData(this.props.title);
		return (
			<div class={`
				${style.tile} 
				${this.props.large ? style.tile50 : style.tile25 } 
				${style[this.props.colour]}
			`}>
				<i class={`wi wi-${this.props.icon} ${style.icon}`}></i>
				<span class={style.tileData}>
					{this.props.title}<br/> 
					{this.props.data} 
				</span> 
			</div>
  		);
	}

}
