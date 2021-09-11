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
    mongoose.Promise = global.Promise;
};