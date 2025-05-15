// Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("username").value.trim();
  const senha = document.getElementById("password").value.trim();

  try {
    const response = await fetch("http://127.0.0.1:5500/Banco-Front/index.html", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Bem-vindo, ${data.usuario}!`);

    } else {
      alert(data.message || "Erro no login");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.error("Erro:", error);
  }
});


async function registrarUsuario(usuario, senha, nome, cpf, dataNascimento, endereco) {
  try {
    const response = await fetch("http", {
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

    const usuario = document.getElementById("cad-usuario").value.trim();
    const senha = document.getElementById("cad-senha").value.trim();
    const nome = document.getElementById("cad-nome").value.trim();
    const cpf = document.getElementById("cad-cpf").value.trim();
    const dataNascimento = document.getElementById("cad-data-nascimento").value.trim();
    const endereco = document.getElementById("cad-endereco").value.trim();

    registrarUsuario(usuario, senha, nome, cpf, dataNascimento, endereco);
  });
}
