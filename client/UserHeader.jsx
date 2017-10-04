import React from 'react';
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap';

// <Thumbnail alt="350x350" src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg" />

const UserHeader = (props) => (

	<Grid>
		<Col>
			<PageHeader> {props.user.username} </PageHeader>
				<div>Location: US, San Francisco [TBD Data] </div>
				<div>Age: 26 [TBD Data]</div>
	  </Col>
	</Grid>
)

export default UserHeader