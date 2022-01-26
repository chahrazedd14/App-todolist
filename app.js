var express = require("express");
var app = express();
var path = require("path");
var request = require("request");
var bodyParser = require("body-parser");
const ejs = require("ejs");
const Store = require("electron-store");

const store = new Store();

const BASE_URL = "http://localhost/api";

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.listen(8080, function() {
    console.log("Your application is listening on port 8080!");
});

app.get("/index", function (req, res) {
    res.render("index", { name: "netodoBook", code: false, invalid: false });
});

app.get("/", function (req, res) {
    res.render("index", { name: "netodoBook", code: false, invalid: false });
});

app.get("/nav", function (req, res) {
    res.render("nav", { name: "netodoBook", username123: "" });
});

app.get("/dash", function (req, res) {
    res.render("dash", { name: "netodoBook" });
});

app.get("/pomodoro", function (req, res) {
    res.render("pomodoro", { name: "netodoBook" });
});

app.get("/todo", function(req, res) {
    var user_id = store.get("user_id");

    var options = {
        method: "POST",
        url: BASE_URL + "/gettodo",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: user_id,
        }),
    };
    request(options, function(error, response) {
        if (response.statusCode == "200") {
            res.render("todolist", {
                tasks: JSON.parse(response.body),
                msg: store.get("notification"),
            });
        } else {}
    });
});

app.get("/calender", function(req, res) {
    res.render("calender", { name: "netodoBook" });
});

app.post("/get_todo", function(req, res) {
    var id = req.body.id;

    var options = {
        method: "GET",
        url: BASE_URL + "/gettodobyid",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    };
    request(options, function(error, response) {
        if (response.statusCode == "200" && response.body != "") {
            res.send(response.body);
        }
    });
});

app.post("/addtodolist123456", function(req, res) {
    var task_title = req.body.task_title;
    var task_desc = req.body.task_desc;
    var task_priority = req.body.task_priority;

    var task_status = "inprogress";

    var user_id = store.get("user_id");

    var options = {
        method: "POST",
        url: BASE_URL + "/addtodolist123",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task_title: task_title,
            task_description: task_desc,
            task_priority: task_priority,
            task_status: task_status,
            user_id: user_id,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            store.set("notification", "Task Added Successfully!");
            //res.redirect("/todo");
        }
    });
});

app.post("/updatetodolist123456", function(req, res) {
    var task_title = req.body.task_title;
    var task_desc = req.body.task_desc;
    var task_priority = req.body.task_priority;
    var id = req.body.id;

    var options = {
        method: "POST",
        url: BASE_URL + "/updatetodolist123",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task_title: task_title,
            task_description: task_desc,
            task_priority: task_priority,
            id: id,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            store.set("notification", "Task Updated Successfully!");
            res.redirect("/todo");
        }
    });
});

app.post("/complete_task123", function(req, res) {
    var id = req.body.id;

    var task_status = "completed";

    var options = {
        method: "POST",
        url: BASE_URL + "/completetask123",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            task_status: task_status,
            id: id,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            store.set("notification", "Task Completed Successfully!");
            res.redirect("/todo");
        }
    });
});

app.post("/delete_task123", function(req, res) {
    var id = req.body.id;

    var options = {
        method: "POST",
        url: BASE_URL + "/deletetask123",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            store.set("notification", "Task Deleted Successfully!");
            res.redirect("/todo");
        }
    });
});

app.post("/loginProcess", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var options = {
        method: "POST",
        url: BASE_URL + "/fetchuser",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            store.set("user_id", response.body);

            res.render("index", {
                name: "netodoBook",
                code: true,
                user_id: response.body,
                invalid: false,
            });

            //res.render('calender', { name: 'netodoBook' });
        } else {
            // res.render('index', { name: 'netodoBook' });

            res.render("index", {
                name: "netodoBook",
                code: false,
                invalid: true,
            });
        }
    });
});

app.post("/signupProcess", function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var options = {
        method: "POST",
        url: BASE_URL + "/create_user",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            res.render("index", { name: "netodoBook", code: false , invalid:false });

            //res.render('calender', { name: 'netodoBook' });
        } else {
            // res.render('index', { name: 'netodoBook' });
        }
    });
});



app.post("/save_profile_form", function (req, res) {
    var title = req.body.title123;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var email_id = req.body.email_id;
    var new_password = req.body.new_password;
    var reciever_email = req.body.reciever_email;
    var user_id = store.get("user_id");

    var options = {
        method: "POST",
        url: BASE_URL + "/save_profile_form",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            firstname: firstname,
            lastname: lastname,
            mobile: mobile,
            address: address,
            email_id: email_id,
            new_password: new_password,
            reciever_email: reciever_email,
            user_id: user_id,
        }),
    };
    request(options, function (error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
           // res.render("index", { name: "netodoBook", code: false, invalid: false });

            //res.render('calender', { name: 'netodoBook' });
        } else {
            // res.render('index', { name: 'netodoBook' });
        }
    });
});


app.post("/getProfileForm", function (req, res) {

    var test_id = req.body.user_id;

    console.log(test_id);


  


    var user_id = store.get("user_id");

    var options = {
        method: "POST",
        url: BASE_URL + "/getProfileForm",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: user_id,
        }),
    };
    request(options, function (error, response) {


        if (response.statusCode == "200" && response.body != "") {
            res.send(response.body);
        }
    });
});


app.post("/codeProcess", function(req, res) {
    var confirmation_code = req.body.confirmation_code;

    var options = {
        method: "POST",
        url: BASE_URL + "/setconfirmationcode",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            confirmation_code: confirmation_code,
        }),
    };
    request(options, function(error, response) {
        if (response.statusCode == "200" && response.body != "") {
            var username123 = response.body;

            console.log(username123);
            res.render("nav", { name: "netodoBook", username123: username123 });
        } else {
            res.render("index", { name: "netodoBook", code: false });
        }
    });
});

app.post("/forgetProcess", function (req, res) {
    var email = req.body.email;

    var options = {
        method: "POST",
        url: BASE_URL + "/forgetPassword",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    };
    request(options, function (error, response) {
        if (response.statusCode == "200" && response.body != "") {
            var dataxx = response.body;

            
            res.render("reset", { name: "netodoBook", id: dataxx });
        } else {
            res.render("index", { name: "netodoBook", code: false });
        }
    });
});



app.post("/resetProcess", function (req, res) {
    var id = req.body.id;
    var password = req.body.confirm_password;
    var code = req.body.code;


    var options = {
        method: "POST",
        url: BASE_URL + "/resetPassword",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            password: password,
            code: code,
        }),
    };
    request(options, function (error, response) {


        console.log(response.body);
        if (response.statusCode == "200" && response.body != "") {
            var dataxx = response.body;

            res.render("index", { name: "netodoBook", code: false, invalid: false });
            
        } else {
            res.render("reset", { name: "netodoBook", id: id });
        }
    });
});

app.post("/create_event", function(req, res) {
    var user_id = store.get("user_id");
    var date = req.body.date;
    var event_name = req.body.event_name;
    var start_time_data = req.body.start_time_data;
    var start_time_ampm = req.body.start_time_ampm;

    var end_time_data = req.body.end_time_data;
    var end_time_ampm = req.body.end_time_ampm;

    var options = {
        method: "POST",
        url: BASE_URL + "/addevent123",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: date,
            event_name: event_name,
            start_time: start_time_data + " " + start_time_ampm,
            end_time: end_time_data + " " + end_time_ampm,
            user_id: user_id,
        }),
    };
    request(options, function(error, response) {
        console.log(JSON.stringify(response));

        if (response.statusCode == "200") {
            res.render("calender", { name: "netodoBook" });
        }
    });
});

app.post("/get_event", function(req, res) {
    var date = req.body.date;

    var user_id = store.get("user_id");

    var options = {
        method: "GET",
        url: BASE_URL + "/getevent",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: date,
            user_id: user_id,
        }),
    };
    request(options, function(error, response) {
        if (response.statusCode == "200" && response.body != "") {
            res.send(response.body);
        }
    });
});

app.post("/delete_event456", function (req, res) {
    var id = req.body.id;



    var options = {
        method: "GET",
        url: BASE_URL + "/deleteevent",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        }),
    };
    request(options, function (error, response) {
        console.log(JSON.stringify(response));
    });
});


app.post("/getNotification", function (req, res) {
    var user_id = store.get("user_id");

    var options = {
        method: "GET",
        url: BASE_URL + "/getNotification",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: user_id,
        }),
    };
    request(options, function (error, response) {

      
        if (response.statusCode == "200" && response.body != "") {
            res.send(response.body);
        }
    });
});

app.use(express.static(path.join(__dirname)));

module.exports = app;