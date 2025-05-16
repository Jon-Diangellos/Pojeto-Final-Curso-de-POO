const usuarioLogado = localStorage.getItem('usuario');
if (!usuarioLogado) {
  alert('Usuário não identificado, faça login novamente.');
  window.location.href = 'index.html';
}

async function carregarDadosUsuario() {
  try {
    const res = await fetch(`http://localhost:5000/api/cliente/${usuarioLogado}`);
    if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
    const dados = await res.json();

    document.getElementById('nome').textContent = dados.nome;
    document.getElementById('CPF').textContent = dados.cpf;
    document.getElementById('idade').textContent = dados.idade;
    document.getElementById('endereco').textContent = dados.endereco;
  } catch (error) {
    alert('Erro ao carregar dados do usuário.');
    console.error(error);
  }
}

async function carregarSaldo() {
  try {
    const res = await fetch(`http://localhost:5000/api/saldo/${usuarioLogado}`);
    if (!res.ok) throw new Error('Erro ao buscar saldo');
    const data = await res.json();
    document.getElementById('saldo').textContent = data.saldo.toFixed(2);
  } catch (error) {
    document.getElementById('saldo').textContent = 'Erro';
    console.error(error);
  }
}

async function carregarExtrato() {
  try {
    const res = await fetch(`http://localhost:5000/api/extrato/${usuarioLogado}`);
    if (!res.ok) throw new Error('Erro ao buscar extrato');
    const data = await res.json();

    const lista = document.getElementById('extrato-list');
    lista.innerHTML = '';
    
    if (!data.extrato || data.extrato.length === 0) {
      lista.innerHTML = '<li>Sem movimentações.</li>';
      return;
    }

    data.extrato.forEach(tx => {
      const li = document.createElement('li');
      li.textContent = `${tx.data} - ${tx.tipo} - R$ ${tx.valor.toFixed(2)}`;
      lista.appendChild(li);
    });
  } catch (error) {
    const lista = document.getElementById('extrato-list');
    lista.innerHTML = '<li>Sem movimentações.</li>';
    console.error(error);
  }
}

function mostrarMsg(id, texto, cor) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.style.color = cor;
}

document.getElementById('transferencia-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const destino = document.getElementById('usuario_destino').value.trim();
  const valor = parseFloat(document.getElementById('valor_transferencia').value);
  if (!destino || isNaN(valor) || valor <= 0) {
    mostrarMsg('msg-transferencia', 'Preencha todos os campos corretamente.', 'red');
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/transferir', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario_origem: usuarioLogado,
        usuario_destino: destino,
        valor
      })
    });
    const data = await res.json();
    if (res.ok) {
      mostrarMsg('msg-transferencia', data.message || 'Transferência realizada!', 'green');
      carregarSaldo();
      carregarExtrato();
      e.target.reset();
    } else {
      mostrarMsg('msg-transferencia', data.message || 'Erro na transferência.', 'red');
    }
  } catch (error) {
    mostrarMsg('msg-transferencia', 'Erro na conexão com o servidor.', 'red');
    console.error(error);
  }
});

document.getElementById('deposito-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const valor = parseFloat(document.getElementById('valor_deposito').value);
  if (isNaN(valor) || valor <= 0) {
    mostrarMsg('msg-deposito', 'Digite um valor válido.', 'red');
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/depositar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario: usuarioLogado,
        valor
      })
    });
    const data = await res.json();
    if (res.ok) {
      mostrarMsg('msg-deposito', data.message || 'Depósito realizado!', 'green');
      carregarSaldo();
      carregarExtrato();
      e.target.reset();
    } else {
      mostrarMsg('msg-deposito', data.message || 'Erro no depósito.', 'red');
    }
  } catch (error) {
    mostrarMsg('msg-deposito', 'Erro na conexão com o servidor.', 'red');
    console.error(error);
  }
});

document.getElementById('saque-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const valor = parseFloat(document.getElementById('valor_saque').value);
  if (isNaN(valor) || valor <= 0) {
    mostrarMsg('msg-saque', 'Digite um valor válido.', 'red');
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/sacar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        usuario: usuarioLogado,
        valor
      })
    });
    const data = await res.json();
    if (res.ok) {
      mostrarMsg('msg-saque', data.message || 'Saque realizado!', 'green');
      carregarSaldo();
      carregarExtrato();
      e.target.reset();
    } else {
      mostrarMsg('msg-saque', data.message || 'Erro no saque.', 'red');
    }
  } catch (error) {
    mostrarMsg('msg-saque', 'Erro na conexão com o servidor.', 'red');
    console.error(error);
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
});


carregarDadosUsuario();
carregarSaldo();
carregarExtrato();
