/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from "antd";

import { Form, Fields, Input } from "../assets/styles/styled"
import "antd/dist/antd.css";
import { SendOutlined } from '@ant-design/icons';

type Props = {
  savePeople: (e: React.FormEvent, formData: IPeople | any) => void
}

const AddPeople: React.FC<Props> = ({ savePeople }) => {
  const [formData, setFormData] = useState<IPeople | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <Form>
      <Fields>
        <Input placeholder='First Name' onChange={handleForm} type='text' id='firstName' />
        <Input placeholder='Last Name' onChange={handleForm} type='text' id='lastName' />
        <Input placeholder='Participation' onChange={handleForm} type='text' id='participation' />
      </Fields>
      <Button size='large' onClick={(e) => { savePeople(e, formData) }} disabled={formData === undefined ? true : false} icon={<SendOutlined />}> SEND </Button>
    </Form>
  )
}

export default AddPeople
