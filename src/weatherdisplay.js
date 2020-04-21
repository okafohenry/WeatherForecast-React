import React from 'react';
import {Link} from 'react-router-dom';
import Day from './day';
import Icon from './icon';
import TempMax from './tempmax';
import TempMin from './tempmin';
import Overlay from './overlay';

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
		<div className="weath-location">
			<h3>{props.location}</h3>
		</div>
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
						<Overlay />
					</li>
				</Link>
				))
			}	
		</ul>
	</div>
	);
}




export default WeatherDisplay;