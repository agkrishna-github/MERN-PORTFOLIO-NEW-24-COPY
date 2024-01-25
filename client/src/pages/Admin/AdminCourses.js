import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, message } from "antd";
import { Form } from "antd";
import { ReloadData, hideLoading, showLoading } from "../../redux/rootslice";
import axios from "axios";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.root.portfolioData);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const tempTechnologies = values?.technologies?.split(",");
      values.technologies = tempTechnologies;
      dispatch(showLoading());

      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-course", values);
      }
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.post("/api/portfolio/delete-course", {
        _id: item._id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(hideLoading());
        dispatch(ReloadData(true));
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
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add course
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {course.map((course, index) => (
          <div
            className="shadow border p-5 border-gray-400 flex flex-col gap-5"
            key={index}
          >
            <h2 className="text-primary text-xl font-bold">{course.title}</h2>
            <hr />
            <img src="" alt="course pic" className="h-60 w-80" />

            <h2>{course.description}</h2>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(course)}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Course" : "Add Course"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              ...selectedItemForEdit,
              technologies: selectedItemForEdit?.technologies?.join(" , "),
            }}
          >
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <input placeholder="Image" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>
            <Form.Item name="link" label="Link">
              <input placeholder="Link" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AdminCourses;
