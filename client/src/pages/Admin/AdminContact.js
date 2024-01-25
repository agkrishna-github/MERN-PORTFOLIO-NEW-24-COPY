import React from "react";
import { Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/rootslice";
import axios from "axios";
import { message } from "antd";

const AdminContact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <input placeholder="Country" />
        </Form.Item>

        <div>
          <div className="flex justify-end">
            <button className="px-10 py-2 bg-primary text-white" type="submit">
              SAVE
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AdminContact;
