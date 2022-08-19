/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Form, Input,InputNumber } from "antd";
import { SendOutlined } from '@ant-design/icons';
import { FormArea } from "../assets/styles/styled"
import "antd/dist/antd.css";

type Props = {
  savePeople: (e: IPeople) => void
}

const AddPeople: React.FC<Props> = ({savePeople}) => {
  const [form] = Form.useForm();
 
  const onFinish = (values : IPeople | any) => {
    savePeople(values);
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

export default AddPeople
