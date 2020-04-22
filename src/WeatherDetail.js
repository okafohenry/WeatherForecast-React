import React from 'react';
import axios from 'axios';

import Day from './day';
import DetDay from './det-day';
import Description from './description';
import Time from './time';
import Icon from './icon';
import LoadingIcon from './loading_icon';
import Location from './location';
import Return from './return';
import TempMax from './tempmax';
import TempMin from './tempmin';


const API_KEY = "e102cc873d6623291973f74bc86a9d13";

 class WeatherDetail extends React.Component{
 	constructor(props){
 		super(props);

 		this.state = {
 			data: [],
 			details: [],
 			loading: false,
 			dayName: "",
 			dateTime: "",
 			minTemp: "",
 			maxTemp: "",
 			icon: "",
 			weathDesc: "",
 			id: ""
 		}
 		
 	}

	// Fetch data from API when component mounts
  	componentDidMount(){
		this.setState({ loading: true }, () => {
			axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.data}&appid=${API_KEY}&units=metric`)
				.then( response => { 
					const data = response.data.list;
					this.setState({ data, loading: false }); 

					/*
						loop through API response stored in data array,	for every array element, 
						convert data.dt item into its day equivalent.
						If resulting day(name) matches the props day(day of item clicked), 
						Its matching information is stored in state.
					*/
					const details = [];
					let dateTime, maxTemp, minTemp, icon, weathDesc, id, str;
					for (let i = 0; i < this.state.data.length; i++) {
							let days =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
							let d = new Date(this.state.data[i].dt * 1000); //to get the date time
							let dayName = days[d.getDay()]; //gets day using index equivalence from days array
							
							if(dayName === this.props.match.params.nameOfDay){

								str = this.state.data[i].dt_txt
								dateTime = str.substr(11,8);  //extracts the next 8 character starting from the 11th char.
								maxTemp = this.state.data[i].main.temp_max;
								minTemp  = this.state.data[i].main.temp_min;
								icon = this.state.data[i].weather[0].icon;
								weathDesc = this.state.data[i].weather[0].description;
								id = this.state.data[i].dt;

								details.push({dayName, dateTime, maxTemp, minTemp, icon, weathDesc});
								this.setState({ details });
						}
						
					}	


				}).catch( error => console.log(error)	);
  	
  	});

}
	render(){
		return(
			<div className="weather-detail">
				<Location  location={this.props.location} />
				<DetDay  det_day={this.props.match.params.nameOfDay} />
				{ this.state.loading ? <LoadingIcon /> :
				<div>
					<ul className="row">
					{ this.state.details.map(detail => ( 
						<li key={detail.id} className="col-md-3">
							<Time time={`Time: ${detail.dateTime}`} />
							<Icon  icon={detail.icon} />
							<TempMin temp={`Min_Temp: ${detail.minTemp}`} /><br/>
							<TempMax temp={`Max_Temp: ${detail.maxTemp}`} />
							<Description desc={`Desc: ${detail.weathDesc}`} />
						</li>
					))}
					</ul> 
					<Return />
				</div>
				}
			</div>
		);
			
	}
}

export default WeatherDetail;