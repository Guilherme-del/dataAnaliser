type PeopleType = {
  firstName: string;
  lastName: string;
  participation: number;
};

type IRequest = {
  body: PeopleType;
  params: { peopleId: string };
};
