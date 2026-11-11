class Agendamento {
    constructor(idAgendamento, idUsuario, nomeCompleto, departamento, diaAgendamento, horarioInicio, horarioTermino, laboratorio, atividade, status){
        this.idAgendamento = idAgendamento;
        this.idUsuario = idUsuario;
        this.nomeCompleto = nomeCompleto;
        this.departamento = departamento;
        this.diaAgendamento = diaAgendamento;
        this.horarioInicio = horarioInicio;
        this.horarioTermino = horarioTermino;
        this.laboratorio = laboratorio;
        this.atividade = atividade;
        this.status = status;
    }
}

module.exports = Agendamento;