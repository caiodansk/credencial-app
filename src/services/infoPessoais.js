import api from "./api";

export async function postInfoPessoais(Obj) {
    try {
        const response = api.post('/pessoas-fisicas/', Obj)
        console.log('Sucesso ao cadastrar informações pessoais')
    } catch (error) {
        console.log('Erro ao cadastrar informações de pessoa fisíca')
    }
}