import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../parts/Sidebar/Sidebar.jsx";
import Header from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Header/Header.jsx";


import './Dashboard.scss'

const Dashboard = (props) => {


  const navigate = useNavigate();

  const SIGNED_IN = localStorage.getItem("SIGNED_IN")
    ? localStorage.getItem("SIGNED_IN")
    : "";

  useEffect(() => {
    if (!SIGNED_IN) {
      navigate("/signin");
    }
  });


  const [allUsers, setAllUsers] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [error, setError] = useState("");

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
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  };

  useEffect(() => {
    fetchUsers();
    navigate('/dashboard');
    localStorage.removeItem("RECEIVER")
  }, []);

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-body">
        <Sidebar 
        allUsers={allUsers}
        />
      </div>
    </div>
  );
};

export default Dashboard;
