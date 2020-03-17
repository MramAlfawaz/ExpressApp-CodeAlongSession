// loading the express module on server
const express = require('express');

// Creates a new instance of express on our server
const app = express();

app.use(express.urlencoded());

// Our first API call / Root Route / Our landing page route
app.get("/", function(req, res){
    res.send("Hello, World ...!");
    //whenever request comes to localhost:3000 or
    // 127.0.0.1:3000, it will respond to the request.
})

// Greeting Route
app.get('/greeting', function(req, res) {
    res.send('Hey, SEI Students!');
});
  
// Rihanna Route
app.get('/rihanna', function(req, res) {
    res.send("Work work work work work");
});

// Hello message route. 
// URL Parameters
// app.get("/hello/:message", function(req, res){
//     res.send(`Hello, ${req.params.message}`);
// });

// Query Paramter
app.get("/hello/:message", function(req, res){
    res.send(`hello, ${req.params.message}. My name is ${req.query.firstName} ${req.query.lastName}`);
})

// CRUD
// C -Create -- post
// R -Read -- get
// U -Update -- put/patch
// D -Delete -- delete

let people = [
    { firstName: 'maram', lastName: 'Ahmad' , id: 1},
    { firstName: 'sara', lastName: 'murad' ,id: 2},
    { firstName: 'abrar', lastName: 'mohsen',id: 3},
    { firstName: 'amal', lastName: 'yasir',id: 4}
 ];

// GET API - Read Operation in CRUD -- json
app.get('/api/people.json', function(req, res){
    res.json({people: people});
});

//GET API using EJS
app.get('/api/people', function(req, res){
    res.render('../app/views/people.ejs', {data: people});
});

// CREATE API
app.get('/api/createPerson/', function(req, res){
    res.render('../app/views/createPerson.ejs');
});

app.post('/api/person', function(req, res){
    people.push({firstName: req.body.firstName, lastName: req.body.lastName});
    res.render('../app/views/people.ejs', {data: people});
});

// Homework
// Please write update API and delete API.
app.put('/api/people/:id' , function(req, res){
    let id =parseInt( req.params.id);
    let updatePeople =req.body;
    if (people["people" + id] != null){
          people["people" + id] = updatePeople;
          console.log(" update successfully \n" + JSON.stringify(people, null , 4))

        res.end("Update successfully \n" + JSON.stringify(updatePeople, null , 4)) 
    }
    else {
        res.end(" Doesn't updated people: \n" + JSON.stringify(updatePeople, null , 4))

    }
});

app.delete('/api/people/:id' , function(req, res){
    let deletePeople = people["people" + req.body.id];
    delete people["people" + req.body.id];
    
    console.log("people after delete \n" + JSON.stringify(people, null,4));

    res.end("Deleted people \n" + JSON.stringify(deletePeople, null,4)) ;
    
});

// configuration of port
const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Hello-express-app is listening on port ${port}`);
});