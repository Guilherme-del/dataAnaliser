import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Modal } from "antd";
//settings
import { usePeople } from '../hook/people';
//style
import "antd/dist/antd.css";

const ModalPeopleContent: React.FC<editModalvisibleProps> = ({ isVisible }) => {
  const [form] = Form.useForm();
  const {
    setModalVisibility,
    toBeEdited,
    handleUpdatePerson
  } = usePeople();

  useEffect(() => {
    form.setFieldsValue(toBeEdited)
   }, [form, toBeEdited])
   
  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {      
        values.id = toBeEdited.id
        await handleUpdatePerson(values)
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    setModalVisibility(false);
  };

  const handleCancel = () => {
    setModalVisibility(false);
    form.resetFields();
  };

  return (
    <Modal forceRender maskClosable={false} key={Math.random()} title="Edit person" visible={isVisible} onOk={() => { handleOk() }} onCancel={handleCancel}>
      <Form id="EditForm" form={form} layout="vertical" initialValues={toBeEdited} onFinish={handleOk} >
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input placeholder='First Name' type='text' id='firstName' />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Please input your last name!' }]} name="lastName">
          <Input placeholder='Last Name' type='text' id='lastName' />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Please input your participation!' }]} name="participation">
          <InputNumber min={1} max={100} placeholder='Participation' type='text' id='participation' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalPeopleContent
