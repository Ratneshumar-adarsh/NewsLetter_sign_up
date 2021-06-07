const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.get("/", function (req, res) {
      res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function (req, res) {
      var firstname = req.body.First_name;
      var lastname = req.body.Last_name;
      var email = req.body.email;
      console.log(firstname, lastname, email);

      var data = {
            members: [
                  {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                              FNAME: firstname,
                              LNAME: lastname
                        }
                  }

            ]
      };
      var jsondata = JSON.stringify(data);
      const url = "https://us6.api.mailchimp.com/3.0/lists/d6730aa14b";
      const options = {
            method: "POST",
            auth: "ratnesh:6568d4bc32fadaf6952a80512ffee42a-us6"
      }
      const request = https.request(url, options, function (response) {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                  res.sendFile(__dirname + "/success.html");
            } else {
                  res.sendFile(__dirname + "/failure.html");
            }
            response.on("data", function (data) {
                  console.log(JSON.parse(data));
            });
      });
      request.write(jsondata);
      request.end();

});
app.post("/failure", function (req, res) {
      res.redirect("/");
});





//api key
// 6568d4bc32fadaf6952a80512ffee42a-us6

// id 
// d6730aa14b







































// app.post("/", function (req, res) {
//       console.log("post is received");
//       const firstname = req.body.First_name;
//       const lastname = req.body.Last_name;
//       const email = req.body.email;
//       console.log(firstname, lastname, email);

//       var data = {
//             members: [
//                   {
//                         email_address: email,
//                         status: "subscribed",
//                         merge_fields: {
//                               FNAME: firstname,
//                               LNAME: lastname
//                         }
//                   }
//             ]
//       };
//       var jsondata = JSON.stringify(data);
//       const url = "https://us6.api.mailchimp.com/3.0/lists/0c85e85c89";
//       const option = {
//             method: "post",
//             auth: "ratnesh :3a4826a043697d05f61308b1f2bd76af-us6 "
//       }
//       const request = https.request(url, option, function (response) {
//             response.on("data", function (data) {
//                   console.log(JSON.parse(data));
//             })
//       });
//       request.write(jsondata);
//       request.end();
// })




// app.listen(3000, function () {
//       console.log("server 3000 is running and newsletter-sign is working");
// })

app.listen(process.env.PORT || 3000, function () {
      console.log("server 3000 is running and newsletter-sign is working");
})


//api key
//3a4826a043697d05f61308b1f2bd76af-us6


//list id
//0c85e85c89