import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import axios from 'axios';
import './index.css';
import Nav from './nav';
import Entry from './entry.js';
import LoadingIcon from './loading_icon';
import WeatherDisplay from './weatherdisplay';
import WeatherDetail from './WeatherDetail';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';


const API_KEY = "e102cc873d6623291973f74bc86a9d13";

class WeatherForecast extends React.Component{


constructor(props){
	super(props);

	this.state = {
		data : "",
		location: "",
		reports : [],
		loading : false
	}
	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);

}
handleChange(event){
		const target = event.target;
		const data = target.value; //gets value of the textbox 
		this.setState({ data });
}
handleClick(){
		if(this.state.data === ""){
			return;
		}else{
			this.setState({ loading: true }, () =>{
			axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.data}&appid=${API_KEY}&units=metric`)
		.then(response  => { 
			const reports = response.data.list;
			const more_info = response.data.city;
			this.setState({ 
				loading: false, 				
				location: more_info.name,
				reports
				});
			})
		.catch( error => console.log(error)	);
	});
		}
}


	render(){
		return(
				<Router>
					<div className="weather-forecast">
						<Nav value={"Weather Forecast"} />
						<Entry 
						 		handleChange={this.handleChange} 
						 		handleClick={this.handleClick} />
						{
						 this.state.loading ? <LoadingIcon /> :
						<Switch>
							<Route path="/" exact 
									render={(props) => <WeatherDisplay {...props} 
									location={this.state.location}   
									reports={this.state.reports} /> }  />

							<Route path="/:nameOfDay" 
									render={(props) =>  <WeatherDetail {...props} 
									data={this.state.data} 
									location={this.state.location} />} />
						</Switch>
						}
					</div>
					
				</Router>
		);
	}
}


ReactDOM.render(<WeatherForecast />, document.getElementById('root'));