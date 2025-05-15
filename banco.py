class Banco:
    def __init__(self):
        self.__contas = {}

    def criar_conta(self, usuario):
        if usuario not in self.__contas:
            self.__contas[usuario] = 0.0

    def depositar(self, usuario, valor):
        if usuario in self.__contas and valor > 0:
            self.__contas[usuario] += valor
            return True
        return False

    def sacar(self, usuario, valor):
        if usuario in self.__contas and 0 < valor <= self.__contas[usuario]:
            self.__contas[usuario] -= valor
            return True
        return False

    def consultar_saldo(self, usuario):
        return self.__contas.get(usuario, None)

    def get_saldo(self, usuario):
        return self.__contas.get(usuario)

    def set_saldo(self, usuario, novo_saldo):
        if usuario in self.__contas and novo_saldo >= 0:
            self.__contas[usuario] = novo_saldo
            return True
        return False

    def get_contas(self):
        return self.__contas.copy()