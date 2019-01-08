---
layout: post
title: Coisas de JavaScript que eu nunca tinha ouvido falar
description: Nesse artigo você verá coisas que existem no JavaScript, mas que nem todo mundo conhece.
keywords: javascript, html5, ecmascript, es6, es2015, indexeddb, banco de dados
image: /images/coisas-de-javascript-que-eu-nunca-tinha-ouvido-falar.png
alt: 
url: https://maikenegreiros.me/2018/01/31/coisas-de-javascript-que-eu-nunca-tinha-ouvido-falar.html
updateDate: "13/01/2018"
---

O post de hoje é uma tradução de um artigo que vi uns dias atrás, de autoria do <a href="https://twitter.com/SkylloDev" target="_blank">Nick</a>, e achei muito legal, por isso achei que seria interessante compartilhá-lo com vocês aqui no blog. Pra quem deita e rola no inglês, pode conferir o artigo original <a href="http://air.ghost.io/js-things-i-never-knew-existed/amp/?__twitter_impression=true" target="_blank">aqui</a>.
Para quem não tem uma boa afinidade com a língua, segue o artigo traduzido logo abaixo:

Estava lendo o MDN docs outro dia e descobri essas features e APIs JavaScript que eu nunca tinha ouvido falar. Então aqui está uma pequena lista dessas coisas, útil ou não – aprender JS parece uma coisa que nunca tem fim.

## Label Statements

Você pode rotular blocos e loops *for* em javascript. Quem sabia? (Eu não!) Você pode pegar a referência à esses rótulos e usar *break* e *continue* nos loops *for*, e *break* em blocos.

```js
loop1: // rotulando "loop1"
for (let i = 0; i < 3; i++) { // "loop1"
    loop2: // rotulando "loop2"
    for (let j = 0; j < 3; j++) { // "loop2"
        if (i === 1) {
            continue loop1; // continue no "loop1"
            // break loop1; // sai do "loop1"
        }
        console.log(`i = ${i}, j = ${j}`);
    }
}

/* 
* # Output
* i = 0, j = 0
* i = 0, j = 1
* i = 0, j = 2
* i = 2, j = 0
* i = 2, j = 1
* i = 2, j = 2
*/
```

Aqui vai um exemplo nomeando  um bloco, você pode usar apenas break em blocos.

```js
foo: {
    console.log('um');
    break foo;
    console.log('esse log não será executado');
}
console.log('dois');

/*
* # Output
* um
* dois
*/
```


## Operador “void”

Eu pensei que sabia todos os operadores, até que eu vi um que está presente no Javascript desde 1996. Ele é suportado por todos os navegadores e é bem fácil de entender. Veja um trecho retirado do MDN:

*O operador void avalia a expressão e depois retorna undefined.*

Isso nos permite escrever um <a href="https://developer.mozilla.org/pt-BR/docs/Glossario/IIFE" target="_blank">IIFE</a> alternativo como esse:

```js
void function iife() {
    console.log('hello');
}();

// é o mesmo que ...

(function iife() {
    console.log('hello');
})();
```


Uma coisa ruim com *void* é o fato de o retorno da função ser undefined.

```js
const word = void function iife() {
    return 'hello';
}();

// word é "undefined"

const word = (function iife() {
    return 'hello';
})();

// word é "hello"
```

Você também pode usar *void* com *async*, utilizando como um ponto de entrada assíncrono para o seu código:

```js
void async function() { 
    try {
        const response = await fetch('air.ghost.io'); 
        const text = await response.text();
        console.log(text);
    } catch(e) {
        console.error(e);
    }
}();

// ou faça apenas assim :)

(async () => {
    try {
        const response = await fetch('air.ghost.io'); 
        const text = await response.text();
        console.log(text);
    } catch(e) {
        console.error(e);
    }
})();
```

## Operador de vírgula

Depois de ler sobre o operador de vírgula, eu percebi que eu não estava totalmente ciente de como o mesmo funcionava. Veja um ótimo trecho retirado do MDN:

*O operador de vírgula avalia cada um de seus operandos(da esqueda para a direita) e retorna o valor de seu último operando.*

```js
function myFunc() {
    let x = 0;
    return (x += 1, x); // mesmo que return ++x;
}

y = false, true; // retorna true no console
console.log(y); // false (mais à esquerda)

z = (false, true); // retorna true no console
console.log(z); // true (mais à direita)
```

### Usando operador condicional

O último valor no operador de vírgula será o valor retornado para a condicional. Então você pode colocar  qualquer número de expressões antes. No exemplo abaixo eu coloco um console log antes de retornar um booleano.

```js
const type = 'man';

const isMale = type === 'man' ? (
    console.log('Hi Man!'),
    true
) : (
    console.log('Hi Lady!'),
    false
);

console.log(`isMale is "${isMale}"`);
```

## API de Internacionalização

A Internacionalização era uma coisa difícil de se trabalhar há pouco tempo atrás, felizmente existe uma API com bom suporte atualmente na maioria dos navegadores. Uma das minhas features favoritas é o formatador de datas. Veja o exemplo abaixo.

```js
const date = new Date();

const options = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
};

const formatter1 = new Intl.DateTimeFormat('es-es', options);
console.log(formatter1.format(date)); // 22 de diciembre de 2017

const formatter2 = new Intl.DateTimeFormat('en-us', options);
console.log(formatter2.format(date)); // December 22, 2017
```

## Pipeline operator

No momento em que eu estava escrevendo este artigo, o operador pipeline só tinha suporte no Firefox 58+ com uma flag, entretanto, o Babel tem um <a href="https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator" target="_blank">plugin</a> para lidar com essa situação. Eu gosto bastante desse.

```js
const square = (n) => n * n;
const increment = (n) => n + 1;

// sem pipeline operator
square(increment(square(2))); // 25

// com pipeline operator
2 |> square |> increment |> square; // 25
```


## Menções importantes

### Atômicos

Operações atômicas nos permite leitura e escrita previsíveis de valores quando os dados são compartilhados entre múltiplas threads, esperando que outras operações encerrem antes que a próxima seja executada. Operações atômicas são bastante úteis para manter dados síncronos entre coisas como a thread principal e outro WebWorker.
Eu gosto bastante disso em outras linguagens, como Java. Eu sinto que elas serão mais usadas em JS quando a maioria dos programadores começarem a usar WebWorkers para tirar operações da thread principal.

### Array.prototype.reduceRight

Ok, eu nunca tinha usado este porque é basicamente *Array.prototype.reduce()* + *Array.prototype.reverse()* e é bem difícil que você precise dessa combinação. Mas, se você precisar, *ReduceRight* é perfeito para você!

```js
const achatado = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);

// o array achatado é [4, 5, 2, 3, 0, 1]
```

### Parâmetros do setTimeOut()

Eu provavelmente teria me poupado de um *.bind(…)* ou dois por saber disso - agora tem sido assim.

```js
setTimeout(alert, 1000, 'Hello world!');

/*
* # Output (alert)
* Hello World!
*/

function log(text, textTwo) {
    console.log(text, textTwo);
}

setTimeout(log, 1000, 'Hello World!', 'And Mars!');

/*
* # Output
* Hello World! And Mars!
*/
```

### HTMLElement.dataset

Eu sempre usei *data attributes* personalizados (*data -**) nos elementos HTML, mas, infelizmente, eu não estava ciente que havia uma API para consultá-los facilmente, até agora. Além de algumas restrições de nomenclarura (ver este <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset" target="_blank">link</a>) a api é basicamente *dash-case* para atributos e *camelCase* quando forem consultados no JS. Então o atributo *data-birth-planet* seria *birthPlanet* em JavaScript.

```html
<div id='person' data-name='john' data-birth-planet='earth'></div>
```

Query:

```js
let personEl = document.querySelector('#person');

console.log(personEl.dataset) // DOMStringMap {name: "john", birthPlanet: "earth"}
console.log(personEl.dataset.name) // john
console.log(personEl.dataset.birthPlanet) // earth

// Você pode adicionar mais se quiser
personEl.dataset.foo = 'bar';
console.log(personEl.dataset.foo); // bar
```

## Fim

Espero que você tenha descoberto algo novo de JavaScript assim como eu. Parabéns ao Mozilla pelo novo site do MDN, está muito melhor, na minha opinião – Eu passei muito mais tempo lendo nele do que eu pensava que iria.
Feliz 2018!
