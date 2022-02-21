const mongoose = require("../db/mongoose")
const Donor = require('./donor')

const donationSchema = new mongoose.Schema({
	donor_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Donor"
	},
	no_of_times_donation:{
		type:String
	},
	last_date_donation:{
		type:String
	}
},{
	timestamps: true
})

module.exports = mongoose.model("Donation", donationSchema);