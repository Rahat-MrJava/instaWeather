import { h, Component } from 'preact';
import style from './style';

export default class TableHeader extends Component {

	constructor(props) {
		super(props);
	}

	/* Render header for forecast tables, indicating what information is
		displayed in each column (wind speed, chance of rain, cloud coverage, 
		and visibility) along with the appropriate icon */
	render() {
		return (
			<div class="tableHeader">
				<div class={this.props.daily ? style.tableHeaderDaily : "" }>
					<div class={"row " + style.tableHeader}>
						<div class={style.block + " " + style.shade0}>
						</div>
						<div class={style.block + " " + style.shade1}>
							<i class={"wi wi-strong-wind " + style.icon}></i>
							<span class={style.blockData}>Wind Speed</span>
						</div>
						<div class={style.block + " " + style.shade2}>
							<i class={"wi wi-rain " + style.icon}></i>
							<span class={style.blockData}>Chance of Rain</span>
						</div>
						<div class={style.block + " " + style.shade3}>
							<i class={"wi wi-cloud " + style.icon}></i>
							<span class={style.blockData}>Cloud Coverage</span>
						</div>
						<div class={style.block + " " + style.shade4}>
							<i class={"wi wi-dust " + style.icon}></i>
							<span class={style.blockData}>Visibility Level</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}