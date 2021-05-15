
const {MongoClient} = require('mongodb');
const url="mongodb://localhost:27017/smsdb"
async function getDb(){
    const client=new MongoClient(url, { useUnifiedTopology: true });
    const connection=await client.connect();
    return connection.db();
}
module.exports={getDb}
