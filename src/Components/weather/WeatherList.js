import React from 'react';
import './WeatherList.css';
import WeatherCard from './WeatherCard';


class WeatherList extends React.PureComponent {

	render() {
		const days = this.props.data.map(day => {
					return <WeatherCard key={day[0].dt} data={day} />
				});

		return <React.Fragment>
					<div className="ui link cards">
						{days}
					</div>
				</React.Fragment>
	}
}

export default WeatherList;