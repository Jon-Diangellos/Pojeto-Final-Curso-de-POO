document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");
  const message = document.getElementById("message");

  const dataNascimentoInput = document.getElementById("data_nascimento");
  const hoje = new Date().toISOString().split("T")[0];
  dataNascimentoInput.setAttribute("max", hoje);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "";

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const nome = document.getElementById("nome")?.value.trim(); // Corrigido: verifica se o campo existe
    const cpf = document.getElementById("cpf").value.trim();
    const dataNascimento = document.getElementById("data_nascimento").value;
    const endereco = document.getElementById("endereco").value.trim();

    if (!usuario || !senha || !cpf || !dataNascimento || !endereco || !nome) {
      message.textContent = "Preencha todos os campos.";
      message.style.color = "red";
      return;
    }

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
          endereco
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.textContent = "Cadastro realizado com sucesso! Você pode fazer login agora.";
        message.style.color = "green";
        form.reset();
      } else {
        message.textContent = data.message || "Erro no cadastro.";
        message.style.color = "red";
      }
    } catch (error) {
      message.textContent = "Erro na conexão com o servidor.";
      message.style.color = "red";
      console.error("Erro ao registrar:", error);
    }
  });
});
