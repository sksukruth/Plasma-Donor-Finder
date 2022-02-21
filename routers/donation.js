const express = require("express")
const router = new express.Router()
const passport = require("passport")
const User = require("../modules/user")
const Donor = require('../modules/donor')
const Request = require('../modules/request')
const { isLoggedIn } = require("../middleware/middleware")
const Donation = require('../modules/donation')

router.post("/settings",isLoggedIn,(req,res) => {
	Donor.findOne({donor_id:req.user._id},(err,donor) => {
	Donation.findOne({donor_id:donor._id},(err,result) => {
		if(result){
			Donation.deleteOne({donor_id:donor._id},(err,result1)=>{
				if(result)
				{
		
		Donation.insertMany({"donor_id":donor._id,"no_of_times_donation":req.body.no_of_times_donation,"last_date_donation":req.body.last_date_donation},(err,result) => {
		if(err)
		{

			req.flash('error',err.message)
			res.redirect('back')
		}
		else{
			
			req.flash('success','Updated Successfully')
			res.redirect('./settings')
		}
		})
	}

})
}
else
	{
		
	Donation.insertMany({"donor_id":donor._id,"no_of_times_donation":req.body.no_of_times_donation,"last_date_donation":req.body.last_date_donation},(err,result) => {
		if(err)
		{
			req.flash('error',err.message)
			res.redirect('back')
		}
		else{
			req.flash('success','Submitted Successfully')
			res.redirect('./settings')
		}
		})

}
})
});
});


module.exports = router;

