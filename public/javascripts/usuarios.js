async function carregarUsuarios() {
  try {
    const response = await fetch('/usuario'); // Endpoint para obter usuários
    const usuarios = await response.json();
    
    console.log('Usuários carregados:', usuarios);  // Adicionar log de depuração

    const usuariosList = document.getElementById('usuarios-list');
    usuarios.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.ID_Usuario}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.telefone}</td>
        <td>${usuario.data_nascimento}</td>
      `;
      usuariosList.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

document.addEventListener('DOMContentLoaded', carregarUsuarios);
