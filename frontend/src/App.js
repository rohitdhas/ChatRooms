import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";

function App() {
  const registerUsername = useRef("");
  const registerPassword = useRef("");
  const loginUsername = useRef("");
  const loginPassword = useRef("");

  const [userData, setUserData] = useState(null);

  function register(event) {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: registerUsername.current.value,
        password: registerPassword.current.value,
      },
      url: "http://localhost:8080/register",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      registerUsername.current.value = "";
      registerPassword.current.value = "";
    });
  }
  function login(event) {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: loginUsername.current.value,
        password: loginPassword.current.value,
      },
      url: "http://localhost:8080/login",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      loginUsername.current.value = "";
      loginPassword.current.value = "";
    });
  }
  function getUser(event) {
    event.preventDefault();
    axios({
      method: "GET",
      url: "http://localhost:8080/user",
      withCredentials: true,
    }).then((res) => setUserData(res.data));
  }

  return (
    <div className="App">
      <form onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" ref={registerUsername} />
        <input type="password" placeholder="password" ref={registerPassword} />
        <button type="submit">Register</button>
      </form>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="username" ref={loginUsername} />
        <input type="password" placeholder="password" ref={loginPassword} />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={getUser}>
        <h1>Get User</h1>
        <button type="submit">Submit</button>
        {userData ? <h1>Hello {userData.username}!🔥</h1> : null}
      </form>
    </div>
  );
}

export default App;
