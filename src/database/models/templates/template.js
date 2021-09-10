const mongoose = require("mongoose");
module.exports = mongoose.model("templates", 
	new mongoose.Schema({
		id: String,
    boosted: String,
		name: String,
		icon: String,
		ownerID: String,
		longDesc: String,
		shortDesc: String,
		tags: Array,
		link: String,
		votes: {type: Number, default: 0},
		analytics: Object,
		analytics_visitors: Number,
		analytics_joins: Number,
		country: Object,
		rates: Object
	})
);
