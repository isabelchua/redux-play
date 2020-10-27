const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Shop = require("../../models/Shop");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id
		});

		if (!profile) {
			return res
				.status(400)
				.json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/", auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const {
		avatar,
		website,
		location,
		bio,
		youtube,
		facebook,
		twitter,
		instagram
	} = req.body;

	// Build profile object
	const profileFields = {};
	profileFields.user = req.user.id;

	if (website) profileFields.website = website;
	if (avatar) profileFields.avatar = avatar;
	if (location) profileFields.location = location;
	if (bio) profileFields.bio = bio;

	// Build social object
	profileFields.social = {};
	if (youtube) profileFields.social.youtube = youtube;
	if (twitter) profileFields.social.twitter = twitter;
	if (facebook) profileFields.social.facebook = facebook;
	if (instagram) profileFields.social.instagram = instagram;

	try {
		let profile = await Profile.findOne({ user: req.user.id });
		// let userAvatar = await User.findById(req.user.id);

		// console.log(userAvatar);

		if (profile) {
			// Update

			// if (userAvatar) {
			// 	userAvatar = await User.findOneAndUpdate(
			// 		{ user: req.user.id },
			// 		{ $set: avatar },
			// 		{ new: true }
			// 	);
			// }

			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);

			return res.json(profile);
		}

		// Create
		profile = new Profile(profileFields);

		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find();
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		});

		if (!profile) return res.status(400).json({ msg: "Profile not found" });

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Profile not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
	try {
		// Remove user posts
		await Shop.deleteMany({ user: req.user.id });
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: "User deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
