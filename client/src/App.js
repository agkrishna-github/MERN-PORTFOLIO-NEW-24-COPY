import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setPortfolioData,
  hideLoading,
  showLoading,
  ReloadData,
} from "./redux/rootslice";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, portfolioData, reloadData } = useSelector(
    (state) => state.root
  );

  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, []);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
