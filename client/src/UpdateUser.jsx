import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              placeholder='Enter Email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input
              type='text'
              id='age'
              placeholder='Enter Age'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
