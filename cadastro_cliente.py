from datetime import datetime

class CadastroCliente:
    def __init__(self):
        self.__clientes = {}

    def cadastrar_cliente(self, usuario, nome, cpf, data_nascimento, endereco):
        if usuario in self.__clientes:
            return False
        
        self.__clientes[usuario] = {
            "nome": nome,
            "cpf": cpf,
            "data_nascimento": data_nascimento,
            "endereco": endereco
        }
        return True

    def obter_dados_cliente(self, usuario):
        return self.__clientes.get(usuario)

    def calcular_idade(self, data_nascimento):
        hoje = datetime.today()
        nascimento = datetime.strptime(data_nascimento, "%d/%m/%Y")
        idade = hoje.year - nascimento.year
        if hoje.month < nascimento.month or (hoje.month == nascimento.month and hoje.day < nascimento.day):
            idade -= 1
        return idade


    def set_nome(self, usuario, novo_nome):
        if usuario in self.__clientes:
            self.__clientes[usuario]["nome"] = novo_nome
            return True
        return False

    def set_cpf(self, usuario, novo_cpf):
        if usuario in self.__clientes:
            self.__clientes[usuario]["cpf"] = novo_cpf
            return True
        return False

    def get_clientes(self):
        return self.__clientes.copy()
