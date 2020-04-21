import React from 'react';
import { Link } from 'react-router-dom';

const Return = () => ( 
	<div className="ret-btn-cont">
		<Link to='/'>
			<button className="return-btn"> Return to home page </button>
		</Link>
	</div>
);

export default Return;