import recoilShorten from "./recoil-shorten.js";

export default function handleShortening() {
    const input = document.getElementById("url");

    function message(config) {
        const element = document.getElementById("shortenMsg");
        const child = element.firstElementChild;

        function handleError() {
            if (config.error === true) {
                element.classList.add("error");
                input.classList.add("error");
                input.focus();
            } else {
                element.classList.remove("error");
                input.classList.remove("error");
            }
        }

        if (config.show === true) {
            if (!element.classList.contains("display")) {
                child.innerHTML = config.message;
                element.classList.add("display");
                setTimeout(() => {
                    element.classList.add("show");
                    handleError();
                }, 20);

            } else {
                element.classList.remove("show");
                setTimeout(() => {
                    element.classList.add("show");
                    child.innerHTML = config.message;
                    handleError();
                }, 300);
            }
        } else {
            element.classList.remove("show");
            setTimeout(() => element.classList.remove("display"), 300);
            handleError();
        }
        recoilShorten();
    }

    function shorten() {
        const btnShorten = document.getElementById("btnShorten");
        const btnClean = document.getElementById("btnClean");
        const containerResult = document.getElementById("shortenResult");

        function success(body) {
            const item = containerResult.firstElementChild.cloneNode(true);
            const entry = item.querySelector(".entry");
            const shortened = item.querySelector(".entry-shorten");
            const entryURL = body.result.original_link;
            const shortenedURL = body.result.full_short_link;

            containerResult.classList.add("display");
            item.classList.add("display");
            entry.setAttribute("title", entryURL);
            entry.innerText = entryURL;
            shortened.innerText = shortenedURL;
            shortened.href = shortenedURL;
            containerResult.appendChild(item);
            setTimeout(() => {
                containerResult.classList.add("show");
                item.classList.add("show");
            }, 20);

            function handleCopy() {
                const btnCopy = item.querySelector(".copy");
        
                function copy(e) {
                    const btns = containerResult.querySelectorAll(".copy");
                    const btn = e.target;
                    const entryShorten = btn.previousElementSibling;
        
                    btns.forEach(element => {
                        element.classList.remove("copied");
                        element.innerText = "Copiar";
                    });
                    btn.classList.add("copied");
                    btn.innerText = "Copiado!";
                    navigator.clipboard.writeText(entryShorten.innerText);
                }
                btnCopy.addEventListener("click", copy);
            }
            handleCopy();

            function showBtnClean() {
                btnClean.classList.add("display");
                setTimeout(() => btnClean.classList.add("show"), 20);
            }
            showBtnClean();
        }
        function error(errorCode) {
            function showError(msg) {
                message({
                    show: true,
                    error: true,
                    message: msg
                })
            }
            
            switch(errorCode) {
                case 2:
                    showError("Este link é inválido. Por favor, digite uma URL corretamente.");
                    break;

                case 3:
                    showError("Limite atingido. Por favor, aguarde um segundo para tentar novamente.");
                    break;

                case 4:
                    const anchor4 = `
                    <a href="https://shrtco.de/tos"
                    target="_blank"
                    rel="external noopener noreferrer">termos de serviço</a>`

                    showError(`O endereço IP foi bloqueado por violar os ${anchor4} da API que utilizamos.`);
                    break;

                case 10:
                    const anchor10 = `
                    <a href="https://shrtco.de/disallowed"
                    target="_blank"
                    rel="external noopener noreferrer">links não permitidos</a>`

                    showError(`Este link não pode ser encurtado pela API que utilizamos. Saiba mais sobre ${anchor10}.`);
                    break;

                default:
                    showError("Desculpe, um erro desconhecido ocorreu! Por favor, tente novamente.");
            }
        }
        async function requestAPI() {
            try {
                message({
                    show: true,
                    message: "Encurtando seu link..."
                });
                const URL = input.value;
                const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${URL}`);
                const body = await response.json();

                if (body.ok === true) {
                    success(body);

                    function allLinks() {
                        const itens = Array.from(containerResult.querySelectorAll(".item"));
                        const links = [];

                        itens.map((link, index) => {
                            if (index >= 1) {
                                links.push({
                                    id: index,
                                    original: link.querySelector(".entry").innerText,
                                    shortened: link.querySelector(".entry-shorten").innerText,
                                });
                                return links;
                            }
                        });
                        return JSON.stringify(links);
                    }
                    localStorage["links"] = allLinks();

                    message({
                        show: true,
                        message: "Link encurtado com sucesso!"
                    });

                } else {
                    error(body.error_code);
                }
        
            } catch {
                message({
                    show: true,
                    error: true,
                    message: "Desculpe, não conseguimos encurtar sua URL. Por favor, tente novamente."
                });
            }
        }
        function handleStoredLink() {
            if (localStorage["links"]) {
                const links = JSON.parse(localStorage["links"]);

                links.forEach((link) => {
                    success({
                        result: {
                            original_link: link.original,
                            full_short_link: link.shortened
                        }
                    })
                })
            }
        }
        handleStoredLink();

        function handleUserInput() {
            if (input.value == "") {
                message({
                    show: true,
                    error: true,
                    message: "Por favor, adicione um link para encurtar."
                })
            } else {
                const entries = Array.from(containerResult.querySelectorAll(".entry"))
                const shortenedLinks = entries.map(entry => entry.innerText);

                if (shortenedLinks.includes(input.value)) {
                    message({
                        show: true,
                        error: true,
                        message: "Este link já foi encurtado. Por favor, adicione uma URL diferente para encurtar."
                    })
                } else {
                    requestAPI();
                }
            }
        }
        btnShorten.addEventListener("click", handleUserInput);

        function handleBtnClean() {
            const itens = containerResult.querySelectorAll(".item");

            message({show: false});
            localStorage.removeItem("links");
            btnClean.classList.remove("show");
            containerResult.classList.remove("show");
            setTimeout(() => {
                btnClean.classList.remove("display");
                containerResult.classList.remove("display");
            }, 300);

            itens.forEach((item, index) => {
                if (index >= 1) {
                    item.classList.remove("show");
                    setTimeout(() => {
                        item.classList.remove("display");
                        item.remove();
                    }, 300);
                }
            });
        }
        btnClean.addEventListener("click", handleBtnClean);
    }
    shorten();

}
handleShortening();