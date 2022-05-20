import { useState } from "react";

const login = (options) => {
  if (!options.username || !options.password) {
    alert("Fill all fields");
    return;
  }
  return fetch("http://localhost:3333/user/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: options.username,
      password: options.password,
    }),
  });
};

export const Login = ({ setRoute, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username,
      password,
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
        <input type="submit" value="Submit" />
      </form>
      <button type="button" onClick={() => setRoute("signup")}>
        Or you want to signup?
      </button>
    </div>
  );
};
