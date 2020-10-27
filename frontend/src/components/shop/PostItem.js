import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";

const PostItem = ({
	deletePost,
	auth,
	post: { _id, shop, name, avatar, user, comments, date, address, image }
}) => {
	return (
		<Link to={`/posts/${_id}`} className="shop-card">
			<div className="card">
				<h3>{shop}</h3>
				<img src={image} alt="shop" width="150" height="150" />

				<p>{address && address}</p>

				<span className="comment-count">
					{comments.length > 1
						? comments.length + " Reviews"
						: comments.length === 1
						? "1 Review"
						: "Not Yet Reviewed"}
				</span>

				{auth.user && !auth.loading && user === auth.user._id && (
					<p className="date">You created this Shop</p>
				)}
				<p className="date">
					Added on <Moment format="MM/DD/YYYY">{date}</Moment>
				</p>
			</div>
		</Link>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);
