const { response } = require('express');
const express = require('express');
//require is the old version of import, because node is older than react without ES6
//const cors = require('cors');
    //cors also depreciated
//const bodyParser = require('body-parser');
    //bodyParser depereciated, use express in place
const path = require('path');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

//bring stripe into server
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
//if a port is listed in ENV it uses that, otherwise it uses port 5000, while primary app runs on 3000. Then set in 'proxy' on the app (client/package.json) to port 5000
const port = process.env.PORT || 5000;

//app.use(bodyParser.json());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//app.use(cors()); -- used to make sure origin is the same as the request, BUT now it's included in express

//now for when server is LIVE, it tells what to do with each of the static 'build' files. DIRNAME is the 'directory' we're currently in.
if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    //this function is ANY path we request from the server, with a request and a response. This is default function.
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

app.listen(port, error => {
    if(error) throw error;
    console.log('server running on port ' + port);
});

// /payment is name of route. this gets our token, which is all the payment information we need to send to stripe
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({error: stripeErr});
        } else {
            res.status(200).send({success: stripeRes});
        }
    });
});