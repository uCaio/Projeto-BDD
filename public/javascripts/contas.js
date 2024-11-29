async function carregarContas() {
    try {
      const response = await fetch('/contaBancaria'); // Endpoint para obter contas
      const contas = await response.json();
  
      const contasList = document.getElementById('contas-list');
      contas.forEach(conta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${conta.ID_Conta}</td>
          <td>${conta.banco}</td>
          <td>${conta.agencia}</td>
          <td>${conta.conta}</td>
          <td>${conta.tipo_conta}</td>
          <td>R$ ${conta.saldo_atual.toFixed(2)}</td>
        `;
        contasList.appendChild(tr);
      });
    } catch (error) {
      console.error('Erro ao carregar contas bancárias:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', carregarContas);
  