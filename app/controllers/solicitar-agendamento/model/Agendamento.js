class Agendamento {
    constructor(idAgendamento, diaAgendamento, horarioInicio, horarioTermino, laboratorio, atividade, status){
        this.idAgendamento = idAgendamento;
        this.diaAgendamento = diaAgendamento;
        this.horarioInicio = horarioInicio;
        this.horarioTermino = horarioTermino;
        this.laboratorio = laboratorio;
        this.atividade = atividade;
        this.status = status;
    }
}

module.exports = Agendamento;