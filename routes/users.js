const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');

router.get('/', function (req, res) {
    database.table('users')
        .withFields([ 'username' , 'email', 'fname', 'lname', 'age', 'role', 'id' ])
        .getAll().then((list) => {
        if (list.length > 0) {
            res.json({users: list});
        } else {
            res.json({message: 'NO USER FOUND'});
        }
    }).catch(err => res.json(err));
});

router.get('/:userId', (req, res) => {
    let userId = req.params.userId;
    database.table('users').filter({id: userId})
        .withFields([ 'username' , 'email','fname', 'lname', 'age', 'role', 'id' ])
        .get().then(user => {
        if (user) {
            res.json({user});
        } else {
            res.json({message: `NO USER FOUND WITH ID : ${userId}`});
        }
    }).catch(err => res.json(err) );
});

router.get('/validate/:email', (req, res) => {
	
	let email = req.params.email;
	
	database.table('users').filter({email: email})
			.get()
			.then(user => {
				 if (user) {
            res.json({user: user, status: true});
        } else {
            res.json({status: false, user: null});
        }
			})
			.catch(err => res.json(err));
});

router.patch('/:userId', async (req, res) => {
    let userId = req.params.userId; 
    let user = await database.table('users').filter({id: userId}).get();
    if (user) {
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let userFirstName = req.body.fname;
        let userLastName = req.body.lname;
        let userUsername = req.body.username;
        let age = req.body.age;

        database.table('users').filter({id: userId}).update({
            email: userEmail !== undefined ? userEmail : user.email,
            password: userPassword !== undefined ? userPassword : user.password,
            username: userUsername !== undefined ? userUsername : user.username,
            fname: userFirstName !== undefined ? userFirstName : user.fname,
            lname: userLastName !== undefined ? userLastName : user.lname,
            age: age !== undefined ? age : user.age
        }).then(result => res.json('User updated successfully')).catch(err => res.json(err));
    }
});

module.exports = router;
