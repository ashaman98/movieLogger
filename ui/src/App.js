import { useState } from "react";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Wishlist } from "./components/Wishlist";
function App() {
  // login, signup, main, wishlist
  const [route, setRoute] = useState("login");
  // {token: string}
  const [user, setUser] = useState(null);

  const content = (setRoute) => {
    switch (route) {
      case "signup":
        return <Signup setRoute={setRoute} setUser={setUser} />;
      case "login":
        return <Login setRoute={setRoute} setUser={setUser} />;
      case "main":
        return <Main setRoute={setRoute} user={user} />;
      case "wishlist":
        return <Wishlist setRoute={setRoute} user={user} />;
      default:
        return <div />;
    }
  };

  return <div className="App">{content(setRoute)}</div>;
}

export default App;
