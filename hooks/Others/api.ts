import axios, { AxiosRequestConfig } from "axios";
import { IPUProps, CPUProps, AgentProps, ResourceProps } from './types';
import { toast } from "@/components/ui/use-toast";

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Base Axios configuration generator
const createAxiosConfig = (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
): AxiosRequestConfig => {
  return {
    method,
    url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    data,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  };
};

// Error handling function
const handleError = (error: any, action: string) => {
  if (error.response) {
    console.log(`Error response from backend:`, error.response.data);
    toast({
      title: "Something went wrong!",
      description: error.response.data.msg || `An error occurred while ${action}`,
      className: "toast-error",
    });
  }
  throw error;
};

// IPU Requests
export const addIPU = async (payload: IPUProps) => {
  const config = createAxiosConfig("POST", "/api/productiveunit/addIPU", payload);
  try {
    const response = await axios(config);
    console.log('IPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "adding a Productive Unit");
  }
};

export const editIPU = async (id: string, payload: IPUProps) => {
  const config = createAxiosConfig("PUT", `/api/productiveunit/editIPU/${id}`, payload);
  try {
    const response = await axios(config);
    console.log('IPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "editing the Productive Unit");
  }
};

export const getIPU = async () => {
  const config = createAxiosConfig("GET", "/api/productiveunit/getIPU");
  try {
    const response = await axios(config);
    console.log('IPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "retrieving the Productive Units");
  }
};

export const deleteIPU = async (id: string) => {
  const config = createAxiosConfig("DELETE", `/api/productiveunit/deleteIPU/${id}`);
  try {
    const response = await axios(config);
    console.log('IPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "deleting the Productive Unit");
  }
};

// CPU Requests
export const addCPU = async (payload: CPUProps) => {
  const config = createAxiosConfig("POST", "/api/productiveunit/addCPU", payload);
  try {
    const response = await axios(config);
    console.log('CPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "adding a Corporate Productive Unit");
  }
};

export const editCPU = async (id: string, payload: CPUProps) => {
  const config = createAxiosConfig("PUT", `/api/productiveunit/editCPU/${id}`, payload);
  try {
    const response = await axios(config);
    console.log('CPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "editing the Corporate Productive Unit");
  }
};

export const getCPU = async () => {
  const config = createAxiosConfig("GET", "/api/productiveunit/getCPU");
  try {
    const response = await axios(config);
    console.log('CPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "retrieving the Corporate Productive Units");
  }
};

export const deleteCPU = async (id: string) => {
  const config = createAxiosConfig("DELETE", `/api/productiveunit/deleteCPU/${id}`);
  try {
    const response = await axios(config);
    console.log('CPU Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "deleting the Corporate Productive Unit");
  }
};

// Resource Requests
export const addResource = async (payload: ResourceProps) => {
  const config = createAxiosConfig("POST", "/api/resources/add", payload);
  try {
    const response = await axios(config);
    console.log('Resource Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "adding a Resource");
  }
};

export const editResource = async (id: string, payload: ResourceProps) => {
  const config = createAxiosConfig("PUT", `/api/resources/update/${id}`, payload);
  try {
    const response = await axios(config);
    console.log('Resource Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "editing the Resource");
  }
};

export const getResource = async () => {
  const config = createAxiosConfig("GET", "/api/resources");
  try {
    const response = await axios(config);
    console.log('Resource Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "retrieving the Resources");
  }
};

export const deleteResource = async (id: string) => {
  const config = createAxiosConfig("DELETE", `/api/resources/delete/${id}`);
  try {
    const response = await axios(config);
    console.log('Resource Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "deleting the Resource");
  }
};

// Agent Requests
export const addAgent = async (payload: AgentProps) => {
  const config = createAxiosConfig("POST", "/api/agent/addag", payload);
  try {
    const response = await axios(config);
    console.log('Agent Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "adding an Agent");
  }
};

export const editAgent = async (id: string, payload: AgentProps) => {
  const config = createAxiosConfig("PUT", `/api/agent/updateag/${id}`, payload);
  try {
    const response = await axios(config);
    console.log('Agent Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "editing the Agent");
  }
};

export const getAgent = async () => {
  const config = createAxiosConfig("GET", "/api/agent/getag");
  try {
    const response = await axios(config);
    console.log('Agent Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "retrieving the Agents");
  }
};

export const deleteAgent = async (id: string) => {
  const config = createAxiosConfig("DELETE", `/api/agent/deleteag/${id}`);
  try {
    const response = await axios(config);
    console.log('Agent Backend response:', response.data);
    return response;
  } catch (error: any) {
    handleError(error, "deleting the Agent");
  }
};
