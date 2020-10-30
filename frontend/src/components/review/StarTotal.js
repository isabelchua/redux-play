import React from "react";
import Rating from "@material-ui/lab/Rating";
import { connect } from "react-redux";

import { getPost } from "../../actions/post";

const StarTotal = ({ getPost, post: { post, loading } }) => {
	const getRatingTotal = rate =>
		rate?.reduce((amount, item) => item.rating + amount, 0);
	// console.log(post.reviews);
	// if (post) {
	// 	console.log(
	// 		"rating total: " + getRatingTotal(post.reviews) / post.reviews.length
	// 	);
	// 	// console.log(post.reviews.length);
	// }

	return (
		<div>
			{/* {getRatingTotal(post.reviews.rating)} */}
			<Rating
				name="read-only"
				value={getRatingTotal(post.reviews) / post.reviews.length}
				readOnly
				precision={0.5}
			/>
		</div>
	);
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(StarTotal);
