class Banco:
    def __init__(self):
        self.contas = {}

    def criar_conta(self, usuario):
        if usuario not in self.contas:
            self.contas[usuario] = 0.0
            return True
        return False

    def consultar_saldo(self, usuario):
        return self.contas.get(usuario)

    def depositar(self, usuario, valor):
        if usuario in self.contas and valor > 0:
            self.contas[usuario] += valor
            return True
        return False

    def sacar(self, usuario, valor):
        if usuario in self.contas and 0 < valor <= self.contas[usuario]:
            self.contas[usuario] -= valor
            return True
        return False

    def transferir(self, usuario_origem, usuario_destino, valor):
        if (
            usuario_origem in self.contas
            and usuario_destino in self.contas
            and 0 < valor <= self.contas[usuario_origem]
        ):
            self.contas[usuario_origem] -= valor
            self.contas[usuario_destino] += valor
            return True
        return False
