# Sistema bancário educacional

Projeto de conclusão de curso de Programação Orientada a Objetos, desenvolvido em equipe. Combina uma interface em HTML, CSS e JavaScript com uma API em Python usando Flask.

**Status: em desenvolvimento.** Trata-se de uma simulação para aprendizado, sem uso de dinheiro real.

## Participação da equipe

Conforme a divisão registrada no documento original:

- **Jonathas (Jon):** front-end com HTML, CSS e JavaScript.
- **Gil:** back-end e responsabilidade prevista para banco de dados.
- **Rafa:** coleta e cadastro de dados dos clientes no back-end.

Na versão atual, os dados são armazenados em memória; não há persistência em banco de dados implementada nos módulos revisados.

## Recursos presentes no código

- Cadastro de usuário e dados do cliente.
- Validação de credenciais.
- Criação de conta e consulta de saldo.
- Depósito, saque e transferência entre contas.
- Registro de movimentações e consulta de extrato.
- Comunicação do front-end com a API por requisições HTTP e JSON.

A presença dessas rotas não significa que todos os fluxos de interface já estejam concluídos ou testados.

## Tecnologias e estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `Banco-Front/` | Páginas HTML, estilos CSS e scripts JavaScript |
| `app.py` | Rotas da API Flask |
| `banco.py` | Classe Banco e operações da simulação |
| `cadastro_usuario.py` | Cadastro e validação de usuários |
| `cadastro_cliente.py` | Dados cadastrais de clientes |

Dependências externas identificadas: Flask e Flask-CORS.

## Executar para estudo local

Com Python 3 e Git instalados:

```bash
git clone https://github.com/Jon-Diangellos/Pojeto-Final-Curso-de-POO.git
cd Pojeto-Final-Curso-de-POO
python -m venv .venv
```

Ative o ambiente virtual:

- Windows: `.venv\Scripts\activate`
- Linux/macOS: `source .venv/bin/activate`

Instale as dependências e inicie a API:

```bash
python -m pip install Flask Flask-CORS
python app.py
```

Em outro terminal, na raiz do projeto, sirva a interface:

```bash
python -m http.server 8000 --directory Banco-Front
```

Abra `http://localhost:8000`. O JavaScript utiliza a API em `http://localhost:5000`. As instruções foram elaboradas por inspeção do código; o fluxo completo ainda precisa ser validado em execução.

## Limitações e próximos passos

- Dados em memória são perdidos ao reiniciar a API.
- Credenciais estão armazenadas sem hash e as rotas bancárias ainda não exigem sessão autenticada. Use apenas dados fictícios em ambiente local.
- O servidor inicia com modo de depuração habilitado.
- Validar entradas, tratamento de erros e integração das telas.
- Adicionar autenticação, persistência, testes e dependências com versões fixadas.
- Revisar representação de valores monetários e regras de transferência.

## Aprendizados

Orientação a objetos, separação de responsabilidades, integração entre front-end e back-end, manipulação do DOM e trabalho em equipe.

[Portfólio de Jonathas](https://github.com/Jon-Diangellos/Portfolio) · [LinkedIn](https://www.linkedin.com/in/jonathas-diangellos-oliveira/)
