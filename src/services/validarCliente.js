// api/validarCliente.js
import axiosInstance from "./axiosInstance";

export const validarCliente = async (cpf, dataNascimento) => {
  try {
    const response = await axiosInstance.get(`/sca/cliente/existecn/${cpf}/${dataNascimento}`);
    return response.data; // geralmente retorna true/false
  } catch (error) {
    console.error("Erro ao validar cliente:", error);
    throw error;
  }
};
