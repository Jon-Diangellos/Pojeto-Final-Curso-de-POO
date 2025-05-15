from flask import Flask, request, jsonify
from cadastro_usuario import CadastroUsuario
from cadastro_cliente import CadastroCliente
from banco import Banco
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

sistema_usuario = CadastroUsuario()
sistema_cliente = CadastroCliente()
sistema_banco = Banco()


@app.route("/api/registrar", methods=["POST"])
def registrar():
    dados = request.json
    usuario = dados.get("usuario")
    senha = dados.get("senha")
    nome = dados.get("nome")
    cpf = dados.get("cpf")
    data_nascimento = dados.get("data_nascimento")
    endereco = dados.get("endereco")

    if sistema_usuario.registrar_usuario(usuario, senha):
        sistema_cliente.cadastrar_cliente(usuario, nome, cpf, data_nascimento, endereco)
        sistema_banco.criar_conta(usuario)
        return jsonify({"message": "Usuário registrado com sucesso!"}), 201
    else:
        return jsonify({"message": "Usuário já existe."}), 400


@app.route("/api/login", methods=["POST"])
def login():
    dados = request.json
    usuario = dados.get("usuario")
    senha = dados.get("senha")

    if sistema_usuario.validar_usuario(usuario, senha):
        return jsonify({"message": "Login bem-sucedido", "usuario": usuario})
    else:
        return jsonify({"message": "Usuário ou senha inválidos"}), 401


@app.route("/api/saldo/<usuario>", methods=["GET"])
def saldo(usuario):
    saldo = sistema_banco.consultar_saldo(usuario)
    if saldo is not None:
        return jsonify({"saldo": saldo})
    return jsonify({"message": "Usuário não encontrado"}), 404


@app.route("/api/depositar", methods=["POST"])
def depositar():
    dados = request.json
    usuario = dados.get("usuario")
    try:
        valor = float(dados.get("valor"))
    except (TypeError, ValueError):
        return jsonify({"message": "Valor inválido"}), 400

    if sistema_banco.depositar(usuario, valor):
        return jsonify({"message": f"Depósito de R${valor:.2f} realizado com sucesso."})
    return jsonify({"message": "Falha no depósito"}), 400


@app.route("/api/sacar", methods=["POST"])
def sacar():
    dados = request.json
    usuario = dados.get("usuario")
    try:
        valor = float(dados.get("valor"))
    except (TypeError, ValueError):
        return jsonify({"message": "Valor inválido"}), 400

    if sistema_banco.sacar(usuario, valor):
        return jsonify({"message": f"Saque de R${valor:.2f} realizado com sucesso."})
    return jsonify({"message": "Saldo insuficiente ou erro no saque"}), 400


@app.route("/api/cliente/<usuario>", methods=["GET"])
def cliente(usuario):
    dados_cliente = sistema_cliente.obter_dados_cliente(usuario)
    if dados_cliente:
        idade = sistema_cliente.calcular_idade(dados_cliente["data_nascimento"])
        retorno = {
            "nome": dados_cliente["nome"],
            "cpf": dados_cliente["cpf"],
            "idade": idade,
            "endereco": dados_cliente["endereco"]
        }
        return jsonify(retorno)
    return jsonify({"message": "Cliente não encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)
