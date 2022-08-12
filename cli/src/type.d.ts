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

type PeopleProps = {
    people: IPeople
}

type ApiDataType = {
    message: string;
    status: string;
    people: IPeople[]
    people: IPeople
  }
  