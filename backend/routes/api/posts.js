const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
// const { removeLike } = require("../../client/src/actions/post");
const auth = require("../../middleware/auth");

const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    POST api/posts
// @desc     Add a Shop
// @access   Private
router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty()]],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPost = new Post({
				text: req.body.text,
				address: req.body.address,
				description: req.body.description,
				phone: req.body.phone,
				short: req.body.short,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});

			const post = await newPost.save();

			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Public
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		// Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		await post.remove();

		res.json({ msg: "Post removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/like/shop:id/:id
// @desc     Like a Review
// @access   Private
router.put("/like/:id/:review_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Pull out Review
		const comment = post.comments.find(
			comment => comment.id === req.params.review_id
		);

		// Make sure Review exists
		if (!comment) {
			return res.status(404).json({ msg: "Review does not exist" });
		}

		// Check if the Review has already been liked

		if (
			comment.likes.filter(like => like.user.toString() === req.user.id)
				.length > 0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}
		//console.log(comment.likes);
		comment.likes.unshift({ user: req.user.id });
		//console.log(comment.likes);

		await post.save();
		//res.json(post.likes);
		res.json(comment.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/like/shop:id/:id
// @desc     Unlike a Review
// @access   Private
router.put("/unlike/:id/:review_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// Pull out Review
		const comment = post.comments.find(
			comment => comment.id === req.params.review_id
		);

		// Make sure Review exists
		if (!comment) {
			return res.status(404).json({ msg: "Review does not exist" });
		}

		// Check if the Review has already been liked
		if (
			comment.likes.filter(like => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}

		// Get remove index
		const removeIndex = comment.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		//console.log(comment.likes);

		comment.likes.splice(removeIndex, 1);

		//console.log(comment.likes);

		await post.save();
		//res.json(post.likes);
		res.json(comment.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put("/unlike/:id/:review_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if the post has already been liked
		if (
			post.likes.filter(like => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: "Post has not yet been liked" });
		}

		// Get remove index
		const removeIndex = post.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/posts/comment/:id
// @desc     Add a Review
// @access   Private
router.post(
	"/comment/:id",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	upload.single("image"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		//const { rating } = req.body;

		// const postFields = {};

		// if (rating) postFields.rating = rating;

		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = await Post.findById(req.params.id);

			// Upload image to cloudinary
			const fileStr = req.file.path;
			const result = await cloudinary.uploader.upload(fileStr, {
				upload_preset: "reviews"
			});

			const userProf = await Profile.findOne({ user: req.user.id });
			//const userProf2 = await Profile.findOne({ user: req.params.id });
			//console.log(userProf.avatar);

			//console.log(req.body.text);
			//console.log(req.body);
			//console.log(userProf.avatar);
			//console.log(userProf2.avatar);

			const newComment = {
				rating: req.body.rating,
				text: req.body.text,
				name: user.name,
				avatar: userProf.avatar,
				user: req.user.id,
				location: userProf.location,
				image: result.secure_url,
				cloud_id: result.public_id
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Pull out comment
		const comment = post.comments.find(
			comment => comment.id === req.params.comment_id
		);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: "Review does not exist" });
		}

		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		// Get remove index
		const removeIndex = post.comments
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
