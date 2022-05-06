const dishesDAO = require('../models/restaurantModel');
const db = new dishesDAO();
const userDao = require("../models/userModel.js");

db.init();

exports.entries_list = function (req, res) {
    res.send('<h1>Not yet implemented: show a list of Dishes entries.</h1>');
    db.getAllEntries();
}

/*exports.landing_page = function(req, res) {
        res.send('<h1>Welcome to my Application.</h1>');
        }
*/

/*
exports.landing_page = function(req, res) {
res.render("entries",   {         
    'title': 'Dishes', 
    'entries': [     { 
            'name'  : 'Good day out',
            'description' :'We had a really good time visiting the museum.'   
        }, 
        { 
            'name'  : 'Good place to be on a rainy day.',      
            'description' : 'Nice paintings too.'     
        }, 
        { 
            'name' : 'Yummy',       
            'description': 'Good food :-).'     
        } 
    ] 
}); 
}
*/

exports.landing_page = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('menu', {
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.landing_page_json = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.send(list);
            console.log(list);
            console.log('json endpoint set up');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}



exports.test_page = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render('menu', {
                'entries': list
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.log('promise rejected', err);
        })
}

exports.login_page = function (req, res) {
    res.render('loginpage')
}

exports.register_page = function (req, res) {
    res.render('registerpage')
}

exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
      title: "Dishes",
      user: "user",
    });
  };


exports.post_new_entry = function (req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.prices) {
        response.status(400).send("Entries must have prices.");
        return;
    }
    db.addEntry(req.body.prices, req.body.name, req.body.description, req.body.allergyadvice);
    res.redirect("/loggedIn");
}



exports.show_user_entries = function (req, res) {
    console.log('filtering price', req.params.prices);
    let user = req.params.prices;
    db.getEntriesByUser(user).then(
        (entries) => {
            res.render('menu', {
                'title': 'Dishes',
                'entries': entries
            });
        }).catch((err) => {
            console.log('error handling prices posts', err);
        });
}


exports.handle_login = function (req, res) {
   
    res.render("newEntry", {
        title: "Dishes",
        user: "user"
      });
};


exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (!user || !password) {
        res.send(401, "no user or no password");
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect("/login");
    });
};

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render("menu", {
                entries: list,
                user: "user"
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

