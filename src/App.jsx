import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';

const App = () => {

  const [allUsers, setAllUsers] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    await fetch("http://206.189.91.54/api/v1/users", {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      },
    })
      .then(async (response) => await response.json())
      .then((result) => {
        setAllUsers(result);
        setIsLoading(false);
        setHasError(false);
        console.log("result", result);
        console.log("0", allUsers.data[0]);
        console.log("thisisit", allUsers);
        console.log(".data", allUsers.data);
        console.log(".zero,email", allUsers.data[0].email);
      })
      .catch((error) => {
        setHasError(true);
        setError(JSON.stringify(error));
        setIsLoading(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signin' element={<SignIn /> } />
      <Route path='/signup' element={<SignUp /> } />
      <Route path='/dashboard/*' element={<Dashboard 
      allUsers={allUsers}
      /> } />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App;
