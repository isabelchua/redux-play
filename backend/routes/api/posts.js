const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const cloudinary = require("../../utils/cloudinary");
const upload = require("../../utils/multer");

const Shop = require("../../models/Shop");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    POST api/posts
// @desc     Add a Shop
// @access   Private
router.post(
	"/",
	[auth, [check("shopname", "Shop Name is required").not().isEmpty()]],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newShop = new Shop({
				shopname: req.body.shopname,
				address: req.body.address,
				description: req.body.description,
				phone: req.body.phone,
				short: req.body.short,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
				image: req.body.image
			});

			const shop = await newShop.save();

			res.json(shop);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route    PUT api/posts
// @desc     Edit a Shop
// @access   Private
router.put("/:id", auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { shopname, phone, image, description, short, address } = req.body;

	// Build shop object
	const postFields = {};
	if (shopname) postFields.shopname = shopname;
	if (phone) postFields.phone = phone;
	if (image) postFields.image = image;
	if (description) postFields.description = description;
	if (short) postFields.short = short;
	if (address) postFields.address = address;

	try {
		let shop = await Shop.findById(req.params.id);
		if (!shop) return res.status(404).json({ msg: "Shop not found" });

		// took time solving this one

		shop = await Shop.findByIdAndUpdate(
			req.params.id,
			{ $set: postFields },
			{ new: true }
		);

		res.json(shop);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
router.get("/", async (req, res) => {
	try {
		const shops = await Shop.find().sort({ date: -1 });
		res.json(shops);
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
		const shop = await Shop.findById(req.params.id);

		if (!shop) {
			return res.status(404).json({ msg: "Shop not found" });
		}

		res.json(shop);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Shop not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/posts/:id
// @desc     Delete a shop
// @access   Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);

		if (!shop) {
			return res.status(404).json({ msg: "Shop not found" });
		}

		// Check user
		if (shop.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		await shop.remove();

		res.json({ msg: "Shop removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({ msg: "Shop not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/like/shop:id/:id
// @desc     Like a Review
// @access   Private
router.put("/like/:id/:review_id", auth, async (req, res) => {
	try {
		const shop = await Shop.findById(req.params.id);
		// Pull out Review
		const comment = shop.reviews.find(
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
			return res.status(400).json({ msg: "Shop already liked" });
		}
		//console.log(comment.likes);
		comment.likes.unshift({ user: req.user.id });
		//console.log(comment.likes);

		await shop.save();

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
		const shop = await Shop.findById(req.params.id);
		// Pull out Review
		const comment = shop.reviews.find(
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
			return res.status(400).json({ msg: "Shop already liked" });
		}

		// Get remove index
		const removeIndex = comment.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id);

		//console.log(comment.likes);

		comment.likes.splice(removeIndex, 1);

		//console.log(comment.likes);

		await shop.save();

		res.json(comment.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    PUT api/posts/unlike/:id
// @desc     Like a shop
// @access   Private
// router.put("/unlike/:id/:review_id", auth, async (req, res) => {
// 	try {
// 		const shop = await Shop.findById(req.params.id);

// 		// Check if the post has already been liked
// 		if (
// 			shop.likes.filter(like => like.user.toString() === req.user.id)
// 				.length === 0
// 		) {
// 			return res.status(400).json({ msg: "Shop has not yet been liked" });
// 		}

// 		// Get remove index
// 		const removeIndex = post.likes
// 			.map(like => like.user.toString())
// 			.indexOf(req.user.id);

// 		shop.likes.splice(removeIndex, 1);

// 		await shop.save();

// 		res.json(shop.likes);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

// @route    POST api/posts/comment/:id
// @desc     Add a Review
// @access   Private
router.post(
	"/comment/:id",
	[auth, [check("note", "Review is required").not().isEmpty()]],
	// upload.single("image"),
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
			const shop = await Shop.findById(req.params.id);

			// // Upload image to cloudinary
			// const fileStr = req.file.path;
			// const result = await cloudinary.uploader.upload(fileStr, {
			// 	upload_preset: "reviews"
			// });

			const userProf = await Profile.findOne({ user: req.user.id });
			//const userProf2 = await Profile.findOne({ user: req.params.id });
			//console.log(userProf.avatar);

			//console.log(req.body);
			//console.log(userProf.avatar);
			//console.log(userProf2.avatar);
			console.log("back" + req.body.image);

			const newComment = {
				rating: req.body.rating,
				note: req.body.note,
				image: req.body.image,
				name: user.name,
				avatar: userProf.avatar,
				user: req.user.id,
				location: userProf.location
				// image: result.secure_url,
				// cloud_id: result.public_id
			};

			shop.reviews.unshift(newComment);

			await shop.save();

			res.json(shop.reviews);
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
		const shop = await Shop.findById(req.params.id);

		// Pull out review
		const comment = shop.reviews.find(
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
		const removeIndex = shop.reviews
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		shop.reviews.splice(removeIndex, 1);

		await shop.save();

		res.json(shop.reviews);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
