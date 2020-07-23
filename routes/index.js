const router = require('express').Router();
const nodeMailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.post('/', (req, res) => {

    let errors = [];
    const { name, email, message } = req.body;

    if( !name || !email || !message ) { // Checking Validation for all fields
        errors.push({
            message: 'Please Fill all Fields'
        })
    }

    if(errors.length > 0) { // CHECKING WHETHER ERRORS-ARRAY CONTAIN ANY ERROR, IF YES THEN WE RENDER PAGE AGAIN WITH ERRORS
        res.render('index');
    }
    else { // PASSING ALL VALIDATION FIELDS
        // Todo: Work on NodeMailer here
        console.log(req.body);
        req.flash('success_msg', 'You Can now proceed');
        res.redirect('/');
    }

});

module.exports = router;