import { Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { NewsPage } from "./pages/NewsPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Routes>
  );
}
