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
    const cpf = document.getElementById("cpf").value.trim();
    const dataNascimento = document.getElementById("data_nascimento").value;
    const endereco = document.getElementById("endereco").value.trim();

    if (!usuario || !senha || !cpf || !dataNascimento || !endereco) {
      message.textContent = "Preencha todos os campos.";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5500/Banco-Front/cadastro.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario,
          senha,
          cpf,
          data_nascimento: dataNascimento,
          endereco,
        }),
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
      console.error(error);
    }
  });
});
