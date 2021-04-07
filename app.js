const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'databaseName',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// get request to get all data from the database
app.get('/users' , (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

// post request to add data into database
app.post('/addUser',(req,res)=>{
    mysqlConnection.query('INSERT INTO users SET  ?',req.body,(err,result)=>{
        if(err)
        {
           res.send(error);
        }
        else {
            res.send("insert successfully");
        }
    })


})

//put request to update the data 

app.put('/updateUser/:id',(req,res)=>{
    var params =[req.body,req.params.id]
    mysqlConnection.query(' UPDATE users SET ? WHERE sno=?',params,(err,result)=>{
        if(err)
        {
           res.send(error);
        }
        else {
            res.send("updated successfully");
        }
    })


})

// delete fo deleting the data
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM users WHERE sno = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
    res.send('user Record deleted successfully.');
    else
    console.log(err);
    })
    });


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

