import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);  
    

  // async function removeOneCharacter (index) {
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/users/${index}`);

  //     // use .then(), like updatelist
  //     //return response.data.users_list;  
  //     if (response.status === 204) {
  //       const updated = characters.filter((character, i) => {
  //         return i !== index
  //       });
  //       setCharacters(updated);
  //     } 

  //   }
  //   catch (error){
  //       //We're not handling errors. Just logging into the console.
  //       console.log(error); 
  //       //return false;         
  //   }
  // }

  function removeOneCharacter (index) {
    //axios.delete(`http://localhost:5000/users/${index}`).then ( response => {
      // use .then(), like updatelist
      //return response.data.users_list; 
    let id = characters[index].id; 
    deleteCall(id).then ( response => {
      if (response.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        console.log("UPDATED___")
        console.log(updated)
        setCharacters(updated);
      }
    });
  }

  async function deleteCall (id) {
    try {
      const response = axios.delete(`http://localhost:5000/users/${id}`)
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
      console.log(result);
      setCharacters([...characters, result.data] );
    });
 }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

 async function makePostCall(person){
  try {
     const response = await axios.post('http://localhost:5000/users', person);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
          setCharacters(result);
    });
  }, [] );

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
 
}



export default MyApp;