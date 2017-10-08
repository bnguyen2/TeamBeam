import React from 'react';

const UserPost = (props) => {
	let posts = props.posts.map(post => <li> {post.message} </li>);
	console.log(props);

	return (
		<div>
			<h3> Recent Posts </h3>
			<div> {posts} </div>
		</div>
	)
}


export default UserPost