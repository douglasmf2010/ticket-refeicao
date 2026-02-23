import axios from 'axios';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
// IMPORTANTE:
// Em produção, isso seria um domínio fixo (ex: api.escola.com.br).
const BASE_URL = 'https://prayer-lighter-iowa-filing.trycloudflare.com';
// 1. Instância do Axios
// Criamos uma configuração padrão para não precisar digitar o endereço do servidor
// em toda requisição.
const api = axios.create({
baseURL: BASE_URL,
});
// =================================================================
// 2. BUSCAR DADOS (GET)
// =================================================================
// Função para listar alunos
export const getStudents = async () => {
try {
const response = await api.get('/students');
return response.data.map((item) => new User(item));
} catch (error) {
console.error('Erro ao buscar alunos:', error);
// TRATAMENTO DE ERRO:
// Se a internet cair, retornamos uma lista vazia []
// Isso evita que a tela de listagem trave (crash) ao tentar fazer um .map()
return [];
}
};
// Função para listar tickets
export const getTickets = async () => {
try {
const response = await api.get('/tickets');
return response.data.map((item) => new Ticket(item));
} catch (error) {
console.error('Erro ao buscar tickets:', error);
return []; // Mesmo princípio: evita crash retornando array vazio
}
};
// =================================================================
// 3. ENVIAR DADOS SENSÍVEIS (POST) - A Grande Mudança
// =================================================================
export const loginRequest = async (email, password) => {
try {
// DIFERENÇA CRUCIAL (GET vs POST):
// Não enviamos senha pela URL (GET). Enviamos no "corpo" da requisição (POST).
// É como enviar uma carta lacrada (POST) vs escrever num cartão postal (GET).
const response = await api.post('/login', {
email,password // Corpo da requisição (Body)
});
// Se o servidor responder Sucesso (200), retornamos os dados do usuário.
return new User(response.data);
} catch (error) {
// Se o servidor responder Erro (401 - Não autorizado ou 500 - Erro interno)
console.log(
'Tentativa de login falhou:',
error.response?.data || error.message,
);
// Retornamos NULL.
// Isso sinaliza para o nosso AppContext que o login não deu certo.
return null;
}
};
export default api;

// ==========================================================
// 3. FUNCIONALIDADES DO ALUNO (TICKETS)
// ==========================================================

// Verifica se o aluno JÁ tem ticket HOJE
export const checkTodayTicket = async (userId) => {
  try {
    // Nova rota
    const response = await api.get(`/tickets/today/${userId}`);

    // Se o backend achar, devolve o ticket. Se não, devolve null.
    return response.data ? new Ticket(response.data) : null;
  } catch (error) {
    // Se o servidor retornar 404 (Não encontrado), sabemos que ele não tem ticket
    if (error.response && error.response.status === 404) {
      return null;
    }

    console.log('Erro ao verificar ticket do dia:', error);
    return null;
  }
};

// Solicita um NOVO ticket
export const requestNewTicket = async (userId) => {
  try {
    // Tenta criar o ticket
    const response = await api.post('/tickets', { user_id: userId });

    // Se der certo (201), retorna o Ticket modelado
    return new Ticket(response.data);
  } catch (error) {
    // O Axios joga o erro pro catch se for 400 ou 500 automaticamente
    // Vamos repassar o erro para a tela mostrar o Alert
    throw error;
  }
};