const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
// meadele were 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster0.7qpx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const carProduct = client.db("user").collection("car");
        console.log("db is connected");

        
        app.post('/upload', async (req, res) => {
            const product = req.body;
            const result = await carProduct.insertOne(product);
            res.send(result);
            console.log(product);
        })
        app.get('/upload', async (req, res) => {
            const quary = {};
            const coursor = carProduct.find(quary);
            const result = await coursor.toArray();
            res.send(result);
        })

        
        

    }
    finally {
        
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('backend connected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

