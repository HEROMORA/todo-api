const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'eat the launch'}).then((result => {
    //     console.log(result);
    // }));

    // db.collection('Todos').findOneAndDelete({text: 'shave your beard'}).then((result) => {
    //     console.log(result);
    // })

    //client.close();
});