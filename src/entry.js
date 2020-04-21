import React from 'react';

const Entry = (props) => (
	<div className="entry">
		<input
			placeholder="city name e.g Abuja"
			className="search_box"
			type="text"
			onChange={props.handleChange}
		 />
		<button 
			onClick={props.handleClick} 
			className="btn-search">search</button>
	</div>
);

export default Entry;