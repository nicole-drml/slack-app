import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Sidebar/Sidebar.jsx";
import Header from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Header/Header.jsx";
import Conversations from "../../parts/Conversation";

const Dashboard = () => {
  const SIGNED_IN = localStorage.getItem("SIGNED_IN")
    ? localStorage.getItem("SIGNED_IN")
    : "";


  const navigate = useNavigate();

  useEffect(() => {
    if (!SIGNED_IN) {
    navigate("/signin");
    }
  });
  
  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <Conversations />
      </div>
    </div>
  );
};

export default Dashboard;
