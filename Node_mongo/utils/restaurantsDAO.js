const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";


class RestaurantsDAO {
    constructor() {

    }

    findAll(callback) {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("resto");
            dbo.collection("restaurants").find({}).toArray((err, result) => {
                callback(err, result);
                db.close();
            });
        });
    };

    findByKey(key, callback) {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("resto");
            dbo.collection("restaurants").findOne({restaurant_id: key}, (err, result) => {
                callback(err, result);
                db.close();
            });
        });
    }

    findByBorough(key, callback) {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("resto");
            dbo.collection("restaurants").find({borough: key}).toArray((err, result) => {
                callback(err, result);
                db.close();
            });
        });
    }

    findByCuisine(key, callback) {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            var dbo = db.db("resto");
            dbo.collection("restaurants").find({cuisine: key}).toArray((err, result) => {
                callback(err, result);
                db.close();
            });
        });
    }

    insert(resto, callback){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("resto");
            dbo.collection("restaurants").find({}, {projection: {restaurant_id: 1, _id:0}}).toArray((err, res) => {
                console.log(res.map((el) => el.restaurant_id)[0]);
                let max = 0;
                for (let id of res.map((el) => el.restaurant_id)) {
                    if (max < id) {
                        max = id;
                    }
                }
                const maxKey = max + 1;
                console.log(maxKey);
                resto.restaurant_id = maxKey + 1;
                dbo.collection("restaurants").insertOne(resto, function(err, res) {
                    if (err) callback(err, res);
                    console.log("1 document inserted");
                    db.close();
                    callback(err, res);
                });
            });
            
            // dbo.collection("restaurants").insertOne(myobj, function(err, res) {
            //     if (err) throw err;
            //     console.log("1 document inserted");
            //     db.close();
            // });
        }); 
    }

    delete(key) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("resto");
            var myquery = { borough: key };
            dbo.collection("restaurants").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
            });
          });
    }

    create(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("resto");
            var myobj = { name: "Company Inc", address: "Highway 37", borough: "Vannes"};
            dbo.collection("restaurants").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
    }

    update(){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("resto");
            var myquery = { name: "Company Inc" };
            var newvalues = { $set: {name: "test update", address: "Canyon 123" } };
            dbo.collection("restaurants").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          });
    }

}

module.exports = RestaurantsDAO;