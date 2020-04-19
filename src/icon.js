import React from 'react';

const Icon = ({icon}) => (
	<div>
		<img src={`http://openweathermap.org/img/w/${icon}.png`}  alt="weather_icon" />
	</div>
);

export default Icon;