export default function initAnimaNumeros() {

    function animaNumeros() {
        const numeros = document.querySelectorAll('[data-numero]');

        numeros.forEach((numero) => {
            const total = +numero.innerText;
            const incremento = Math.floor(total / 100);

            let start = 0;
            const timer = setInterval(() => {
                start += incremento;
                numero.innerText = start;
                if (start > total) {
                    numero.innerText = total;  // para garantir o numero certo (por causa do incremento)
                    clearInterval(timer);
                }
            }, 25 * Math.random());
        })
    }

    // para só acontecer quando estiver na section, cria um observador que fica olhando pra essa seção. Quando ela mudar de atributo (no caso, classe ativo), quer que um evento ocorra.
    // MutationObserver leva um callback, que é a função que será ativada toda vez que mudar

    function handleMutation(mutation) {  // mutation é especial: é uma array-like, que mostra o que mudou
        if (mutation[0].target.classList.contains('ativo')) {  //pega a mutation 0, a unica, a da classe
            observer.disconnect(); // tem que dar o disconnect pra ele parar de observar
            animaNumeros();  // só vai animar uma vez e parar
        }
    }

    animaNumeros();

    const observeTarget = document.querySelector('.numeros');
    const observer = new MutationObserver(handleMutation);

    observer.observe(observeTarget, { attributes: true }) // com observer.observe diz 1) qual item ele deve observar, qual é o target; 2) opções. a que queremos é que observe os atributos; passa um objeto.

}

