import { Routes, Route } from "react-router-dom";
import ChatsComponent from "../components/ChatsComponent";
import DocumentsComponent from "../components/DocumentsComponent";
import GrantsComponent from "../components/GrantsComponent";
import ConferencesComponent from "../components/ConferencesComponent";
import HelpComponent from "../components/HelpComponent";
import ResearchProfilePage from "../components/ResearchProfilePage";
import CollaboratorsComponent from "../components/CollaboratorsPage"; // Import the new component

function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatsComponent />} />
        <Route path="/chats" element={<ChatsComponent />} />
        <Route path="/documents" element={<DocumentsComponent />} />
        <Route path="/collaborators" element={<CollaboratorsComponent />} />
        <Route path="/grants" element={<GrantsComponent />} />
        <Route path="/conferences" element={<ConferencesComponent />} />
        <Route path="/help" element={<HelpComponent />} />
        <Route path="/profile" element={<ResearchProfilePage />} />
      </Routes>
    </div>
  );
}

export default Dashboard;