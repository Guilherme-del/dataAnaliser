import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as config from "../config/config"
//components
import { Doughnut } from 'react-chartjs-2';
import AddPeople from '../components/Addpeople'
import { getPeople, addPeople, deletePeople } from '../controller/apiCall/API'
import { delay, newSavedArr, newDeletedArr } from '../controller/mainFunc/mainFunc';
//styles
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';
import { Main, PrimaryText, SecondaryText, DataInfo, TableStyle, ChartComponent } from '../assets/styles/styled';


const App: React.FC = () => {
  const [people, setPeople] = useState<IPeople[]>([])
  const [labelChart, setLabelChart] = useState<Array<string>>([])
  const [dataChart, setDataChart] = useState<Array<number>>([])
  const { Column } = Table;
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    if (people.length <= 0) {
      fetchPeople()
    }
  }, [])

  useEffect(() => {
    manipulatedDataChart()
  }, [people])

  //chart configuration variable
  const infoChart = {
    labels: labelChart ? labelChart : [],
    datasets: [
      {
        data: dataChart ? dataChart : [],
        backgroundColor: config.default.colours,
        borderColor: config.default.colours,
        borderWidth: 1,
      },
    ],
  };

  const manipulatedDataChart = (): void => {
    const labelChart = people.map((items) => {
      return (items.firstName + ' ' + items.lastName)
    })
    const dataChart = people.map((items) => {
      return (items.participation)
    })
    setLabelChart(labelChart)
    setDataChart(dataChart)
  }

  async function fetchPeople() {
    getPeople().then(({ data: { people } }) => { setPeople(people) })
      .catch((err: Error) => toast.error(`Erro! descritivo: ${err}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }

  const handleSavePeople = (formData: IPeople): void => {
    addPeople(formData)
      .then(async ({ status }) => {
        if (status === 200) {
          toast.success('Sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const newPerson = newSavedArr(people, formData)
          setPeople([]);
          delay(500).then(async () => {
            setPeople(await newPerson)
          })
        }
        else {
          toast.error('Erro! não foi possivel concluir ação.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err: Error) => toast.error(`${err}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }

  /* Attributes to Edit Person
  const handleUpdatePeople = (people: IPeople): void => {
    updatePeople(people)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! People not updated')
        }
        setPeople(data.people)
      })
        .catch((err) => console.log(err))
   }
  */

  const handleDeletePeople = (e: any, record: any): void => {
    e.preventDefault()
    deletePeople(record.id)
      .then(({ status }) => {
        if (status === 200) {
          toast.success('Sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          const updatePeople = newDeletedArr(record.id, people)
          setPeople([]);
          delay(500).then(async () => {
            setPeople(await updatePeople)
          })
        }
        else {
          toast.error('Erro!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => toast.error(`${err}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }

  return (
    <Main className='App'>
      <AddPeople savePeople={handleSavePeople} />
      <PrimaryText>DATA</PrimaryText>
      <SecondaryText>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</SecondaryText>
      <DataInfo>
        <TableStyle>
          <Table rowKey={record => record.id} dataSource={people ? people : []} pagination={{ pageSize: 2 }}>
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            <Column title="Participation" dataIndex="participation" key="participation" />
            <Column title="Remove" key="btns" render={(_text, record, _index) => <Button onClick={(e) => { handleDeletePeople(e, record) }} icon={<DeleteOutlined />} />} />
          </Table>
        </TableStyle>
        <ChartComponent>
          <Doughnut data={infoChart} />
        </ChartComponent>
      </DataInfo>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </Main>
  )
}

export default App
