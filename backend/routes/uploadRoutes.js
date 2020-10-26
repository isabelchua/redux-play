const path = require("path");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
//const upload = multer(storage);
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	}
});

// const storageShop = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, "uploads/shop/");
// 	},
// 	filename(req, file, cb) {
// 		cb(
// 			null,
// 			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// 		);
// 	}
// });

const storageReview = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/review/");
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}}`);
	}
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb("Images only!");
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
});

// const uploadShop = multer({
// 	storageShop,
// 	fileFilter: function (req, file, cb) {
// 		checkFileType(file, cb);
// 	}
// });

const uploadReview = multer({
	storageReview,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
});

router.post("/", upload.single("image"), async (req, res) => {
	// const { filename: image } = req.file;

	// await sharp(req.file.path)
	// 	.resize(300, 200)
	// 	.jpeg({ quality: 50 })
	// 	.toFile(path.resolve(req.file.destination, "resized", image));

	// fs.unlinkSync(req.file.path);
	res.send(`${req.file.path}`);
});

// router.post("/shop", uploadShop.single("image"), async (req, res) => {
// 	res.send(`${req.file.path}`);
// });

router.post("/review", uploadReview.single("image"), async (req, res) => {
	res.send(`${req.file.path}`);
});

module.exports = router;
