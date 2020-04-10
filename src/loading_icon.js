import React from 'react';
import Loading from './loading_img.gif';


const LoadingIcon = () => ( 
	<div className="loading-icon">
		<img src={Loading} alt="loading..." className="load_img" /> 
	</div>
);

export default LoadingIcon;