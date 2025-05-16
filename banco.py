from datetime import datetime

class Banco:
    def __init__(self):
        self.contas = {}  
        self.movimentacoes = {} 

    def criar_conta(self, usuario):
        if usuario not in self.contas:
            self.contas[usuario] = 0.0
            self.movimentacoes[usuario] = []
            return True
        return False

    def consultar_saldo(self, usuario):
        return self.contas.get(usuario)

    def depositar(self, usuario, valor):
        if usuario in self.contas and valor > 0:
            self.contas[usuario] += valor
            self.movimentacoes[usuario].append({
                "tipo": "depósito",
                "valor": valor,
                "descricao": "Depósito realizado",
                "data": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            return True
        return False

    def sacar(self, usuario, valor):
        if usuario in self.contas and 0 < valor <= self.contas[usuario]:
            self.contas[usuario] -= valor
            self.movimentacoes[usuario].append({
                "tipo": "saque",
                "valor": valor,
                "descricao": "Saque realizado",
                "data": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
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

            agora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            self.movimentacoes[usuario_origem].append({
                "tipo": "transferência saída",
                "valor": valor,
                "descricao": f"Transferência para {usuario_destino}",
                "data": agora
            })

            self.movimentacoes[usuario_destino].append({
                "tipo": "transferência entrada",
                "valor": valor,
                "descricao": f"Transferência de {usuario_origem}",
                "data": agora
            })

            return True
        return False

    def obter_extrato(self, usuario):
        return self.movimentacoes.get(usuario, [])
