import outsideClick from './outsideclick.js';

export default function initDropdownMenu() {

    const dropdownMenus = document.querySelectorAll('[data-dropdown]');

    dropdownMenus.forEach(menu => {
        ['touchstart', 'click'].forEach(userEvent => {
            menu.addEventListener(userEvent, handleClick);
        })
    }) // ou dropdownMenus.forEach(menu => { menu.addEventListener('touchstart', handleClick); menu.addEventListener('click', handleClick);})

    function handleClick(event) {
        event.preventDefault();
        this.classList.add('active');   // this === 2o menu
        outsideClick(this, ['touchstart', 'click'], () => {
            this.classList.remove('active');
        });
    };
}

