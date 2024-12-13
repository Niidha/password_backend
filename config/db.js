//using MONGODB
// const {MongoClient}=require("mongodb")

// const mongodb=new MongoClient(' mongodb://127.0.0.1:27017')
// const dbConfig={}
// const connectDB=async()=>{
//     await mongodb.connect()
//     const db=mongodb.db("Sample_1")
//     dbConfig.db=db
// }
// connectDB()
// module.exports=dbConfig

// const mongoose=require("mongoose")
// const connectDB=async()=>{
// try{
//     const {connection}=await mongoose.connect('mongodb://127.0.0.1:27017',{
//         dbName:"Sample_1"
//     })
//     console.log("Connected DB",connection.db.databaseName);
// }
// catch(err){
// console.log(err);

// }
// }
// module.exports={connectDB}

const mongoose=require("mongoose")
const connectDB=async()=>{
try{
    const {connection}=await mongoose.connect('mongodb://127.0.0.1:27017',{
        dbName:"UserData"
    })
    console.log("Connected DB",connection.db.databaseName);
}
catch(err){
console.log(err);

}
}
module.exports={connectDB}