import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "pages/HomePage";
import MyPortfolioPage from "pages/MyPortfolioPage";
import AllPortfolioPage from "pages/AllPortfolioPage";
import AdminPage from "pages/AdminPage";
import Header from "layouts/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio/user" element={<MyPortfolioPage />} />
          <Route path="/portfolio" element={<AllPortfolioPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
