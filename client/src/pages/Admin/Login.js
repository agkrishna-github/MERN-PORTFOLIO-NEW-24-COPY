import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { hideLoading, showLoading } from "../../redux/rootslice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/portfolio/admin-login`, user);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(hideLoading());
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col">
        <h2>Admin Login</h2>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="User Name"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button className="bg-primary text-white p-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
