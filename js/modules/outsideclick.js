export default function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';

    if (!element.hasAttribute(outside)) {
        events.forEach(userEvent => {  // userEvent será o tipo de clique que vai passar qdo executar
            setTimeout(() => {
                html.addEventListener(userEvent, handleOutsideClick);
            }) // só depois que fizer tudo, a fase de bubble, vai adicionar esse evento ao html. É importante para não ativar automaticamente a qualquer clique de seleção do próprio menu (no caso do menu-mobile)
            element.setAttribute(outside, '');
        })
    }
    function handleOutsideClick(evento) {
        if (!element.contains(evento.target)) { // se o this lá em cima nao contiver o que foi      clicado, executa o callback (la em cima, remover classe)               
            element.removeAttribute(outside);
            events.forEach(userEvent => {
                html.removeEventListener(userEvent, handleOutsideClick);
            }); // pra nao sujar o codigo, remove o evento
            callback();
        }
    }
}

// importado para o dropdown-menu
// importado para o menu-mobile