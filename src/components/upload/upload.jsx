import React, { useState } from 'react';
import './upload.scss';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Form, Select, Upload, Button, Modal } from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadProduct = () => {
  const [formData, setFormData] = useState({});
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleForm = (values) => {
    setFormData(values);
    console.log(values);
  };

  return (
    <div className='upload-form'>
      <div className='form'>
        <h1>Upload Form</h1>
        <Form onFinish={handleForm}>
          <Form.Item label="name" name="name">
            <Input type='text' placeholder="Name" />
          </Form.Item>
          <Form.Item label="description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="categories" name="categories">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Button type='primary' htmlType="submit" onClick={showModal}>Upload Product</Button>
        </Form>

        {/* Display the form data */}
        <Modal title="Upload products" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h1>Thanks For visiting It is a dummy product so product will not uploaded</h1>
        <h2>Form Data:</h2>
        <p>Name: {formData.name}</p>
        <p>Description: {formData.description}</p>
        <p>Categories: {formData.categories}</p>
      </Modal>
      </div>
    </div>
  );
};

export default UploadProduct;
