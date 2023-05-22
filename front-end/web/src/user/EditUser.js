import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        age: '',
        emailAddress: '',
        password: '',
        address: '',
        role: ''
    });

    const { firstName, lastName, age, emailAddress, password, address, role } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadUser();
      });

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/api/v1/users/${id}`, user);
        navigate('/');
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
        setUser(result.data);
      };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='firstName' className='form-label'>First Name</label>
                            <input 
                                type='text' 
                                className='form-control'  
                                placeholder='Enter First Name' 
                                name='firstName'
                                value={firstName}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='lastName' className='form-label'>Last Name</label>
                            <input 
                                type='text' 
                                className='form-control'  
                                placeholder='Enter Last Name' 
                                name='lastName'
                                value={lastName}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='age' className='form-label'>Age</label>
                            <input 
                                type='text' 
                                className='form-control'  
                                placeholder='Enter Age' 
                                name='age'
                                value={age}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='emailAddress' className='form-label'>Email Address</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Email Address' 
                                name='emailAddress' 
                                value={emailAddress}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Password' className='form-label'>Password</label>
                            <input 
                                type='text' 
                                className='form-control'  
                                placeholder='Enter Password' 
                                name='password'
                                value={password}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='address' className='form-label'>Address</label>
                            <input 
                                type='text' 
                                className='form-control'  
                                placeholder='Enter Address' 
                                name='address'
                                value={address}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Role' className='form-label'>Role</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Role' 
                                name='role'
                                value={role}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
            </div>
        </div>
    </div>
  )
}
