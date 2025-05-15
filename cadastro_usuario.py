class CadastroUsuario:
    def __init__(self):
        self.__usuarios = {}

    def registrar_usuario(self, usuario, senha):
        if usuario in self.__usuarios:
            return False
        self.__usuarios[usuario] = senha
        return True

    def validar_usuario(self, usuario, senha):
        return self.__usuarios.get(usuario) == senha

    def get_senha(self, usuario):
        return self.__usuarios.get(usuario)

    def set_senha(self, usuario, nova_senha):
        if usuario in self.__usuarios:
            self.__usuarios[usuario] = nova_senha
            return True
        return False

    def get_usuarios(self):
        return self.__usuarios.copy()