export default function menuMobile() {
    const btn = document.getElementById("headerBtnMobile");
    const menu = btn.nextElementSibling;

    function openMenu() {
        if (!btn.hasAttribute("data-transition")) {
            btn.setAttribute("data-transition", "");
            btn.setAttribute("aria-expanded", true);
            btn.setAttribute("aria-label", "Fechar menu de navegação");
            btn.classList.add("show");
            menu.classList.add("display");
            setTimeout(() => menu.classList.add("show"), 20);
            setTimeout(() => {
                btn.removeAttribute("data-transition");
                clickOutside(menu, closeMenu);
            }, 300);
        }
    }
    function closeMenu() {
        if (!btn.hasAttribute("data-transition")) {
            btn.setAttribute("data-transition", "");
            btn.setAttribute("aria-expanded", false);
            btn.setAttribute("aria-label", "Abrir menu de navegação");
            btn.classList.remove("show");
            menu.classList.remove("show");
            setTimeout(() => {
                menu.classList.remove("display");
                btn.removeAttribute("data-transition");
            }, 300)
        }
    }
    function clickOutside(element, callback) {
        const attr = "data-clickOutside";

        if (!element.hasAttribute(attr)) {
            element.setAttribute(attr, "");
            document.addEventListener("click", handleClick);
        }

        function handleClick(e) {
           if (!element.contains(e.target)) {
                callback();
                element.removeAttribute(attr);
                document.removeEventListener("click", handleClick);
           }
        }
    }

    btn.addEventListener("click", () => {
        btn.ariaExpanded == "false" ? openMenu() : closeMenu();
    });
}
menuMobile();