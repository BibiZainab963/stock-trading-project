import { useState } from "react";
import API from "../services/api";

function Register() {

  const [userName, setUserName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registerUser =
    async () => {

      const response =
        await API.post(
          "/users/register",
          {
            userName,
            email,
            password
          }
        );

      alert(response.data.message);
    };

  return (

    <div>

      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUserName(e.target.value)
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={registerUser}
      >
        Register
      </button>

    </div>

  );
}

export default Register;
