// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("username").value.trim();
  const senha = document.getElementById("password").value.trim();

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Bem-vindo, ${data.usuario}!`);
      // Salvar usuário logado no localStorage
      localStorage.setItem("usuario", data.usuario);
      // Redirecionar para dashboard após login
      window.location.href = "dashboard_login.html";
    } else {
      alert(data.message || "Erro no login");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.error("Erro:", error);
  }
});

// Registrar
async function registrarUsuario(usuario, senha, nome, cpf, dataNascimento, endereco) {
  try {
    const response = await fetch("http://localhost:5000/api/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario,
        senha,
        nome,
        cpf,
        data_nascimento: dataNascimento,
        endereco,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      document.getElementById("cadastro-form").reset();
    } else {
      alert(data.message || "Erro no registro");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.error("Erro:", error);
  }
}

const cadastroForm = document.getElementById("cadastro-form");
if (cadastroForm) {
  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const nome = document.getElementById("nome")?.value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const dataNascimento = document.getElementById("data_nascimento").value.trim();
    const endereco = document.getElementById("endereco").value.trim();

    registrarUsuario(usuario, senha, nome, cpf, dataNascimento, endereco);
  });
}


async function carregarExtrato(usuario) {
  try {
    const res = await fetch(`http://localhost:5000/api/extrato/${usuario}`);
    if (!res.ok) {
      alert("Erro ao carregar extrato");
      return;
    }
    const data = await res.json();
    const extratoList = document.getElementById("extrato-list");
    if (!extratoList) return;

    extratoList.innerHTML = ""; 

    data.extrato.forEach(mov => {
      const item = document.createElement("li");
      item.textContent = `${mov.data} - ${mov.tipo} - R$${mov.valor.toFixed(2)} - ${mov.descricao}`;
      extratoList.appendChild(item);
    });
  } catch (error) {
    alert("Erro ao carregar extrato");
    console.error(error);
  }
}


