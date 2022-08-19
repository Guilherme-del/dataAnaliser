interface IPeople {
    id: string;
    firstName: string;
    lastName: string;
    participation: number;
}

interface ChartLabel {
  label : Array
}

interface TableProps {
  data: IPeople[];
}

interface editModalvisibleProps {
  isVisible: boolean;
  data:IPeople
}

interface PeopleContextData {
  peopleList: IPeople[];
  setPeople: Dispatch<SetStateAction<IPeople[]>>;
  modalVisible: boolean;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
  toBeEdited: IPeople;
  setToBeEdited: Dispatch<SetStateAction<IPeople>>;
  fetchPeople(): Promise<void>;
  addPerson(payload: IPeople): Promise<void>;
  handleUpdatePerson(record: IPeople): Promise<void>;
  deletePerson(id?: string): Promise<void>;
}

type PeopleProps = {
  data: IPeople[]
}

type ApiDataType = {
    message: string;
    status: string;
    people: IPeople[]
    people: IPeople
  }
  