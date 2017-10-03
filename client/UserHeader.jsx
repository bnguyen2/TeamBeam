import React from 'react';
import { PageHeader, Image} from 'react-bootstrap';


const UserHeader = (props) => (
	<div className="container">
		<div>
		<Image src="/assets/thumbnail.png" rounded />
		  <PageHeader> Bao Nguyen </PageHeader>
		  <div>Location: US, San Francisco [TBD Data] </div>
		  <div>Age: 26 [TBD Data]</div>
		</div>
	</div>
)

export default UserHeader