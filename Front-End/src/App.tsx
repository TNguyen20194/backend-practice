import { useState } from 'react'
import type { FormEvent, ChangeEvent, SubmitEvent} from "react";
import './App.css'

interface SignUpData {
  first_name: string,
  last_name: string,
  email: string,
  password: string
};

interface LoginData {
  email: string,
  password: string
}


function App() {
  const [formSignupInput, setformSignupInput] = useState<SignUpData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [formLoginInput, setFormLoginInput] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  function handleSignupChange(e: ChangeEvent<HTMLFormElement>) {
    const {name, value} = e.target;

    setformSignupInput(prev => (
      {...prev,
        [name]: value
      }
      )
    )
  };

  function handleLoginChange(e: ChangeEvent<HTMLFormElement>) {
    const {name, value} = e.target;

    setFormLoginInput(prev => ({
      ...prev,
      [name]: value
    })
  )
  }

  const handleSignupSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

   setSignupError(null);

   const requestSignupOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formSignupInput) // Convert the data to a JSON string
    };

    try{
      const response = await fetch("http://localhost:3000/users/signup", requestSignupOptions);

      const data = await response.json();

      console.log(data)

      if(!response.ok) {
        setSignupError(data.msg)
      };

    } catch {
      setSignupError("Something went wrong. Please try again.")
    }
  };

  const handleLoginSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const requestLoginOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formLoginInput) // Convert the data to a JSON string
    };

    try {
      const resposne = await fetch("http://localhost:3000/users/login", requestLoginOptions);

      const data = await resposne.json();

      if(!data.ok) {
        setLoginError(data.msg)
      };

    } catch {
      setLoginError("Something went wrong. Please try again.")
    }
  };

  return (
    <>
      <div>
        <h1>Sign Up & Login</h1>
        <form action="" onChange={handleSignupChange} onSubmit={handleSignupSubmit} method="POST">
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
          <button type="submit">Sign Up</button>
          <div>
            {signupError && <p style={{color: "red"}}>{signupError}</p>}
          </div>
        </form>

        <form action="" onChange={handleLoginChange} onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
            <div>
           <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter email" />
          </div>

          <div>
           <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password" />
          </div>

          <button type="submit">Login</button>
          <div>
            {loginError && <p style={{color: "red"}}>{loginError}</p>}
          </div>
        </form>
      </div>
    </>
  )
}

export default App
