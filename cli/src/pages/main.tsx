import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AddPeople from '../components/Addpeople'
import { getPeople, addPeople, deletePeople } from '../controller/API'
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [people, setPeople] = useState<IPeople[]>([])
  const [labelChart, setLabelChart] = useState<Array<string>>([])
  const [dataChart, setDataChart] = useState<Array<number>>([])
  const { Column } = Table;
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
      fetchPeople()
  }, [])

  //chart config const
  const infoChart = {
    labels: labelChart ? labelChart : [],
    datasets: [
      {
        data: dataChart ? dataChart : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
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
  async function delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  }

  async function fetchPeople() {
    getPeople().then(({ data: { people } }) => { setPeople(people) })
      .catch((err: Error) => console.log(err))
  }

  const handleSavePeople = (e: React.FormEvent, formData: IPeople): void => {
    e.preventDefault()
    addPeople(formData)
      .then(({ status }) => {
        if (status === 200) {
          toast.success('Sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          fetchPeople()
          delay(1500).then(() => {
            manipulatedDataChart()
          });
        }
        else {
          toast.error('Erro,tente novamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }

      })
      .catch((err) => console.log(err))
  }

  //Attributes to EditPeople
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

  const handleDeletePeople = (e: any, record: any): void => {
    e.preventDefault()
    deletePeople(record.id)
      .then(({ status }) => {
        if (status === 200) {
          toast.success('Sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          fetchPeople()
          delay(1500).then(() => {
            manipulatedDataChart()
          });
        }
        else {
          toast.error('Erro,tente novamente!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      })
      .catch((err) => console.log(err))
  }


  return (
    <main className='App'>
      <>
        <AddPeople savePeople={handleSavePeople} />
        <h1>DATA</h1>
        <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
        <div className='dataInfo'>
          <div className='Table'>
            <Table pagination={{ pageSize: 5 }} dataSource={people ? people : []}>
              <Column title="First Name" dataIndex="firstName" key="firstName" />
              <Column title="Last Name" dataIndex="lastName" key="lastName" />
              <Column title="Participation" dataIndex="participation" key="participation" />
              <Column title="Remove" render={(_text, record, _index) => <Button onClick={(e) => { handleDeletePeople(e, record) }} icon={<DeleteOutlined />} />} />
            </Table>
          </div>
          <div className='chartComponent'>
            <Doughnut data={infoChart} />
          </div>
        </div>
      </>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>

  )
}

export default App
