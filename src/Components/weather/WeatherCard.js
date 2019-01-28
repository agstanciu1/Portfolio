import React from 'react';
import moment from 'moment';
import './WeatherCard.css';


class WeatherCard extends React.PureComponent {
	
	
	setTempIcon(maxTemp, minTemp) {
		if(maxTemp <= 10 && minTemp <= 10) {
			return (
				<div className="icon cold">
					<i className="fas fa-thermometer-empty"></i>
				</div>
			);
		} else if(maxTemp <= 25) {
			return (
				<div className="icon half">
					<i className="fas fa-thermometer-half"></i>
				</div>
			);
		} else if(maxTemp > 25){
			return (
				<div className="icon high">
					<i className="fas fa-thermometer-full"></i>
				</div>
			);
		}

	}
	jsUcfirst(string)	{
		if(string.includes(' ')) {
			let words = string.split(' ');

    	return words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words[1].charAt(0).toUpperCase() + words[1].slice(1) ;

    } else {
    	return string.charAt(0).toUpperCase() + string.slice(1);
		}
    };
	
	renderCurrentContent = (day) => {
		if(day[0].visibility){
			const dayData = moment.unix(day[0].dt).format('dddd, MMMM Do YYYY');


			 return (
			 	<React.Fragment>
					<div className="header_date">
						{dayData}
					</div>
					<div className="content header">	
						<div className="temp_icon_min_max">
							{this.setTempIcon(day[0].main.temp_max, day[0].main.temp_min)}
							<div className = "temp now">
								{Math.round(day[0].main.temp)}
							</div>
						</div>
						<div className="description">
							{this.jsUcfirst(day[0].weather[0].description)}
						</div>
					</div>
					<div className = "extra content hum">
						<span className="floated">
							Humidity: {day[0].main.humidity} %
						</span>
						<span className="floated">
							Pressure: {day[0].main.pressure * 0.75} mm/Hg
						</span>
						<div className ="wind">
							<i className="fas fa-wind"></i>
							<span className="right">
								Max Wind Speeds of: {Math.round(day[0].wind.speed * 3.6)} km/h
							</span>
						</div>
					</div>
			 </React.Fragment>
			 )
		}
	};
			
	renderContent = (day) => {
		//console.log(day);
		const dayData = moment.unix(day[0].dt).format('dddd, MMMM Do YYYY');
		const maxTempDayArray = [];
		const minTempDayArray = [];
		const maxWindSpeedsArray = [];
		let weatherDescription = '';
		let humidity = '';
		let pressure = '';
		day.forEach(day => {
			maxTempDayArray.push(day.main.temp_max);
			minTempDayArray.push(day.main.temp_min);
			maxWindSpeedsArray.push(day.wind.speed);
			const hour = 
				(moment.unix(day.dt).hour() === moment().hour()+1) || 
				(moment.unix(day.dt).hour() === moment().hour()+2) || 
				(moment.unix(day.dt).hour() === moment().hour()+3) || 
				(moment.unix(day.dt).hour() === moment().hour()-1) ||
				(moment.unix(day.dt).hour() === moment().hour());
			if((moment.unix(day.dt).date() === moment().date()) && hour) {
				weatherDescription = day.weather[0].description;
				humidity = day.main.humidity;
				pressure = Math.round(day.main.pressure * 0.75);
			} else if (moment.unix(day.dt).hour() === 14) {
				weatherDescription = day.weather[0].description;
				humidity = day.main.humidity;
				pressure = Math.round(day.main.pressure * 0.75);
			}
		});
		const maxTempDay = Math.round(maxTempDayArray.sort((a, b) => {return a-b}).pop());
		const minTempDay = Math.round(minTempDayArray.sort((a, b) => {return a-b}).shift());
		const maxWindSpeed = Math.round(maxWindSpeedsArray.sort((a, b) => {return a-b}).pop() * 3.6);
		
		if(!day[0].visibility){
			return (
					<React.Fragment>
						<div className="header_date">
							{dayData}
						</div>
						<div className="content header">
							{this.renderCurrentContent(day)}
							
							<div className="temp_icon_min_max">
								{this.setTempIcon(maxTempDay, minTempDay)}
								<div className = "temp">
									<span className="temp-min-max">
										Max: {maxTempDay}
									</span>
									<span className="temp-min-max">
										Min: {minTempDay}
									</span>
								</div>
							</div>
							<div className="description">
								{this.jsUcfirst(weatherDescription)}
							</div>
						</div>
						<div className = "extra content hum">
							<span className="floated">
								Humidity: {humidity} %
							</span>
							<span className="floated">
								Pressure: {pressure} mm/Hg
							</span>
							<div className ="wind">
								<i className="fas fa-wind"></i>
								<span className="right">
									Max Wind Speeds of: {maxWindSpeed} km/h
								</span>
							</div>
						</div>
					</React.Fragment>
					);
		}
	}


	render() {
		return (
			<div className="card">
				{this.renderContent(this.props.data)}
				{this.renderCurrentContent(this.props.data)}
			</div>
				
			);
	}
}

export default WeatherCard;