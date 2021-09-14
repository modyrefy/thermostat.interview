const mongoose = require('mongoose');

export const  InitConnection=async ()=>{
  await  mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useMongoClient: true
        }
    );
  /*
    mongoose.connection.db.listCollections().toArray(function (err:any, names:any) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
    */
    mongoose.Promise = global.Promise;
};