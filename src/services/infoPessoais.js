import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export async function postInfoPessoais(objPessoaFisica, objPessoaJuridica, cargo, dataAdmissao, renda, ctps, pis, fone, navigation) {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    alert('Você precisa fazer login para continuar.');
    return;
  }

  try {
    // Pessoa Física
    const pfResponse = await api.post('/pessoas-fisicas/', objPessoaFisica, {
      headers: { Authorization: `Token ${token}` }
    });
    const pf = pfResponse.data.id;
    console.log('Pessoa Física cadastrada:', pfResponse.data);

    // Pessoa Jurídica
    const pjResponse = await api.post('/pessoas-juridicas/', objPessoaJuridica, {
      headers: { Authorization: `Token ${token}` }
    });
    const pj = pjResponse.data.id;
    console.log('Pessoa Jurídica cadastrada:', pjResponse.data);

    // Vínculo
    const vinculo = {
      cargo,
      data_admissao: dataAdmissao,
      renda: renda,
      num_ctps: ctps,
      pis_pasep: pis,
      fone_comercial: fone,
      pessoajuridica: pj,
      pessoafisica: pf,
    };

    const vinculoResponse = await api.post('/vinculos/', vinculo, {
      headers: { Authorization: `Token ${token}` }
    });
    const vinculoId = vinculoResponse.data.id;
    console.log("ID VINCULO: ", vinculoResponse.data.id)

    // Pedido
    const pedido = {
      vinculo: vinculoId,
    };

    const pedidoResponse = await api.post('/pedidos-credencial/', pedido, {
      headers: { Authorization: `Token ${token}` }
    });
    const pedidoId = pedidoResponse.data.id;

    alert('Sucesso! Agora envie seus documentos.');
    
    
  } catch (error) {
    console.error('Erro ao enviar dados:', error?.response || error);
    alert('Erro ao cadastrar as informações. Verifique os dados e tente novamente.');
  }
}
