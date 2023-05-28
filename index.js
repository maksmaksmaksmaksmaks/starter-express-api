const express = require('express');
const app = express();
const mongoose = require('mongoose');
const isEmpty = require('lodash.isempty');
app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)


mongoose.set("strictQuery", false);
const mongoBD="mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.post('/login', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new mongoose(uri);
    try {
        await client.connect();
        const users =client.db("Cluster0").collection("login");
        const user= await users.findOne({username:req.body[Object.keys(req.body)[0]],password:req.body[Object.keys(req.body)[1]]});
        console.log("loginState",user);
        res.json({loginState: user});
        res.end();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

app.post('/predmeti', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const query =client.db("Cluster0").collection("predmeti");
        const classes=await query.find(req.body).toArray();

        console.log("classes",classes);
        res.json({classes: classes});
        res.end();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})



app.post('/predmetiDodaj', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        if(isEmpty(req.body))
            throw new Error("Body is empty");
        await client.connect();
        await client.db("Cluster0").collection("predmeti").insertOne(req.body,(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        console.log("added 1 'predmet'");
        res.send({message:"Added succesfully"});
        res.end();
    }
})

app.post('/predmetiBrisi', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        if(isEmpty(req.body))
            throw new Error("query is empty");
        await client.connect();
        await client.db("Cluster0").collection("predmeti").deleteMany( req.body,(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        console.log("removed succesfully");
        res.send({message:"removed succesfully"});
        res.end();
    }
})

app.post('/predmetiPosodobi', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        if(isEmpty(req.body))
            throw new Error("query is empty");
        await client.connect();
        await client.db("Cluster0").collection("predmeti").updateMany( req.body[Object.keys(req.body)[0]],{ "$set":req.body[Object.keys(req.body)[1]]},(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        res.send({message:"updated succesfully"});
        res.end();
    }
})

app.post('/obveznosti', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const query =client.db("Cluster0").collection("obveznosti");
        const obligations=await query.find(req.body).toArray();

        console.log("obligations",obligations);
        res.json({obligations: obligations});
        res.end();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

app.post('/obveznostiDodaj', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        if(isEmpty(req.body))
            throw new Error("Body is empty");
        await client.connect();
        await client.db("Cluster0").collection("obv").insertOne(req.body,(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        console.log("added 1 'obveznost'");
        res.send({message:"Added succesfully"});
        res.end();
    }
})

app.post('/obveznostiBrisi', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        if(isEmpty(req.body))
            throw new Error("query is empty");
        await client.connect();
        await client.db("Cluster0").collection("obv").deleteMany( req.body,(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        console.log("removed succesfully");
        res.send({message:"removed succesfully"});
        res.end();
    }
})

app.post('/obveznostiPosodobi', async (req, res)=> {
    const uri = "mongodb+srv://maksmarolt:maksmarolt@cluster0.5npdmim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        if(isEmpty(req.body))
            throw new Error("query is empty");
        await client.connect();
        await client.db("Cluster0").collection("obv").updateMany( req.body[Object.keys(req.body)[0]],{ "$set":req.body[Object.keys(req.body)[1]]},(err,res)=>{
            if(err)throw err;
        });

    } catch (e) {
        console.error(e);
        res.send({message:e.message})
    } finally {
        await client.close();
        res.send({message:"updated succesfully"});
        res.end();
    }
})
