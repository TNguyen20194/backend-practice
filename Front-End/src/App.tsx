import { useState } from 'react'
import type { FormEvent } from "react";
import './App.css'

function App() {
  const [formInput, setFormInput] = useState({first_name: "", last_name:"", email: "", password: ""});

  function handleChange(e) {
    const {name, value} = e.target;

    console.log(`key: ${name}, value: ${value}`)

    setFormInput(prev => (
      {...prev,
        [name]: value}
      )
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formInput) // Convert the data to a JSON string
    };

    try{
      const response = await fetch("http://localhost:3000/signup", requestOptions);

      if(!response.ok) {
        throw new Error("Cannot process user signup")
      };

    } catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <div>
        <h1>Sign Up & Login</h1>
        <form action="" onChange={handleChange} onSubmit={handleSubmit} method="POST">
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" placeholder="Enter First Name" />
          </div>

          <div>
           <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" placeholder="Enter Last Name" />
          </div>

          <div>
           <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter email" />
          </div>

          <div>
           <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password" />
          </div>
          <button type="submit">Submit</button>
        </form>

        <form action="">
          <h2>Login</h2>
            <div>
           <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter email" />
          </div>

          <div>
           <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password" />
          </div>
        </form>
      </div>
    </>
  )
}

export default App
