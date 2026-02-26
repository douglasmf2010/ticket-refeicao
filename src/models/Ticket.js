export class Ticket {
 constructor(data) {
 const safeData = data || {};
 
 this.id = String(safeData.id || Date.now());
 this.userId = safeData.user_id || '';
 this.status = safeData.status || 'VALIDO';
 this.createdAt = safeData.created_at || new Date().toISOString();
 }
 
 /**
 * Define a cor do cartão.
 * @param {boolean} isMarketOpen - (Opcional) Se a cantina está aberta agora.
 */
 getStatusColor(isMarketOpen = true) {
 // 1. Se já foi usado ou cancelado, a regra do banco manda.
 if (this.status === 'USADO') return '#9E9E9E'; // Cinza
 if (this.status === 'CANCELADO') return '#F44336'; // Vermelho
 
 // 2. Se está VALIDO no banco, mas a cantina FECHOU:
 if (this.status === 'VALIDO' && !isMarketOpen) {
 return '#607d8b'; // Azul acinzentado (Cor de "Expirado")
 }
 
 // 3. Se está tudo ok
 if (this.status === 'VALIDO') return '#4CAF50'; // Verde
 
 return '#FFC107'; // Amarelo (Default)
 }
 
 /**
 * Texto amigável para o usuário.
 * @param {boolean} isMarketOpen - (Opcional) Se a cantina está aberta agora.
 */
 getStatusText(isMarketOpen = true) {
 // 1. Prioridade para o status final do banco
 switch (this.status) {
 case 'USADO':
 return 'Refeição Consumida';
 case 'CANCELADO':
 return 'Ticket Cancelado';
 }
 
 // 2. Se é VALIDO, mas o tempo acabou
 if (this.status === 'VALIDO' && !isMarketOpen) {
 return 'NÃO UTILIZADO (VENCIDO)';
 }
 
 // 3. Se está valendo
 if (this.status === 'VALIDO') {
 return 'Disponível para Uso';
 }
 
 return 'Status Desconhecido';
 }
}
