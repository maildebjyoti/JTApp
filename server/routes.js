var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var db = require('./db');

//https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
//https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
//https://mongodb.github.io/node-mongodb-native/api-generated/db.html

router.get('/users', getUsers);
router.get('/user/:id', getUser);
//router.post('/login', doLogin);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getUsers(req, res, next) {
    var collection = db.get().collection('users');
    collection.find().toArray(function (err, docs) {
        //db.close();
        res.jsonp(docs);
        //test.done();
    })
}

function getUser(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

/*function doLogin(req, res, next) {
    console.log(req.body);

    // create a new user called chris
    var user = new User({
        name: req.body.email,
        username: req.body.email,
        password: req.body.password
    });

//    user.dudify(function (err, name) {
//        if (err) throw err;
//        console.log('Your new name is ' + name);
//    });

    // call the built-in save method to save to the database
    user.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully!');
    });

    res.status(200).send(user);
}*/

