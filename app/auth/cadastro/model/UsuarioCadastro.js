class UsuarioCadastro {

    constructor(idUsuario, nomeCompleto, email, senha, confirmarSenha, dataSolicitacao, departamento, status, admin){
        this.idUsuario = idUsuario;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha
        this.dataSolicitacao = dataSolicitacao;
        this.departamento = departamento;
        this.status = status;
        this.admin = admin;
    }

}

module.exports = UsuarioCadastro;