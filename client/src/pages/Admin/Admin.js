import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import Experiences from "./Experiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";
const { TabPane } = Tabs;

const Admin = () => {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center px-5 py-2 justify-between">
        <div className="flex gap-10 items-center">
          <h2 className="text-2xl my-5 text-primary">Portfolio Admin</h2>
          <div className="w-60 h-[1px] bg-gray-500"></div>
        </div>
        <h1
          className="underline text-primary text-xl cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </h1>
      </div>
      {portfolioData && (
        <div className="mt-5 p-5">
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experiences" key="3">
              <Experiences />
            </TabPane>
            <TabPane tab="Projects" key="4">
              <AdminProjects />
            </TabPane>
            <TabPane tab="Courses" key="5">
              <AdminCourses />
            </TabPane>
            <TabPane tab="Contact" key="6">
              <AdminContact />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Admin;
