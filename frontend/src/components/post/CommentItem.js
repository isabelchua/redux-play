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
	comment: { _id, text, name, avatar, user, likes, date, rating, location },
	auth,
	deleteComment
}) => {
	return (
		<div className="post">
			<div className="user-profile-post">
				<div className="review-top">
					<Link to={`/profile/${user}`}>
						<img className="round-img avatar" src={avatar} alt="" />
						<div className="user-details-post">
							<strong>
								<p>{name}</p>
							</strong>
							{/* <p>{location}</p> */}
							<p>San Francisco</p>
						</div>
					</Link>

					<div className="review-upper-right">
						<Rating name="read-only" value={5} readOnly precision={0.5} />
						<p className="post-date">
							Reviewed on <Moment format="MM/DD/YYYY">{date}</Moment>
						</p>
					</div>
				</div>
			</div>
			<div className="post-content">
				<p className="my-1">{text}</p>

				<div className="review-bottom">
					<div className="review-bottom-left">
						{likes.length > 0 && (
							<div>{likes.length} fellow found this review helpful</div>
						)}{" "}
					</div>

					<div className="review-bottom-right">
						{" "}
						{auth.user && !auth.loading && user === auth.user._id ? (
							<button
								onClick={e => deleteComment(postId, _id)}
								type="button"
								className="btn delete"
							>
								<span className="space-right">Delete your post</span>{" "}
								<i className="fas fa-times" />
							</button>
						) : (
							<>
								<span className="space-right">
									Was this review helpful?
								</span>

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
							</>
						)}
					</div>
				</div>
			</div>
			<div className="bottom-delete"></div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deleteComment })(
	CommentItem
);
