import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";

export const getPeople = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      config.baseUrl + "/listPerson"
    );
    return todos;
  } catch (error) {
    throw new Error();
  }
};

export const addPeople = async (
  formData: IPeople
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const People: Omit<IPeople, "id"> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      participation: formData.participation,
    };
    const savePeople: AxiosResponse<ApiDataType> = await axios.post(
      config.baseUrl + "/addPerson",
      People
    );
    return savePeople;
  } catch (error) {
    throw new Error();
  }
};

export const updatePeople = async (
  todo: IPeople
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const peopleUpdate: Pick<IPeople, "firstName"> = {
      firstName: "true",
    };
    const updatedPeople: AxiosResponse<ApiDataType> = await axios.put(
      `${config.baseUrl}/editPeople/${todo}`,
      peopleUpdate
    );
    return updatedPeople;
  } catch (error) {
    throw new Error();
  }
};

export const deletePeople = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedPeople: AxiosResponse<ApiDataType> = await axios.delete(
      `${config.baseUrl}/deletePerson/${id}`
    );
    return deletedPeople;
  } catch (error) {
    toast.error("Erro,tente novamente!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    throw new Error();
  }
};
