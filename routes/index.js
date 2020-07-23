const router = require('express').Router();
const nodeMailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {

    let errors = [];
    const { name, email, message } = req.body;

    if( !name || !email || !message ) { // Checking Validation for all fields
        errors.push({
            message: 'Please Fill all Fields'
        })
    }

    if(errors.length > 0) { // CHECKING WHETHER ERRORS-ARRAY CONTAIN ANY ERROR, IF YES THEN WE RENDER PAGE AGAIN WITH ERRORS
        res.render('index', {
            errors,
            name, email
        });
    }
    else { // PASSING ALL VALIDATION FIELDS
        // let testAccount = nodeMailer.createTestAccount(); // THIS METHOD GENERATE TEST SMTP SERVICE ACCOUNT FROM ETHERNAL.MAIL, ONLY USE THIS WHEN YOU DON'T HAVE ORIGINAL ACCOUNT FOR TESTING

        let transporter = nodeMailer.createTransport({ // CREATING RESUABLE TRANSPORT OBJECT WHICH USE DEFAULT SMTP PORT
            host: 'in-v3.mailjet.com',
            port: 587,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },  
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });

        let info = transporter.sendMail({ // SendMail METHOD IS USED TO SEND EMAIL WITH TRANSPORTER OBJECT  
            from: email,
            to: process.env.EMAIL_TO,
            subject: 'TEST EMAIL',
            html: `<h1> ${message} </h1>`
        });

        info
        .then( () => {
            req.flash('success_msg', 'Successfully Email Sent');
            res.redirect('/');
        } )
        .catch( (error) => {
            console.log(error);
            req.flash('error_msg', 'Failed To Sent Email');
            res.redirect('/');
        } )
    }

});

module.exports = router;