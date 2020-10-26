import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deletePost } from "../../actions/post";

const PostItem = ({
	deletePost,
	auth,
	post: { _id, text, name, avatar, user, comments, date, address, image }
}) => {
	return (
		<Link to={`/posts/${_id}`} className="shop-card">
			<div className="card">
				<h3>{text}</h3>
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
					<button
						onClick={e => deletePost(_id)}
						type="button"
						className="btn btn-danger"
					>
						<i className="fas fa-times" /> Delete Shop
					</button>
				)}
				<p className="date">
					Added on <Moment format="MM/DD/YYYY">{date}</Moment>
				</p>
			</div>
		</Link>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);
