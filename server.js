const http = require('http')
const express = require('express')
var cors = require('cors')
const {getDb} = require('./databaseService')
const PORT = 4000

const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to SMS app")
})
app.post('/message', async (req, res) => {
    const {sender,receiver,message} = req.body
    const db = await getDb()
    const result = db.collection("messages").insertOne({
        sender,
        receiver,
        message,
        messageStatus:"delivered",
        date:new Date()
    },(e)=>console.log(e))
    res.json({"Success":true})

})
app.get('/messages', async(req, res) => {
    const db = await getDb()
    const messageCollection=await db.collection("messages")
    const result = await messageCollection.find(req.query).toArray();
    const updatedResult=result.map(doc=>{
        return {...doc ,messageStatus:"read"}
    })
    const sortedResultByDate=updatedResult.sort((a,b)=>b.date-a.date)
    res.json(sortedResultByDate)

})

app.set('port', PORT)
const server = http.Server(app)
server.listen(PORT)
console.log(`Server started at port ${PORT}`)