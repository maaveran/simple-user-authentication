const { db, config } = require('../pgp.js');
// use Bcrypt for hasing passwords
const bcrypt = require('bcryptjs');

//
module.exports = function (app, express) {
    // initial page
    app.get('/', (req, res) => {
        // res.sendFile('login.html', { root: '/home/linh/Desktop/User example/views' });
        res.render('login');
    });

    // handle sign up request
    app.post('/sign-up', (req, res) => {
        //console.log(req.body);
        db.any("SELECT * FROM user_account WHERE username = $1", [req.body.username, req.body.password])
            .then(data => {
                if (data.length === 0) {
                    // this username does not yet exist
                    // hasing password by auto-generating a salt and hash
                    bcrypt.hash(req.body.password, 5, function (err, hash) {
                        db.none("INSERT INTO user_account (username, password) VALUES($1, $2)", [req.body.username, hash])
                            .then(() => {
                                console.log('Insert account successfully');
                                res.render('login', { status: 'Sign up successfully! You can log in now!' });
                            })
                            .catch(error => {
                                console.log(error.message);
                            });
                    });

                } else {
                    // this username already exists
                    res.render('login', { status: 'Account already exists. Please log in or register another account!' })
                }
            })
            .catch(error => {
                console.log(error.message);
            });;
    });
    // handle sign in request
    app.post('/sign-in', (req, res) => {
        //console.log(req.body);
        db.oneOrNone("SELECT * FROM user_account WHERE username = $1", [req.body.username, req.body.password])
            .then(data => {
                if (data === null) {
                    // this account does not match
                    console.log('Log in unsuccessfully. Account does not exist!!!');
                    res.render('login', { status: 'Log in unsuccessfully. Account does not exist!!!' });
                } else {
                    console.log(data);
                    // this account matches 
                    bcrypt.compare(req.body.password, data.password, function (err, hashRes) {
                        if (hashRes) {
                            console.log('Log in successfully');
                            res.render('profile', { status: 'You log in successfully!!!', username: req.body.username, password: data.password });
                        } else {
                            console.log('Log in unsuccessfully. Account does not match!!!');
                            res.render('login', { status: 'Log in unsuccessfully. Account does not match!!!' });
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    });
}