import Sidebar from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Sidebar/Sidebar.jsx";
import Header from "/Users/nicoledoromal/AvionSchool/slack-app/src/parts/Header/Header.jsx";
import Conversations from "../../parts/Conversation";

const Client = () => {
  return (
    <div className="client-page">
      <Header />
      <div className="client-body">
        <Sidebar />
        <Conversations />
      </div>
    </div>
  );
};

export default Client;
