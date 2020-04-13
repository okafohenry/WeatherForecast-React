import React from 'react';

const Entry = (props) => (
	<div className="entry">
		<input
			placeholder="city,country e.g Abuja,NG"
			className="search_box"
			type="text"
			onChange={props.handleChange}
		 />
		<button 
			onClick={props.handleClick} 
			className="btn btn-search">search</button>
	</div>
);

export default Entry;