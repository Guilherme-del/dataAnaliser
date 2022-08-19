import React, {
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';
import {toast } from 'react-toastify';
//services
import { getPeople, addPeople, updatePeople, deletePeople } from '../services/apiCall/API'

const PeopleContext = createContext<PeopleContextData>({} as PeopleContextData);
type Props = {
  children?: React.ReactNode
};
const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeople] = useState<IPeople[]>([]);
  const [toBeEdited, setToBeEdited] = useState<IPeople>({id:"",firstName:"",lastName:"",participation:0});
  const [modalVisible, setModalVisibility] = useState<boolean>(false);

  const fetchPeople = useCallback(async () => {
    try {
      getPeople().then(({ data: { people } }) => { setPeople(people) })
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addPerson = useCallback(async (payload: IPeople) => {
    addPeople(payload)
      .then(async ({ status,data }) => {
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
          setPeople(data.people)
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
      .catch(() => toast.error(`Erro! não foi possivel concluir ação.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }, []);

  const handleUpdatePerson = useCallback(async (record: IPeople) => {
    updatePeople(record)
      .then(({ status,data }) => {
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
          setPeople(data.people)
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
      .catch(() => toast.error(`Erro! não foi possivel concluir ação.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }, []);

  const deletePerson = useCallback(async (id: string) => {
    deletePeople(id)
      .then(({ status,data }) => {
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
          setPeople(data.people)
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
      .catch(() => toast.error(`Erro! não foi possivel concluir ação.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }, []);

  return (
    <PeopleContext.Provider
      value={{  
        peopleList,     
        setPeople,
        toBeEdited,
        setToBeEdited,
        modalVisible,
        setModalVisibility,
        fetchPeople,
        handleUpdatePerson,     
        addPerson,
        deletePerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

const usePeople = (): PeopleContextData => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error('usePeople must be used within an PeopleProvider');
  }
  return context;
};

export { usePeople, PeopleProvider };