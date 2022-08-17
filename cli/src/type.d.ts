interface IPeople {
    id: string;
    firstName: string;
    lastName: string;
    participation: number;
}

interface DataType {
    id: React.Key;
    firstName: string;
    lastName: string;
    participation: number
  }

interface ChartLabel {
  label : Array
}

interface TableProps {
  data: IPeople[];
}

interface PeopleContextData {
  peopleList: IPeople[];
  setPeople: Dispatch<SetStateAction<IPeople[]>>;
  deletePerson(id?: string): Promise<void>;
  fetchPeople(): Promise<void>;
  addPerson(payload: IPeople): Promise<void>;
}

type PeopleProps = {
    people: IPeople
}

type ApiDataType = {
    message: string;
    status: string;
    people: IPeople[]
    people: IPeople
  }
  