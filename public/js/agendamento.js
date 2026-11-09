//Colocando os horários de início
for(let i = 13; i <= 19; i++){
    const optionHorarioInicio = document.createElement('option');
    const selecthorarioInicio = document.getElementById('horario-inicio');
    const optionHorarioTermino = document.createElement('option');
    const selecthorarioTermino = document.getElementById('horario-termino');
        optionHorarioInicio.value = `inicio-${i}:00h`;
        optionHorarioInicio.text = `${i}:00`;
        selecthorarioInicio.appendChild(optionHorarioInicio);

        optionHorarioTermino.value = `termino-${i}:00h`;
        optionHorarioTermino.text = `${i}:00`;
        selecthorarioTermino.appendChild(optionHorarioTermino);
}

let labs = ['I', 'II', 'III', 'IV', 'V'];

for(let i = 0; i < 5; i++){
    const selectLaboratorios = document.getElementById('laboratorio');
    const novoOption = document.createElement('option');

    novoOption.value = `lab-${labs[i]}`;
    novoOption.text = `Laboratório ${labs[i]}`;
    selectLaboratorios.appendChild(novoOption);
}

const botaoEnviarSolicitacao = document.getElementById('enviar-solicitacao');
botaoEnviarSolicitacao.addEventListener('click', async() => {
    const diaAgendamento = document.getElementById('dia').value;
    const horarioInicio = document.getElementById('horario-inicio').value;
    const horarioTermino = document.getElementById('horario-termino').value;
    const laboratorio = document.getElementById('laboratorio').value;
    const atividade = document.getElementById('atividade').value;

    const solicitacao = {
        diaAgendamento: diaAgendamento,
        horarioInicio: horarioInicio,
        horarioTermino: horarioTermino,
        laboratorio: laboratorio,
        atividade: atividade        
    }

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


    console.log('dia do agendamento:', diaAgendamento);
    console.log('horário de início:', horarioInicio);
    console.log('horario de término:', horarioTermino);
    console.log('laboratório:', laboratorio);
    console.log('ativdade:', atividade);
});