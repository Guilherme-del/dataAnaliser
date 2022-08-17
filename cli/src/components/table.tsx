import React, { useCallback } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { usePeople } from "../hook/people";

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const { Column, ColumnGroup } = Table;
  const {
    deletePerson,
    peopleList,
    setPeople
  } = usePeople();

  const deletePeople = useCallback(async (e: any, record: any) => {
      e.preventDefault()
      await deletePerson(record.id);
      let people = peopleList.filter(item => item.id !== record.id)
      setPeople([...people]);
  }, [deletePerson, peopleList, setPeople]);

  return (
    <Table rowKey={record => record.id} dataSource={data ? data : []} pagination={{ pageSize: 2 }}>
      <ColumnGroup title="Data">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Participation" dataIndex="participation" key="participation" />
      </ColumnGroup>
      <ColumnGroup title="Actions">
        <Column title="Remove" key="btns" render={(_text, record, _index) => <Button onClick={(e) => { deletePeople(e, record) }} icon={<DeleteOutlined />} />} />
        <Column title="Edit" key="btns" render={(_text, record, _index) => <Button onClick={(e) => { console.log(e, record) }} icon={<EditOutlined />} />} />
      </ColumnGroup>
    </Table>
  );
}

export default TableComponent;