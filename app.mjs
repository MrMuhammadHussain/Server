import mongoose from 'mongoose';
import express, { text } from 'express';
import cors from 'cors'
let app = express()
let port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

///////Mongoose Schema ////////
let dbSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: {type: String},
    CreatedDate: { type: Date, default: Date.now },
});
////////////Mongoose Model////////
let dbModel = mongoose.model('todoapps', dbSchema);

/////////Save Data DB/////////////
app.post('/todo', (req, res) => {
    dbModel.create({ text: req.body.text, }, (err, saved) => {
        if (!err) {
            res.send({
                massage:"Data Saved",
                data: saved
            })
        }else{
            res.status(500).send({
                massage:"Error"

        })}})})
app.get('/todo', (req, res) => {
    dbModel.find({},(err, data)=>{
        if(!err){
            res.send({
                massage:"Your All Data",
                data : data
            })
        }else{
            res.status(500).send({
                massage:"Server Error"
            })
        }
    })
    })
app.delete('/todo', (req, res) => {
    dbModel.deleteMany({},(err, alldelete)=>{
        if(!err){
            dbModel.find({})
            res.send({
                massage:"All Data Deleted",
                data : alldelete
            })
        }else{
            res.status(500).send({
                massage:"Server Error"
            })
        }
    })
 })
app.listen(port, () => {
    console.log(`port is up ${port}`)
})

//////////////////////////////////MONDODB EVENT///////////////////////////////////////////////////////////////
let DbLink = "mongodb+srv://mongodb01:DB00123@cluster0.pvzcs2o.mongodb.net/db01?retryWrites=true&w=majority";
mongoose.connect(DbLink);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
