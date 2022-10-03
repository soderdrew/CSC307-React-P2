const uuid = require('uuid')
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

// http://localhost:5000/users?name=Mac&job=bartender
app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   //console.log(name);
   //console.log(job);
   if (name != undefined){
      let result = findUserByName(name);
      //console.log(result)
      if (job != undefined){
         // pass in a list     
         let finalResult = findUserByJob(job, result);
         res.send(finalResult);
       }
       else {
         //let result = findUserByName(name);
         result = {users_list: result};
         res.send(result);
       }
       
   }
   else{
       res.send(users);
   }
});

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       result = {users_list: result};
       res.send(result);
   }
});

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   userToAdd.id = uuid.v4();   // generated unique id for user
   addUser(userToAdd);
   res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   //console.log(result);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       users.users_list.splice(users.users_list.indexOf(result), 1);
       //result = {users_list: result};
       res.status(204).end();
   }
})

function addUser(user){
   users['users_list'].push(user);
}

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
   return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job, usersList) => {
   return usersList.filter( (user) => user['job'] === job);
}

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'z31dad', 
         name: 'Mac',
         job: 'Bouncy Ball',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Janitor',
      }
   ]
}
