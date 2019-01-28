import React, { Component } from 'react';
import './WeatherApp.css';
import GetWeather from '../../api/GetWeather';
import moment from 'moment';
import WeatherList from './WeatherList';
import WeatherCard from './WeatherCard';
import Spinner from './Spinner';



class WeatherApp extends Component {
	state = { lat: null, lon: null, errorMessage: '', today: [], data: [], 
				showWeather: false, showToday: false, showAbout: false};
	
	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({ lat: position.coords.latitude, lon: position.coords.longitude });
				},
			(err) => this.setState({ errorMessage: err.message})
		);
	};

	

	setDataForecast = (data, today) => {
		const dataList = data.list;
		this.setState({showWeather: !this.state.showWeather, data: [], showToday: false});
		if(this.state.showWeather) {
			for(let i = 1; i<=5; i++) {
				let newData = dataList.filter((day) => {
						if(moment.unix(day.dt).dayOfYear() === (today + (i-1))) {
							return true;
						} else if ((moment.unix(day.dt).dayOfYear() === (today + i)) && (moment.unix(day.dt).hour() === 2 )) {
							return true;
						} else {
							return false;
						}
					});
				this.setState({data:[...this.state.data, newData]});
			};
		}
	};
	
	showWeather = async (type, dataHandler) => {
					const response = await GetWeather.get(`${type}`, {
						params: {
							lat: this.state.lat,
							lon: this.state.lon
						}
					});
					dataHandler(response.data, moment().dayOfYear());
	}

	setDataToday = (dataList) => {
		this.setState({showWeather: false, today: this.state.today});
		const newData = [dataList];
		if(!this.state.showWeather) {
			this.setState({showToday: !this.state.showToday, today: newData});
		} 
	}

	renderContent() {
		if(this.state.errorMessage && !this.state.lat) {
			return <div className="about">Error: {this.state.errorMessage}</div>
		} 

		if(!this.state.errorMessage && this.state.lat) {
			return <React.Fragment>
				<div className="top-top">
					<button className="massive ui inverted teal button" onClick={() => this.setState({showAbout: !this.state.showAbout})} >About App</button>
					{this.state.showAbout && <span className ="about">
						This project is an API based caller to deliver the weather information for the current time of day and extended forecast and using the browser's build-in geolocation services for positioning.
					</span>}
				</div>
				<div className="top">
					<button className="massive ui inverted teal button" onClick={() => this.showWeather('weather?', this.setDataToday)}>Show current weather</button>
					<button className="massive ui inverted green button" onClick={() => this.showWeather('forecast?', this.setDataForecast)}>Show 5 day forecast</button>
				</div>
				<div className="box">
				{this.state.showWeather && <WeatherList data={this.state.data} />}
				{this.state.showToday && <div className="ui link cards"><WeatherCard data={this.state.today} /></div>}
				</div>
			</React.Fragment>
		}

		return <Spinner message="Please accept location request"/>
	}
			
	render() {
		return (
			<div className = "weatherapp">
				{this.renderContent()}
			</div>
			);
	}
}

export default WeatherApp;