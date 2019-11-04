const dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendContactQueryEmail = (req, res, next) => {
    const msg = {
        to: process.env.CONTACT_US_EMAIL,
        from: req.body.email,
        subject: 'Query from Update24x7 contact us page',
        text: req.body.query,
    };
    
    sgMail.send(msg)
    .then($sgMail => {
        res.send({ errorMsg: null, successMsg: 'Query successfully emailed' });
    })
    .catch(err => {
        // when attempting to post to this route without using sgMail (i.e Postman) err.code is 400
        res.send({ errorMsg: 'Something went wrong (Server Error)', successMsg: null });
    });
}