import { BrowserRouter, Route, Routes } from "react-router-dom"
import Ranking from "./pages/ranking";
import CVRankingUploader from "./pages/JobDescriptionUpload";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<CVRankingUploader />} />
          <Route path="/ranking" element={<Ranking />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App
