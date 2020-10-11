import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ShopBanner from "../shop/ShopBanner";

const Post = ({
	getPost,
	post: { post, loading },
	auth: { isAuthenticated },
	match
}) => {
	useEffect(() => {
		getPost(match.params.id);
		// eslint-disable-next-line
	}, [getPost]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<div className="main-wrap">
			<div className="col1">
				<ShopBanner post={post} />
			</div>
			<div className="col2">
				{isAuthenticated && <CommentForm postId={post._id} />}
				<div className="sort">
					<p className="right">Sort by Date</p>
				</div>
				<div className="comments">
					{post.comments.map(comment => (
						<CommentItem
							key={comment._id}
							comment={comment}
							postId={post._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
