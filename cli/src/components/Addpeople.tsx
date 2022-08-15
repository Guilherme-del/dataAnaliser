/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from "antd";
import "antd/dist/antd.css";
import { Form, Fields, Input } from "../assets/styles/styled"

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
      <Button  style={{marginTop:'5px'}} size='large'  onClick={(e) => { savePeople(e, formData) }} disabled={formData === undefined ? true : false}> SEND </Button>
    </Form>
  )
}

export default AddPeople
