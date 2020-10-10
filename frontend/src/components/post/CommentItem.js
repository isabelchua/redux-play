import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment, addLike, removeLike } from "../../actions/post";
import Rating from "@material-ui/lab/Rating";

const CommentItem = ({
	addLike,
	removeLike,
	postId,
	comment: { _id, text, name, avatar, user, likes, date, rating },
	auth,
	deleteComment
}) => {
	return (
		<div className="post">
			<div className="user-profile-post">
				<Link to={`/profile/${user}`}>
					<img className="round-img avatar" src={avatar} alt="" />
					<div className="user-details-post">
						<p>{name}</p>
					</div>
				</Link>
			</div>
			<div className="post-content">
				<Rating name="read-only" value={5} readOnly precision={0.5} />
				<p className="post-date">
					Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
				</p>
				<p className="my-1">{text}</p>
				<span>{likes.length > 0 && <span>{likes.length} people found this review helpful</span>} </span>

				<div>was this review helpful?
				<button
					onClick={e => addLike(postId, _id)}
					type="button"
					className="btn thumb green"
				>
					<i className="fas fa-thumbs-up" />{" "}
					
				</button>
				<button
					onClick={e => removeLike(postId, _id)}
					type="button"
					className="btn thumb red"
				>
					<i className="fas fa-thumbs-down" />
				</button>
	</div>
				{auth.user && !auth.loading && user === auth.user._id && (
					<button
						onClick={e => deleteComment(postId, _id)}
						type="button"
						className="btn thumb delete"
					>
						<i className="fas fa-times"></i>
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deleteComment })(
	CommentItem
);
