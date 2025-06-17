import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function postPessoaFisica(Obj) {
    const token = await AsyncStorage.getItem('userToken')
    if (!token) {
        alert('Você precisa fazer login para continuar.')
        return;
    }

    try {
        const response = await api.post('/pessoas-fisicas/', Obj)
        console.log('Sucesso ao cadastrar informações pessoais')
    } catch (error) {
        console.log('Erro ao cadastrar informações de pessoa fisíca')
    }
}

export async function postPessoaJuridica(Obj) {
    const token = await AsyncStorage.getItem('userToken')
    if (!token) {
        alert('Você precisa fazer login para continuar.')
        return;
    }

    try {
        const response = await api.post('/pessoas-fisicas/', Obj)
        console.log('Sucesso ao cadastrar informações pessoais')
    } catch (error) {
        console.log('Erro ao cadastrar informações de pessoa fisíca')
    }
}


