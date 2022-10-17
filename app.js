// setup express
const express = require('express');
const app = express();
//setup pg
const { Client } = require('pg')
//setup
const connectionString = 'postgresql://postgres:hello123@127.0.0.1:5432/jobs'

const cors = require('cors');

const client = new Client({
    connectionString: connectionString,
})

app.use(express.static('Public'))
app.use(express.json());

 app.use(cors());

client.connect();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("hello world")
})
//Previously used .GET/fetch to point to an API
//1st layer clie
app.get('/jobs', (req, res) => {

    client.query('SELECT * FROM jobs')
    .then(result => res.send(result.rows))
    
})
app.delete('/jobs/:id', (req,)=>{
    const id = req.params.id;
    client.query('DELETE FROM jobs where id= $1',[id])
})

 app.get('/jobs/delete/:id', (req, res) => {
    //  req.params.id
     client.query('DELETE FROM jobs where id= $1',[req.params.id])
     
     res.send(JSON.stringify(req.params))
//     client.query(`INSERT INTO jobs (job, location) VALUE (${/*inputjob*/}, ${/*inputLocation */}) `)
//     .then(result => res.send(result.rows))
 })

// app.post('/pets', (req, res) => {
//     console.log(req)
//     // .then(result => res.sendStatus(418).json(result.rows))
//      client.query(`INSERT INTO pet_list (pet_name, age, kind) VALUES ('${req.body.pet_name}', ${req.body.age}, '${req.body.kind}')`)
//     .then(result => res.send(result.rows))
// })


app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})

//2 javascript tabs; one for server, one for manipulating HTML page
//For get requests import from server to html file to other file