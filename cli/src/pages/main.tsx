import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as config from "../config/config"
//components
import { Doughnut } from 'react-chartjs-2';
import AddPeople from '../components/Addpeople'
import { getPeople, addPeople, deletePeople } from '../controller/API'
//styles
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';
import { Main,PrimaryText,SecondaryText,DataInfo,TableStyle, ChartComponent } from '../assets/styles/styled';


const App: React.FC = () => {
  const [people, setPeople] = useState<IPeople[]>([])
  const [labelChart, setLabelChart] = useState<Array<string>>([])
  const [dataChart, setDataChart] = useState<Array<number>>([])
  const { Column } = Table;
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    if(people.length <= 0 ){
      fetchPeople()  
    }
    else if (labelChart.length <= 0 || dataChart.length <= 0){
      manipulatedDataChart()
    }
    else {
      console.log(infoChart,dataChart)
      return
    }
  }, [people])

  //chart config variable
  const infoChart = {
    labels: labelChart ? labelChart : ['NoData'],
    datasets: [
      {
        data: dataChart ? dataChart : [0],
        backgroundColor: config.default.colours,
        borderColor: config.default.colours,
        borderWidth:1,
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
      console.log(labelChart)
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
          /*
          Todo:
          Manipular Estados
          */
          delay(1000).then(() => {
            window.location.reload();
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
          /*
          Todo:
          Manipular Estados
          */
          delay(1000).then(() => {
            window.location.reload();
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
    <Main className='App'>
      <>
        <AddPeople savePeople={handleSavePeople} />
        <PrimaryText>DATA</PrimaryText>
        <SecondaryText>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</SecondaryText>
        <DataInfo>
          <TableStyle>
            <Table rowKey='lastName' dataSource={people ? people : []} pagination={{ pageSize: 5 }}>
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
    </Main>
  )
}

export default App
