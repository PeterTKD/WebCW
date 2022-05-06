const nedb = require('nedb');
class Dishes {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }
    //a function to seed the database
init() {
    this.db.insert({
    name: 'Pizza Margaritta',
    description: 'Classic pizza with  a bubbly crust, crushed San Marzano tomato sauce, fresh mozzarella and basil.',
    allergyadvice: 'Do not order if you are lactose intolerant.',
    prices: '12.99'
    });
    //for later debugging
    console.log('db entry Pizza Margaritta inserted');
    
    this.db.insert({
    name: "Spaghetti Carbonara",
    description: 'Spaghetti with bacon and a creamy sauce made from eggs, Pecorino or Parmesan',
    allergyadvice: 'Do not order if you are lactose intolerant.',
    prices: '9.99'
    });
    //for later debugging
    console.log('db entry Carbonara inserted');
}
//a function to return all entries from the database
getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
        this.db.find({}, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
                reject(err);
            //if no error resolve the promise & return the data
            } else {
                resolve(entries);
                //to see what the returned data looks like
                console.log('function all() returns: ', entries);
            }
        })
    })
}
getPetersEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //find(prices:'Peter) retrieves the data,
        //with error first callback function, err=error, entries=data
        this.db.find({ prices: 'Peter' }, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
                reject(err);
            //if no error resolve the promise and return the data
            } else {
                resolve(entries);
                //to see what the returned data looks like
                console.log('getPetersEntries() returns: ', entries);
             }
        })
    })
}

addEntry(prices, name, description, allergyadvice) {
    var entry = {
        prices: prices,
            name: name,
            description: description,
            allergyadvice: allergyadvice
            }
    console.log('entry created', entry);
    this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', name);
                } else {
                console.log('document inserted into the database', doc);
            }
    }) 
 }       
getEntriesByUser(priceTag) {
            return new Promise((resolve, reject) => {
                this.db.find({ 'prices': priceTag }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
            }
        })
    })
 }

}
module.exports = Dishes;