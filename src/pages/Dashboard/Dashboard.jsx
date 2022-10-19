import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Sidebar/Sidebar.jsx";
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



//   useEffect(() => {
//   (async () => {
//        await fetchUsers();
//        console.log("all", allUsers);
//   })()
//   }, [])


  // const [receiverId, setReceiverId] = useState("");
  //  const [convoVisibility, setConvoVisibility] = useState(false)

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-body">
        <Sidebar 
        allUsers={props.allUsers}
        />
      </div>
    </div>
  );
};

export default Dashboard;
