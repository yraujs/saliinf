const daoSolicitarAgendamento = require('../db/daoSolicitarAgendamento');

async function controllerSolicitarAgendamento(solicitacao) {
    let camposVazios = 0;

    for(atributo in solicitacao){
        if(!solicitacao[atributo]){
            camposVazios++;
        }

        if(camposVazios > 0){
            console.log('os campos não foram preenchidos corretamente!');
            return;
        }
    }

    const dataEscolhida = new Date(solicitacao.diaAgendamento + "T00:00:00");
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if(dataEscolhida < dataAtual){
        console.log('a data escolhida é menor que a data atual!');
        return;
    }

    if(horarioInicialMaiorQueOFinal(solicitacao.horarioInicio, solicitacao.horarioTermino)){
        return;
    }

    try{
        const resposta = await daoSolicitarAgendamento(solicitacao);
    
        return {
            success: resposta,
            status: 201,
        }
    }catch(erro){
        console.log(erro);
    }

}

function horarioInicialMaiorQueOFinal(horarioInicial, horarioFinal){
    const horasInicio = horarioInicial.slice(0, 2);
    const horasTermino = horarioFinal.slice(0, 2);

    console.log('horario inicial:', horasInicio);
    console.log('horario final:', horasTermino);

    if(parseInt(horasTermino) <= parseInt(horasInicio)){
        console.log('erro ao inserir os horários!');
        return true;
    }

    return false;
}

module.exports = controllerSolicitarAgendamento;