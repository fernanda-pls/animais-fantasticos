export default function initTooltip() {

    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach((item) => {
        item.addEventListener('mouseover', onMouseOver);
    })

    function onMouseOver(event) {
        const tooltipBox = criarTooltipBox(this); // this - item ao qual está adicionando um evento

        //para retirar o tooltip:
        onMouseLeave.tooltipBox = tooltipBox; // Obs1
        onMouseLeave.element = this;
        this.addEventListener('mouseleave', onMouseLeave); // Obs2

        //para mexer junto com o mouse:
        onMouseMove.tooltipBox = tooltipBox;
        this.addEventListener('mousemove', onMouseMove);

        // Obs1: o tooltipbox do objeto onMouseLeave corresponderá ao tooltipBox daqui da função
        // Obs2: conseguiu usar o objeto aqui no eventListener por causa do handleEvent que tem nele (o eventListener aceita tanto uma função quanto um objeto com uma função handleEvent() dentro dele). Fez isso para não ter que criar uma função aqui dentro da função e ficar mais limpo (uma função de remover o tooltipBox não teria acesso a ela do lado de fora, pois está definida aqui dentro)
    }

    const onMouseLeave = { // criou como objeto, com método handleEvent
        tooltipBox: '', // não precisaria estar aqui, poderia atribuir diretamente lá em cima
        element: '',
        handleEvent: function () {    // é uma função e tem que ter especificamente esse nome
            this.tooltipBox.remove();
            this.element.removeEventListener('mouseleave', onMouseLeave); // Obs
            this.element.removeEventListener('mousemove', onMouseMove); // Obs
        }
    } // Obs: qdo tirar o mouse, remove o evento tb, pra otimizar o código

    const onMouseMove = {
        handleEvent(event) {
            this.tooltipBox.style.top = event.pageY + 20 + 'px'; // o style acessa o CSSStyleDeclaration
            this.tooltipBox.style.left = event.pageX + 20 + 'px'; // Obs:
        }
    } //Obs: adiciona os 20px para que a caixa não fique imediatamente abaixo do cursor, pois parece para o js que não está mais em cima do item e vai ficar piscando

    function criarTooltipBox(elemento) {
        const tooltipBox = document.createElement('div');
        const text = elemento.getAttribute('aria-label'); // (pega o texto aria-label do elemento sobre o qual passar o mouse)
        tooltipBox.classList.add('tooltip');
        tooltipBox.innerText = text;
        document.body.appendChild(tooltipBox);
        return tooltipBox;
    }
}
