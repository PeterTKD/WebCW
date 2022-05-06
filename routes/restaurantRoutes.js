const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/login", controller.login_page);
router.post('/login', login, controller.handle_login);

//gets the homepage.html
router.get('/', function (req, res) {
    res.redirect('/homepage.html');
})

router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);

router.get('/posts/:author', controller.show_user_entries);

router.get("/register", controller.register_page);
router.post('/register', controller.post_new_user);
router.get("/loggedIn", verify, controller.loggedIn_landing);

router.get("/menu", controller.landing_page);

router.get("/test", controller.test_page);

router.get('/guestbook', verify, controller.entries_list);



router.get('/json', controller.landing_page_json);



router.get('/lapichonare', function (req, res) {
    res.redirect('/homepage.html');
})


router.get('/about', function (req, res) {
    res.redirect('/about.html');
})


router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});



module.exports = router;