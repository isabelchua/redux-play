import axios from "axios";
import { setAlert } from "./alert";

import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
	EDIT_POST
} from "./types";

// Get posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get("/api/posts");

		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Review like
export const addLike = (shop_id, id) => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${shop_id}/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { shop_id, id, likes: res.data }
		});

		dispatch(setAlert("Review Liked", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

export const removeLike = (shop_id, id) => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${shop_id}/${id}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data }
		});

		dispatch(setAlert("Review unliked", "danger"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete Shop
export const deletePost = id => async dispatch => {
	try {
		console.log("delete shop");
		await axios.delete(`/api/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: id
		});

		dispatch(setAlert("Shop Removed", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Shop
export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post("/api/posts", formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data
		});

		dispatch(setAlert("Shop Created", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get Shop
export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Edit Shop
export const editPost = (formData, id, history) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	console.log(formData);
	console.log(id);

	try {
		const res = await axios.put(`/api/posts/${id}`, formData, config);

		dispatch({
			type: EDIT_POST,
			payload: res.data
		});

		// history.push("/dashboard")

		dispatch(setAlert("Shop Updated", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Add Review
export const addComment = (postId, formData, rating) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const res = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			rating,
			config
		);
		//console.log(res);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});

		dispatch(setAlert("Review Added", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
		//console.log("del");
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});

		dispatch(setAlert("Comment Removed", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
