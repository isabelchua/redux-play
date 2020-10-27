const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	shopname: {
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
	reviews: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			note: {
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

module.exports = Shop = mongoose.model("shop", ShopSchema);
