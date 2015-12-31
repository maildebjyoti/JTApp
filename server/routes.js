//TODO
//Error Handling
//Data segregation

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');
var db = require('./db');

//https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
//https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
//https://mongodb.github.io/node-mongodb-native/api-generated/db.html
//https://hackhands.com/mongodb-crud-mvc-way-with-passport-authentication/

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.get('/sign/:id', sign);
router.get('/verify', verify);

router.post('/login', doLogin);
router.post('/signup', signup);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
var salt = 'there was a c0ld Summer day';

function sign(obj) {
    return jwt.sign(obj, salt, {
        //algorithm: 'RS512',
        expiresIn: 86400
    });
}

function verify(token){
    if (token) {
        jwt.verify(token, salt, function (err, decoded) {
                if (err) {
                    return false;
                } else {
                    return true;
                }
            }
        );

    }
    return false;
}

function getUsers(req, res, next) {
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] ;
    //var token = req.params.token;

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

function doLogin(req, res) {
    var user = {
        name: req.body.email,
        username: req.body.email,
        password: req.body.password
    };

    var collection = db.get().collection('users');
    collection.findOne({
        'username': user.username
    }, function (err, data) {
        if (data !== null) {
            if (bcrypt.compareSync(user.password, data.password)){
                delete user.password;
                delete user._id;

                user.token = sign(user);
                res.setHeader('x-access-token', user.token);
                res.status(200).send(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(409).send('User not found');
        }
    });
}

function signup(req, res) {
    var user = {
        name: req.body.name,
        username: req.body.email,
        password: req.body.password
    };

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            var collection = db.get().collection('users');
            collection.findOne({
                'username': user.username
            }, function (err, data) {
                if (data === null) {
                    collection.insert(user, { safe: true }, function (err, data) {
                        //Generate Token & send back
                        delete user.password;
                        delete user._id;
                        user.token = sign(user);
                        res.setHeader('x-access-token', user.token);
                        res.status(200).send(user);
                    });
                } else {
                    res.status(409).send('User already exists');
                }
            });
        });
    });
}
