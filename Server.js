const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path')

var api_key = 'key-6ddebfdae7e0afbfc8c41080398784ef';
var domain = 'sandboxb9261f482a0848539672b514df7ec90a.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));
application.use(express.static("public"));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/Task2.1.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.Email
    console.log(Email)
    const to_say = {
        from: 'Hardik bajaj <vardaanchahal2004@gmail.com>',
        to: Email,
        subject: "Welcome",
        text: "Welcome, Thanks to Subscribing to us, you will receive your confirmation mail soon."
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('Their is an error');
        }

        console.log(body);
        res.send(__dirname + '/Task2.1.html');
    });

});

application.listen(5500, () => {
    console.log("Server is running at port 5500")
})
