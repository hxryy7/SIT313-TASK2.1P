const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path')

var api_key = 'key-705027d2be655ca4c5fb66a6736ba10a';
var domain = 'sandboxbb179c156bcd4b4db032b747eebcd6f7.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/task2.1p.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.Email
    console.log(Email)
    const to_say = {
        from: 'Harvardaan Chahal <harvardaan4790.be22@chitkara.edu.in>',
        to: Email,
        subject: "Greetings...",
        text: "Thanks for subscribing to our mail, you will get to know about the updates as we proceed."
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('Sorry an error has occured and needs to be resolved.');
        }

        console.log(body);
        res.send(__dirname + '/task2.1p.html');
    });

});

application.listen(2504, () => {
    console.log("Server is running at port 2504")
})