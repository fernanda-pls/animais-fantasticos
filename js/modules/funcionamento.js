export default function initFuncionamento() {

    const funcionamento = document.querySelector('[data-semana]');
    const diasSemana = funcionamento.dataset.semana.split(',').map(Number); // split pra trazer array; mas ainda assim traz uma array com várias strings dentro. Pra isso, usa o map. COm Number entre parenteses, retorna números.
    const horarioSemana = funcionamento.dataset.horario.split(',').map(Number);

    console.log(diasSemana); // traz (5) [1, 2, 3, 4, 5)

    const dataAgora = new Date();
    const diaAgora = dataAgora.getDay();
    const horarioAgora = dataAgora.getHours();

    const semanaAberto = diasSemana.indexOf(diaAgora) !== -1; // quando não acha o número do diaAgora pelo indexOf, retorna -1. Retornará true se for diferente de -1

    const horarioAberto = (horarioAgora >= horarioSemana[0] && horarioAgora < horarioSemana[1])

    if (semanaAberto && horarioAberto) {
        funcionamento.classList.add('aberto');
    }

}

