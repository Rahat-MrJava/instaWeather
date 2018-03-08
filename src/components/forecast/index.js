import { h, Component } from 'preact';
import style from './style';

export default class Forecast extends Component {


	/* Recommendation Logic for participating in outdoor sport */
	recommendation(){


			recommendation = "Yes"
		if(this.props.windSpeed < 5 ){

			recommendation = "No";

		} 


		}


	}



	constructor(props) {
		super(props);
	}

	/* Render correct data for each Forecast component, which stands as a row of 
		information. This data includes, respectively, the description, 
		wind speed, chance of rain, cloud coverage, and visibility */
	render() {
		return (
			<div class={"row " + style.bodyrow}>
				<div class={style.block + " " + style.col1}>
					{this.props.desc}
				</div>
				<div class={style.block + " " + style.col2}>
					{this.props.windSpeed}
				</div>
				<div class={style.block + " " + style.col3}>
					{this.props.chanceRain}
				</div>
				<div class={style.block + " " + style.col4}>
					{this.props.cloudCoverage}
				</div>
				<div class={style.block + " " + style.col5}>
					{this.props.visibility}
				</div>
			</div>
		);
	}
}
