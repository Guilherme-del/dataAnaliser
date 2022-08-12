/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button } from "antd"
import "antd/dist/antd.css";

type Props = {
  savePeople: (e: React.FormEvent, formData: IPeople | any) => void
}

const AddPeople: React.FC<Props> = ({savePeople}) => {
  const [formData, setFormData] = useState<IPeople | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' >
      <div className='Inputs'>
        <div>
          <input placeholder='First Name' onChange={handleForm} type='text' id='firstName' />
        </div>
        <div>
          <input placeholder='Last Name' onChange={handleForm} type='text' id='lastName' />
        </div>
        <div>
          <input placeholder='Participation' onChange={handleForm} type='text' id='participation' />
        </div>
      </div>
      <Button onClick={(e) => {savePeople(e,formData)}} className='btn' disabled={formData === undefined ? true : false}> SEND </Button>
    </form>
  )
}

export default AddPeople
