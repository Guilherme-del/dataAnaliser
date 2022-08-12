/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';

import AddPeople from '../components/Addpeople'
import { getPeople, addPeople } from '../controller/API'
import "antd/dist/antd.css";

const App: React.FC = () => {
  const [people, setPeople] = useState<IPeople[]>([])
  const { Column } = Table;

  useEffect(() => {
    fetchPeople()
  }, [])

  const fetchPeople = (): void => {
    getPeople().then(({ data: { people } }) => { setPeople(people) })
      .catch((err: Error) => console.log(err))
  }

  const handleSavePeople = (e: React.FormEvent, formData: IPeople): void => {
    e.preventDefault()
    addPeople(formData)
    .then(({ status, data }) => {
      if (status !== 200) {
        throw new Error('Error! Todo not saved')
      }
      setPeople({
        ...people//,data.people
      })
    })
      .catch((err) => console.log(err))
  }

  //Attributes to Add
  //  const handleUpdatePeople = (people: IPeople): void => {
  //    updatePeople(people)
  //      .then(({ status, data }) => {
  //        if (status !== 200) {
  //          throw new Error('Error! Todo not updated')
  //        }
  //        setPeople(data.people)
  //      })
  //      .catch((err) => console.log(err))
  //  }
  //
  //  const handleDeletePeople = (_id: string): void => {
  //    deletePeople(_id)
  //      .then(({ status, data }) => {
  //        if (status !== 200) {
  //          throw new Error('Error! People not deleted')
  //        }
  //        setPeople(data.people)
  //      })
  //      .catch((err) => console.log(err))
  // }

  return (
    <main className='App'>
      <>
        <AddPeople savePeople={handleSavePeople} />
        <div className='Table'>
          <Table pagination={{pageSize: 10}} dataSource={people}>
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Participation" dataIndex="participation" key="participation" />
          </Table>
        </div>
      </>
    </main>
  )
}

export default App
