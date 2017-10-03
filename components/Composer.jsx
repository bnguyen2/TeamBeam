import React from 'react';
import ReactDOM from 'react-dom';
import UserHeader from './UserHeader.jsx'
import AboutMe from './AboutMe.jsx'
import RecentTracks from './RecentTracks.jsx'
import UserPost from './UserPost.jsx'
import Collaboration from './Collaboration.jsx'

class Composer extends React.Component {
	constructor(props) {
		super (props);

		this.state = {
			data: []
		};
	}

	render() {
    return (
    	<div className="nav-bar">
    	  <div className="user-header"> <UserHeader/> </div>
    	  <div className="about-me"> <AboutMe/> </div>
    	  <div className="recent-track"> <RecentTracks/> </div>
    	  <div className="user-post"> <UserPost/> </div>
    	  <div className="collaboration"> <Collaboration/> </div>
    	</div>
    );
	}
}

export default Composer;


