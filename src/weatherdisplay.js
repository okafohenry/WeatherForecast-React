import React from 'react';
import {Link} from 'react-router-dom';

const WeatherDisplay = (props) => { 
	
///multiply timestamp(day) by 1000(milliseconds) 
//handles timestamp conversion to day
	const handleDay = (day) => {
		let days =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let d = new Date(day * 1000); //to get the date time
		let dayName = days[d.getDay()]; //gets day using index equivalence from days array
		return dayName;	
	} 

	return( 
	<div className="weath-disp">
		{props.location}
		<ul className="weath-disp-list">
			{
			props.reports.filter((report, i) => i % 8 === 0)
			.map(report => ( 
				<Link to={`/${handleDay(report.dt)}`}>
					<li key={report.dt} className="weather-item">
						<Day day={handleDay(report.dt)} />
						<Icon icon={report.weather[0].icon} />
						<TempMax temp={report.main.temp_max} />
						<TempMin temp={report.main.temp_min} />
						<div className="text-cont">
							<div className="text"> click for more </div>
						</div>
					</li>
				</Link>
				))
			}	
		</ul>
	</div>
	);
}



const Day = ({day}) => (
	<div className="day">{day}</div>
);

const Icon = ({icon}) => (
	<div>
		<img src={`http://openweathermap.org/img/w/${icon}.png`}  alt="weather_icon" />
	</div>
);

const TempMax = ({temp}) => (
	<span className="temp-max">{temp}&#176;</span>
);

const TempMin = ({temp}) => (
	<span className="temp-min">{temp}&#176;</span>
);



export default WeatherDisplay;