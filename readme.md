# Desafio do Frontend Mentor | Encurtador de URL

Desafio do Frontend Mentor com ênfase em JavaScript, consistia em consumir a shrtcode API que permite encurtar URLs. Excelente desafio para lidar com promises através da Fetch API, ao qual optei pelo uso de funções assíncronas ao fazer a requisição e captar os dados em JSON retornados pela mesma.

Outro desafio considerado nível intermediário pela plataforma, é também super interessante para praticar CSS, já que o mesmo desafio simula uma landing page.

![Captura de tela do projeto](https://user-images.githubusercontent.com/72027449/178758576-4eaa105e-ccb0-405e-beef-f2297c040125.png)

## 📋 Índice

* [Visão geral](#-visão-geral)
    * [Status](#-status)
    * [O desafio](#-o-desafio)
    * [Links](#-acesse-o-projeto)
* [Desenvolvimento](#%EF%B8%8F-desenvolvimento)
    * [Tecnologias utilizadas](#-tecnologias-utilizadas)
    * [Aprendizados e melhorias](#-aprendizados-e-melhorias)
        * [Mensagens ao usuário](#mensagens-ao-usuário)
        * [Mensagens de erro](#mensagens-de-erro)
        * [Limpar lista de links](#limpar-lista-de-links)

## 🔎 Visão geral

### ✅ Status

Finalizado.

### 🏁 O desafio

Para a resolução deste desafio, os usuários devem ser capazes de:

* Visualizar exatamente o layout proposto de acordo com o tamanho da janela de exibição (responsividade)
* Encurtar qualquer URL válido
* Visualizar uma lista dos links já encurtados, mesmo depois de atualizar a página no navegador
* Copiar um link encurtado para a área de transferência através de um evento de clique
* Receber uma mensagem de erro caso o campo para encurtar a URL esteja vazio

### 🔗 Acesse o projeto

* [Link do projeto](https://leo-henrique.github.io/encurtador-de-url/)
* [Desafio no Frontend mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G)

## ⚙️ Desenvolvimento

### 💻 Tecnologias utilizadas

* HTML
* CSS / SASS
* Vanilla JavaScript

### 💡 Aprendizados e melhorias

#### Mensagens ao usuário

Criei uma função que permite passar alguns argumentos para exibir uma mensagem personalizada ao usuário em determinadas ocasiões.

Como uma função assíncrona (`async function`) pode esperar uma **promise** indicada por `await` ser resolvida para que só então o resto das próximas linhas de código serem executadas, executo a função citada anteriormente que exibe uma mensagem como *"Encurtando sua URL..."* antes das expressões com `await` e executo-a novamente com outra mensagem como *"Link encurtado com sucesso"* somente após as declarações com `await`.

Dessa forma, caso o servidor da API esteja lento ou com problemas técnicos, o usuário ao menos sabe que o seu pedido foi atendido, e a primeira mensagem *"Encurtando sua URL..."* ficará sendo exibida até a solicitação com a API for bem sucedida. Um detalhe relativamente simples, mas importante para deixar o usuário informado e menos frustrado.

https://user-images.githubusercontent.com/72027449/178766826-2a5e414a-7b2a-444a-915f-3517d2d2973e.mp4

#### Mensagens de erro

A princípio, o desafio requer que você exiba uma mensagem de erro apenas caso o usuário deixe o campo vazio. Porém também verifico se a entrada do usuário é igual a algum link que já foi encurtado, impedindo que haja repetições.

https://user-images.githubusercontent.com/72027449/178770951-5a96cdd0-45fb-4d92-b168-61adbff813a3.mp4

A API também retorna com chaves / propriedades diferentes no arquivo JSON dependendo de algumas condições, contendo códigos de erros e uma mensagem referente a cada erro. Dessa forma, mesmo que a solicitação com a API seja bem sucedida, fico verificando se a API está retornando essas chaves diferentes, para exibir mensagens personalizadas de acordo com o erro para o usuário.

Assim, uma mensagem de erro genérica se encontra no bloco de código dentro de `catch` na função assíncrona caso não haja sucesso ao solicitar a API. No entanto, mesmo caso as promises sejam resolvidas e `catch` seja descartado, mensagens de erros mais específicas serão exibidas caso necessário para o usuário.

```js
async function requestAPI() {
    try {
        // função que exibe a mensagem ao usuário
        // mensagem exibida antes de solicitar a API
        message({
            show: true,
            message: "Encurtando seu link..."
        });
        const URL = input.value;
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${URL}`);
        const body = await response.json();

        // condição que verifica se a API detectou erro
        // a propriedade "ok" retorna o booleano true caso não há erros e false caso haja
        if (body.ok === true) {
            // função que exibe a lista de links encurtados
            success(body);

            // mensagem exibida ao usuário informando sucesso
            message({
                show: true,
                message: "Link encurtado com sucesso!"
            });

        } else {
            // função que exibe mensagens de erro ao usuário de acordo com o código de erro retornado na propriedade "error_code" da API
            error(body.error_code);
        }

    } catch {
        // mensagem de erro genérica
        message({
            show: true,
            error: true,
            message: "Desculpe, não conseguimos encurtar sua URL. Por favor, tente novamente."
        });
    }
}
```

Pude exibir a mensagem de erro mostrada a seguir com base em uns dos códigos de erros retornando pela API. 

https://user-images.githubusercontent.com/72027449/178774173-6f5cc404-a9a0-4f22-9e15-2956bab5b5c3.mp4


#### Limpar lista de links

Uma funcionalidade também não requerida pelo desafio, é de um botão que possa limpar a lista de links encurtados.

Como os links são salvos no localStorage, sem um botão que possa limpa-los eles ficarão ali até que o usuário apague manualmente pelo seu navegador. Mesmo que links repetidos não podem ser incluídos na lista, o layout pode ficar um pouco sujo com uma lista muito grande de URLs encurtadas.

https://user-images.githubusercontent.com/72027449/178775798-b7f4a3cd-363c-4863-8f2e-572c483d0226.mp4