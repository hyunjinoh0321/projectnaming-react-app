import axios from 'axios';

export const deleteGrade = async (id) => {
  try {
    const response = await axios.delete(`http://172.23.125.110:3030/projectnaming/grade/${id}`);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
}

export const deleteWork = async (id) => {
    try {
      const response = await axios.delete(`http://172.23.125.110:3030/projectnaming/work/${id}`);
      console.log(response.status);
    } catch (error) {
      throw error;
    }
}

export const deleteRule = async (id) => {
    try {
      const response = await axios.delete(`http://172.23.125.110:3030/projectnaming/rule/${id}`);
      console.log(response.status);
    } catch (error) {
      throw error;
    }
}

export const deleteBoard = async (id) => {
  try {
    const response = await axios.delete(`http://172.23.125.110:3030/projectnaming/board/${id}`);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
}

export const deleteMaraton = async (id) => {
  try {
    const response = await axios.delete(`http://172.23.125.110:3030/maraton/${id}`);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
}

export const updateProcessYN = async (id) => {
  try {
    const response = await axios.put(`http://172.23.125.110:3030/projectnaming/board/processYN/${id}`);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
}

export const getGrade = async() => {    
  try {
    const response = await axios.get(`http://172.23.125.110:3030/projectnaming/grade/simple`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getWork = async() => {    
  try {
    const response = await axios.get(`http://172.23.125.110:3030/projectnaming/work/simple`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}