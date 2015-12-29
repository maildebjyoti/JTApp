var jwt = require('jsonwebtoken');

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

router.get('/sign/:id', sign);
router.get('/verify', verify);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
var salt = 'abcde';

function sign(req, res, next) {
    var request = req.params.id;
    console.log(request);

    var user = {
        name: 'Debjyoti',
        username: 'deb_xp',
        password: 'password',
        admin: true
    };

    var token = jwt.sign(user, salt, {
        //algorithm: 'RS512',
        expiresIn: 86400
    });

    //res.send(token);
    // return the information including token as JSON
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
}

function verify(req, res, next){
    // check header or url parameters or post parameters for token
    /*console.log('--1-------------------');
    console.log(req.body);
    console.log('--2-------------------');
    console.log(req.query);
    console.log('--3-------------------');
    console.log(req.headers);
    console.log('----------------------');*/
    var token = req.body.token || req.query.token || req.headers['x-access-token'] ;
    //var token = req.params.token;
    console.log('Token: ' + token);
    // decode token
    if (token) {
        //console.log('----------------------A');
        // verifies secret and checks exp
        jwt.verify(token, salt, function (err, decoded) {
                if (err) {
                    //console.log('----------------------B');
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    //console.log('----------------------C');
                    // if everything is good, save to request for use in other routes
                    //req.decoded = decoded;
                    res.send(decoded)
                    //next();
                }
            }
        );

    } else {
        //console.log('----------------------D');
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

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

