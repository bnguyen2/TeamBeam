import React from 'react';

const AboutMe = (props) => (
	<div className="about-me">
		<h3> About Me </h3>
			<p> {props.aboutme.bio} </p>
	</div>
)

export default AboutMe

