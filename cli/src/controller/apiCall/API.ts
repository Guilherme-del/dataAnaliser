import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";

/**
 * Inicia load dados.
 */
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

/**
 * Inclui uma pessoa.
 *  * @param {*} formData
 */
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

/**
 * edita uma pessoa.
 *  @param {*} id
 *  @param {*} formData
 */
export const updatePeople = async (
  id: string, formData: IPeople
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const peopleUpdate: Omit<IPeople, "id"> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      participation: formData.participation,
    };
    const updatedPeople: AxiosResponse<ApiDataType> = await axios.put(
      `${config.baseUrl}/editPeople/${id}`,
      peopleUpdate
    );
    return updatedPeople;
  } catch (error) {
    throw new Error();
  }
};

/**
 * remove uma pessoa.
 *  @param {*} id
 */
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
