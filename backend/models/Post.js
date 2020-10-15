const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	phone: {
		type: String
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
	address: {
		type: String
	},
	short: {
		type: String
	},
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			rating: {
				type: Number,
				default: 0
			},
			likes: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: "users"
					}
				}
			],
			date: {
				type: Date,
				default: Date.now
			},
			location: {
				type: String
			},
			cloud_id: {
				type: String
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model("post", PostSchema);
