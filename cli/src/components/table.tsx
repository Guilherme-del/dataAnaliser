import React, { useCallback } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { usePeople } from "../hook/people";

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const { Column, ColumnGroup } = Table;
  const {
    peopleList,
    setPeople,
    setToBeEdited,
    setModalVisibility,
    deletePerson,
  } = usePeople();

  const deletePeople = useCallback(async ( record: IPeople) => {
      await deletePerson(record.id);
      let people = peopleList.filter(item => item.id !== record.id)
      setPeople([...people]);
  }, [deletePerson, peopleList, setPeople]);

  const updatePeople = useCallback(async ( record: IPeople) => {
   await setToBeEdited(record)
  setModalVisibility(true)  
}, [setModalVisibility,setToBeEdited]);

  return (
    <Table rowKey={record => record.id} dataSource={data ? data : []} pagination={{ pageSize: 2 }}>
      <ColumnGroup title="Data">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Participation" dataIndex="participation" key="participation" />
      </ColumnGroup>
      <ColumnGroup title="Actions">
        <Column title="Edit" key="btns" render={(_text, record: IPeople, _index) => <Button onClick={(_e) => { updatePeople(record) }} icon={<EditOutlined />} />} />
        <Column title="Remove" key="btns" render={(_text, record: IPeople, _index) => <Button onClick={(_e) => { deletePeople(record) }} icon={<DeleteOutlined />} />} />      
      </ColumnGroup>
    </Table>
  );
}

export default TableComponent;