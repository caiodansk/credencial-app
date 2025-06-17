import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function enviarDocumento(pedidoCredencialId, tipoDocumento, nomeDocumento, arquivo) {
  const formData = new FormData();
  formData.append('pedido_credencial', pedidoCredencialId);
  formData.append('tipo_documento', tipoDocumento);
  formData.append('nome_documento', nomeDocumento); 
  formData.append('arquivo', {
    uri: arquivo.uri,
    name: arquivo.fileName || 'document.jpg', 
    type: arquivo.mimeType || arquivo.type || 'image/jpeg'
  });

  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await api.post(
      '/upload/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log('Upload realizado com sucesso:', response.data);
    console.log('Documento enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar documento:', error.response || error.message);
    alert('Erro ao enviar documento');
  }
}



