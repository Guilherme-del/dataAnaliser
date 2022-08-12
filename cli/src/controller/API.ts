import axios, { AxiosResponse } from 'axios'
import config from '../config/config'

export const getPeople = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      config.baseUrl + "/listPerson"
    )
    return todos
  } catch (error) {
    throw new Error()
  }
}

export const addPeople = async (
  formData: IPeople
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<IPeople, 'id'> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      participation: formData.participation
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      config.baseUrl + '/addPerson',
      todo
    )
    return saveTodo
  } catch (error) {
    throw new Error()
  }
}

export const updatePeople = async (
  todo: IPeople
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<IPeople, 'firstName'> = {
      firstName: 'true',
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${config.baseUrl}/edit-todo/${todo}`,
      todoUpdate
    )
    return updatedTodo
  } catch (error) {
    throw new Error()
  }
}

export const deletePeople = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${config.baseUrl}/delete-todo/${id}`
    )
    return deletedTodo
  } catch (error) {
    throw new Error()
  }
}
