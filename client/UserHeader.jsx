import React from 'react';
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap';

const UserHeader = (props) => (
	<Grid>
		<Col>
			<PageHeader>
			  {props.user.username === undefined ? null : props.user.username.substring(0, 1).toUpperCase() + props.user.username.substring(1)}
			</PageHeader>
				<div>Location: US, San Francisco [TBD Data] </div>
				<div>Age: 26 [TBD Data]</div>
	  </Col>
	</Grid>
)

export default UserHeader
