// console.log('hello world!!!!');
const _ = require('lodash');
const validator = require('validator');
const fs = require('fs-extra');
const bcrypt = require('bcrypt');
const hasing = require('uuid');
const myJSON = ('./resources/users.json');
const myJSONnew = ('./resources/user-parsed.json')


// Async/Await:
async function createJson() {
    try {
        fs.readJSON('./resources/users.json');
        console.log('success at Async/Await!')
    } catch (err) {
        console.error(err)
    }
}
createJson()

// Async with callbacks:
fs.readJSON('./resources/users.json', err => {
    if (err) return console.error(err)
    console.log('success at callbacks!!')
});

// Async with promises:
fs.readJSON('./resources/users.json')
    .then(myJSON => {
        console.log('success at promises!!!')
        console.log(myJSON);
    })
    .catch(error => {
        console.log(error);
    });




fs.readJSON(myJSON, (err, users) => {
    users.forEach((user) => {
        user.age = _.get(user, 'user_data.age', 18);
        user.canDrink = user.age > 21
        user.password = bcrypt.hashSync(user.password, 10);
        if (!validator.isEmail(user.email)) {
            user.email = "notvalid@gmail.com";
            // console.log(user);
        } else if (user.user_data.is_admin) {
            user.user_name += " " + 'admin'
            console.log(user);
        }
    });
    fs.writeJSONSync('./resources/user-parsed.json', users);
});

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/node_db";
const client = new MongoClient(url);
const myJSONmongo = require('./resources/users.json');
const dbName = 'node_db';


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("customers").insertMany(myJSONmongo, function (err, db) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
const myPass = process.env.db_pass;
console.log(`my password is: ${myPass}`);