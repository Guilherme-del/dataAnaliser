/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Form, Input,InputNumber } from "antd";

import { FormArea } from "../assets/styles/styled"
import "antd/dist/antd.css";
import { SendOutlined } from '@ant-design/icons';

type Props = {
  editPeople: (e: IPeople) => void
}

const ModalPeopleContent: React.FC<Props> = ({editPeople}) => {
  const [form] = Form.useForm();
 
  const onFinish = (values : IPeople | any) => {
    editPeople(values);
    form.resetFields();
  };

  return (
  <FormArea>
    <Form form={form} layout="inline" initialValues={{ firstName:'',lastName:'',participation:'' }} onFinish = {onFinish}>
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input placeholder='First Name' type='text' id='firstName' />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Please input your last name!' }]} name="lastName">
          <Input placeholder='Last Name' type='text' id='lastName' />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'Please input your participation!' }]} name="participation">
          <InputNumber min={1} max={100} placeholder='Participation' type='text' id='participation' />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" size='middle' icon={<SendOutlined />}> SEND </Button>
        </Form.Item>
    </Form>
  </FormArea>
  )
}

export default ModalPeopleContent