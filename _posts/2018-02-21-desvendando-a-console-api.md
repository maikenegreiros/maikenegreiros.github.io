---
layout: post
title: Desvendando a Console API
description: Conheça métodos da API que podem melhorar seu debbuging.
keywords: javascript, console, console api, console javascript
image: /images/2018-02-21-desvendando-a-console-api.jpg
alt: 
url: "https://maikenegreiros.me/artigos/desvendando-a-console-api/"
updateDate: "21/02/2018"
---

Hoje o assunto é sobre uma ferramenta que todo desenvolvedor JavaScript conhece. Quem nunca usou um *console.log* no meio do código pra saber porque alguma função não funcionava conforme esperado?
Esses dias eu resolvi ir mais à fundo nessa API, já que a uso diariamente, e descobri umas coisas bem legais para mostrar pra vocês.

## Console.log
Esse método, eu creio que seja conhecido por todos. O método *log* exibe uma mensagem no console do navegador. Você pode passar simplesmente uma string, ou um objeto como o abaixo:

```js
let artigo = {
    "id": 4,
    "titulo": "Desvendando a Console API",
    "descricao": "Conheça métodos da API que podem melhorar seu debbuging",
    "url": "https://maikenegreiros.me/artigos/desvendando-a-console-api/"
}
```

se executarmos a seguinte linha de código, teremos o resultado abaixo no console do chrome.

```js
console.log(artigo)
```

<figure>
    <img data-large-image="2018-02-21-console-api-01.jpg" src="/images/2018-02-21-console-api-01.jpg" alt="Imagem do console do navegador">
</figure>

## Console.table
Ah, esse aqui foi um das que mais me surpreendeu. O método *table* aceita um objeto ou array e mostra os dados de forma tabular. Vamos levar em consideração o objeto utilizado anteriormente para ilustrar aqui:

com o método table temos o seguinte:

```js
console.table(artigo)
```

<figure>
    <img data-large-image="2018-02-21-console-api-02.jpg" src="/images/2018-02-21-console-api-02.jpg" alt="Imagem do console do navegador">
</figure>

Veja como ficou muito mais fácil a leitura do objeto. Ela é bastante útil quando se está trabalhando com uma API e a mesma lhe fornece um JSON gigantesco. Fica muito mais fácil de visualizar o objeto.


## Console.count
Esse método loga no console o número de vezes que foi chamado. Ele tem um parâmetro opcional que dá um nome ao contador. Caso seu código possua mais de um contador, é interessante passar esse parâmetro. Veja o código abaixo:

```js
let somaDoisNumeros = (a, b) => {
    console.count("Função Soma")
    return a + b
}

somaDoisNumeros(5, 4)
somaDoisNumeros(2, 2)
somaDoisNumeros(10, 86)
```

<figure>
    <img data-large-image="2018-02-21-console-api-03.jpg" src="/images/2018-02-21-console-api-03.jpg" alt="Imagem do console do navegador">
</figure>

## Console.group
Esse eu tenho usado bastante. É interessante usar quando você precisa logar muita mensagem no console do Browser, sem esse método, os logs ficariam todos espalhados e o desenvolvedor sem saber de onde vieram. Ele é utilizado em conjunto com o método groupEnd, todos os métodos da API Console que forem chamado entre esses dois métodos serão agrupados em um só bloco:

```js
let somaDoisNumeros = (a, b) => {
    console.group("Função Soma")
    console.log(a)
    console.log(b)
    console.groupEnd()
    return a + b
}

somaDoisNumeros(5, 4)
```

<figure>
    <img data-large-image="2018-02-21-console-api-04.jpg" src="/images/2018-02-21-console-api-04.jpg" alt="Imagem do console do navegador">
</figure>

## Console.time

Inicia um cronômetro. É bastante útil quando se deseja saber qual o tempo que uma função leva para ser executada.
O método time aceita um parâmetro opcional, uma string que rotulará o cronômetro.
Abaixo, vemos quanto tempo a função contarAteMil leva para ser executada:

```js
let contarAteMil = () => {
    console.time("contarAteMil")
    for (let i=0; i <= 1000; i++) {
        //qualquer coisa aqui
    }
    console.timeEnd("contarAteMil")
}

contarAteMil()
```

<figure>
    <img data-large-image="2018-02-21-console-api-05.jpg" src="/images/2018-02-21-console-api-05.jpg" alt="Imagem do console do navegador">
</figure>

## Console.trace

Gera um rastreamento de pilha do ponto onde o método foi chamado. Esse método pode ser útil quando se quer entender o fluxo de execução de um código grande. Veja o código abaixo como exemplo:

```js
let getDados = () => {
    //Aqui poderia existir uma requisição Ajax que retornasse algo,
    //em vez disso, apenas declarei a variavel abaixo e atribuí um valor a ela
    let dados = {nome:"Luiz", idade:42}
    console.trace(dados)
}

let updateView = () => {
    getDados()
    //Um código qualquer que atualiza a view com base
    //nos dados obtidos na chamada de getDados
}

let main = () => {
    updateView()
}

main()
```

<figure>
    <img data-large-image="2018-02-21-console-api-06.jpg" src="/images/2018-02-21-console-api-06.jpg" alt="Imagem do console do navegador">
</figure>


## Testes unitários com a API Console
Aqui falaremos do método *console.assert*. É claro que esse método não descartará o uso de um <a target="_blank" href="https://mochajs.org/">Mocha</a> ou <a target="_blank" href="http://qunitjs.com/">Qunit</a>, mas já é alguma coisa.
Esse método aceita dois parâmetro, o primeiro é a afirmação(assert) a ser avaliada, no segundo parâmetro podemos passar a mensagem que será apresentada caso a afirmação não seja verdadeira.

```js
let somaDoisNumeros = (a, b) => {
    return a - b
}

console.assert(somaDoisNumeros(5, 5) === 10, "A função contém erros")
```

<figure>
    <img data-large-image="2018-02-21-console-api-07.jpg" src="/images/2018-02-21-console-api-07.jpg" alt="Imagem do console do navegador">
</figure>

Na linha 2, eu errei o sinal da operação propositalmente, em vez de um “+”, coloquei um “-”. Sendo assim o resultado da função chamada na linha 5 jamais será 10, portanto no console receberemos a mensagem fornecida no segundo parâmetro: "A função contém erros".
Experimente corrigir o sinal da operação e veja que o console não exibirá a mensagem de erro.


## console.clear
Como o nome sugere, ele limpa o console, porém, considero muito mais prático digitar um ctrl + l.


## Formatação de texto no console
Desde que abri o console do navegador no facebook, fiquei curioso pra saber como eles conseguiam formatar o texto daquela forma, até o momento eu nem sabia que era possível fazer isso. Pois bem, veja como é possível no exemplo abaixo:

```js
console.log("%cUma mensagem estilizada", "color: red; font-size: 60px");
```

com o especificador de formato "%c" podemos inserir código css na nossa string. Veja o resultado:

<figure>
    <img data-large-image="2018-02-21-console-api-08.jpg" src="/images/2018-02-21-console-api-08.jpg" alt="Imagem do console do navegador">
</figure>

A Console API possui outros métodos, mas escolhi apenas esses para que o artigo não ficasse grande demais, espero que tenham gostado.
