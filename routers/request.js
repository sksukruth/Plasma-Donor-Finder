const express = require("express")
const router = new express.Router()
const passport = require("passport")
const Request = require("../modules/request")
const User = require("../modules/user")
const Donor = require('../modules/donor')
const { isLoggedIn } = require("../middleware/middleware")

router.get("/home", (req, res) => {
    res.render("home")
});
router.get("home", (req, res) => {
    res.render("home")
});


router.get('/request', isLoggedIn , (req ,res) => {
	Request.countDocuments({request_id:req.user},(err,result) => {
        if(err)
        {
            req.flash('error',err.message)
            res.redirect('home')
        }
		if(result <3)
		{
			res.render("request")
		}
		else
		{
			req.flash('error', "You can request only 3 ");
			req.flash('info','You can delete previous requests')
            res.redirect('./home')
		}

	})
	
});
router.get("/requestlist", (req, res) => {	
    Request.find({},(err, result) => {
        if (err) {

            req.flash('error',err.message)
            res.render("home")
        } else {
              res.render("requestlist", { user: result });
}
})
})


router.get("/settings",isLoggedIn ,(req,res) => {
    Donor.findOne({donor_id:req.user._id},(err,result1) =>{
        Request.find({request_id:req.user._id},(err,result2) => {
            if(!err){
                res.render("settings",{donor : result1,request : result2})
            }
            else{
                req.flash('error',err.message)
                res.render('home')
            }
        })
        if(err && !result1)
        {
            req.flash('error',err.message)
            res.render("home")
        }

    })
    
})




router.post("/request", (req, res) => {
	Request.countDocuments({request_id:req.user},(err,result) => {
        if(result>=3)
        {
            req.flash('error', "You can request only 3 ");
            req.flash('info','You can delete previous requests')
            res.redirect('home')
        }
        else
        {
            
	
	var request1= new Request({
		request_id:req.user._id,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		gender:req.body.gender,
		date_of_birth:req.body.date_of_birth,
		blood_group:req.body.blood_group,
		email:req.body.email,
		city:req.body.city,
		phone_number:req.body.phone_number,
		address:req.body.address,
		message:req.body.message,
		pincode:req.body.pincode
	})
	request1.save((err,doc) => {
        if(!err)
        {
        	req.flash('success', "Requested Successfully");
            res.redirect('./home')
        }
        else{
          //  console.log('Error during insert'+err)
            req.flash('error', err.message);
        }
    })
}
});
})

router.get("/requestview/:id", (req, res) => { 
	Request.findOne({_id:req.params.id},(err , result) => {
		res.render("requestview",{user : result})
	})
})




router.post("/requestlist", (req, res) => {
	var b=req.body.blood_group,
		c=req.body.city,
		p=req.body.pincode
	//console.log(b,c,p)
	if(b && c && p)
	{
    Request.find(
    	{
    	blood_group:b ,
    	city:c,
    	pincode:p
    }
    ,
    (err, result) => {
        if (err) {
            req.flash('error', err.message);
            res.render("home")
        } else {
              res.render("requestlist", { user: result });}})
	}
	else{
		Donor.find({
			blood_group:b,city:c
		},
		(err,result) => {
			if (err) {
				req.flash('error', err.message);
				res.render("home")
			}else{
				res.render("requestlist",{user:result})
			}
		})
	}

})
router.post("/requestdelete",isLoggedIn, (req, res) => {  
    Request.deleteOne({_id:req.body.request_id,request_id:req.user._id},(err,result) => {
        if(result)
        {
            req.flash('success','Request deleted Successfully')
           Request.find({},(err,result) => {
         res.redirect("./home")
           })
        }   
        else{
            req.flash('error',err.message)
            res.redirect("./home")
        }
        })
    })



module.exports = router;
