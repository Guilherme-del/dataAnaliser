import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { ToastContainer } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
//components
import * as config from "../../config/config"
import { usePeople } from "../../hook/people";
import AddPeople from '../../components/Addpeople'
import TableComponent from '../../components/table';


//styles
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';
import { Main, PrimaryText, SecondaryText, DataInfo, TableStyle, ChartComponent } from '../../assets/styles/styled';

const App: React.FC = () => {
  const [labelChart, setLabelChart] = useState<Array<string>>([])
  const [dataChart, setDataChart] = useState<Array<number>>([])

  ChartJS.register(ArcElement, Tooltip, Legend);

  const {   
    addPerson,
    peopleList,
    fetchPeople,
  } = usePeople();

  useEffect(() => {
    fetchPeople().then(()=>{
      manipulatedDataChart()
    }) 
  }, [fetchPeople])

  useEffect(() => {
      manipulatedDataChart()
  }, [peopleList])

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
    const labelChart = peopleList.map((items) => {
      return (items.firstName + ' ' + items.lastName)
    })
    const dataChart = peopleList.map((items) => {
      return (items.participation)
    })
   
    setLabelChart(labelChart)
    setDataChart(dataChart)
  }

  return (
    <Main className='App'>
      <AddPeople savePeople={addPerson} />
      <PrimaryText>DATA</PrimaryText>
      <SecondaryText>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</SecondaryText>
      <DataInfo>
        <TableStyle>
          <TableComponent data={peopleList} />
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
