import React from 'react';
import axios from 'axios';
import Day from './day';
import Icon from './icon';
import TempMax from './tempmax';
import TempMin from './tempmin';
import Description from './description';
import Return from './return';


const API_KEY = "e102cc873d6623291973f74bc86a9d13";

 class WeatherDetail extends React.Component{
 	constructor(props){
 		super(props);

 		this.state = {
 			data: [],
 			details: [],
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
  		axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.data}&appid=${API_KEY}&units=metric`)
		.then(response => { 
			const data = response.data.list;
			this.setState({ data }); 

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


		})
		.catch( error => console.log(error)	);
  	}

	render(){
		return(
			<div className="weather-detail">
				<div className="weath-location">
					<h3>{this.props.location}</h3>
				</div>
				<div className="day-name">
					<h4>{this.props.match.params.nameOfDay}</h4>
				</div>
				<ul className="row">
				{ this.state.details.map(detail => ( 
					<li key={detail.id} className="col-md-3">
						<div>Time: {detail.dateTime}</div>
						<Icon icon={detail.icon} />
						<TempMin temp={`Min_Temp: ${detail.minTemp}`} /><br/>
						<TempMax temp={`Max_Temp: ${detail.maxTemp}`} />
						<Description desc={`Desc: ${detail.weathDesc}`} />
					</li>
				))}
				</ul>
				<Return className="col-md-12" />
			</div>
		);
			
	}
}

export default WeatherDetail;