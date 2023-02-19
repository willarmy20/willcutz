// I want to use express so I need to add it to the package.json by "type":module
const http = require('http');
const express = require('express');
const app = express();
app.use(express.json());
const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./models');

const sequelizeConnection = new Sequelize('postgres://postgres:postgres123@localhost:5432/postgres',{
    define:{
        timestamps: false,
        schema: 'willcutz'
    }
})

//auth get 
app.get("/",(req,res)=>{
    res.send("Hello, this is the auth endpoint")
})

app.get("/register",(req,res)=>{
    res.send("Hello, this is the auth register endpoint")
})


//Creathing a New User 
//Use .create() and pass it key-value pairs for the column names and values for the new row:
app.post('/users', async (req, res) =>{
    //req.body contains an object with firstName, lastName, email
    const {firstName, lastName, email} = req.body;
    const newUser = await User.create({
        firstName,
        lastName,
        email
    });
    //Send back new User id in the response
    res.json({
        id: newUser.id
    });
})

//Retrieving Users
//Getting all rows is performed with .findAll():
app.get('/users/by-last-name', async (req, res) => {
    const users = await User.findAll({
        attributes: ['lastName']
    });
    res.json(users);
});

//To retrieve a row by the id use .findByPk() (find by primary key):
app.get('/users/:id', async (req, res) => {
    try{
    const oneUser = await User.findByPk(req.params.id);
    res.json(oneUser);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'User not found'
        });
    }
});

//Updating Existing Users
//.update() accepts the key-value pairs to update. It is best to use a where option so that you don't update all rows:

app.post('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    // Assuming that `req.body` is limited to
    // the keys firstName, lastName, and email
    const updatedUser = await User.update(req.body, {
        where: {
            id
        }
    });
    res.json(updatedUser);
});

//Deleting a User
//The destroy() method will delete rows:

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
        where: {
            id
        }
    });
    res.json(deletedUser);
});



sequelizeConnection.authenticate().then(()=>{
    console.log("Database connection successfull")
}).catch((error)=>{
    console.log(error);
})

sequelizeConnection.sync().then(()=>{
    console.log("Tables created successfully");
})


app.listen(3000, ()=>{
    console.log("Connected to backend")
})
