import React from 'react';
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap';

const UserHeader = (props) => (
	<Grid className="user">
		<Col>
			<PageHeader>
			  {props.user.username === undefined ? null : props.user.username.substring(0, 1).toUpperCase() + props.user.username.substring(1)}
			</PageHeader>
			<div>
				<div>Location: US, San Francisco </div>
				<div>Age: 26</div>
			</div>
	  </Col>
	</Grid>
)

export default UserHeader
