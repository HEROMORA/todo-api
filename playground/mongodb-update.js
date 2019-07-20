const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5d2f2d1c48f5480a1cc5af79')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5d2f429558d25b29803a4a1e')
    // },{
    //     $set: {
    //         name: 'Fares Muhammed'
    //     },
    //     $inc: {
    //         age: 7
    //     }      
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })
    

    //client.close();
});