import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
import axios from 'axios';
import './index.css';
import Nav from './nav';
import WeatherDisplay from './weatherdisplay';
import WeatherDetail from './WeatherDetail';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const API_KEY = "e102cc873d6623291973f74bc86a9d13";

class WeatherForecast extends React.Component{


constructor(props){
	super(props);

	this.state = {
		reports : []
	}

}

componentDidMount(){
	axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=abuja,ng&appid=${API_KEY}&units=metric`)
		.then(response  => { 
			const reports = response.data.list	
			this.setState({reports});
			//console.log(reports)
			}
		)
		.catch( error => console.log(error)	);
	
}





	render(){
		return(
			<Router>
				<div className="weather-forecast">
					<Nav value={"Weather Forecast"} />
					<Switch>
					<Route path="/" exact render={(props) => <WeatherDisplay {...props}   reports={this.state.reports} /> }  />
					<Route path="/:nameOfDay" component={WeatherDetail} />
					</Switch>
				</div>
				
			</Router>
			
		);
	}
}


ReactDOM.render(<WeatherForecast />, document.getElementById('root'));