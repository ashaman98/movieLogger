import { useState } from "react";

const signup = (options) => {
  if (
    !options.username ||
    !options.password ||
    !options.firstName ||
    !options.lastName ||
    !options.email
  ) {
    alert("Fill all fields");
    return;
  }
  console.log("here", options);
  return fetch("http://localhost:3333/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: options.username,
      password: options.password,
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
    }),
  });
};

export const Signup = ({ setRoute, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signup({
      username,
      password,
      firstName,
      lastName,
      email,
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setRoute("main");
      });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          first name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          last name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <label>
          email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => setRoute("login")}>Or you want to login?</button>
    </div>
  );
};
