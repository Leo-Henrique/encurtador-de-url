export default function buttonsWarning() {
    const elements = document.querySelectorAll("[data-warning]");

    function setMessage(element) {
        function message(type) {
            window.alert(`Este ${type} é apenas demonstrativo!`);
        }
        element.dataset.warning === "link" ? message("link") : message("botão");
    }

    elements.forEach(element => {
        element.addEventListener("click", () => {
            setMessage(element);
        });
    });
}
buttonsWarning();