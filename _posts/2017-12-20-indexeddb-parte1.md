---
layout: post
title: IndexedDB – seu banco de dados no client-side (Parte 1)
description: Aprenda os primeiros passos para utilizar indexedDB, armazene dados no navegador
keywords: javascript, html5, ecmascript, es6, es2015, indexeddb, banco de dados
image: /images/2017-12-28-indexeddb-logo.jpg
alt: Logo HTML5 com o nome IndexedDB em seguida
url: "https://maikenegreiros.me/artigos/indexeddb-parte1"
updateDate: "20/12/2017"
categories: [artigos]
---

Há pouco tempo atrás, quando se falava em armazenamento de dados no lado do cliente, a única coisa que nos vinha a cabeça eram os cookies. O HTML 5 nos trouxe mais algumas possibilidades para desempenhar esse papel, das quais podemos citar *Web Storage* e *IndexedDB*. Existe também o *Web SQL*, porém, esta tecnologia foi descontinuada, cedendo espaço para o IndexedDB, que é o assunto desse artigo.

O indexedDB é um banco de dados transacional não relacional, ele não funciona com linguagem SQL, tampouco existem tabelas em sua estrutura. No indexedDB, usamos a API JavaScript para manipular os dados, no lugar das tabelas, temos as objectStores, onde podemos armazenar qualquer tipo primitivo de dados, ou até mesmo blobs e arquivos. Nesse artigo mostrarei alguns exemplos armazenando objetos JavaScript.

## Abrindo uma conexão

Para abrirmos uma conexão, devemos usar o método open do objeto indexedDB presente no objeto window. Para esse método, devemos passar dois parâmetros, o primeiro é uma string com o nome que queremos dar ao banco, o segundo é a versão do banco. Teremos algo assim:

```js
let openRequest = window.indexedDB.open("MyDatabase", 1)
```

Se abrirmos, utilizando o Chrome, as ferramentas do desenvolvedor na aba Applications, poderemos ver clicando em IndexedDB no menu lateral, que foi criado um Banco "MyDatabase".

![Ferramentas do desenvovedor - Chrome](/images/2017-12-20-indexeddb01.jpg)

A API do IndexedDB é assíncrona, portanto temos que trabalhar com callbacks, ou melhor ainda, podemos trabalhar com Promises, porém, optarei por usar a primeira opção, as Promises serão assuntos de artigos posteriores. O método *open* nos retorna um objeto *IDBOpenDBRequest*, ou seja, uma requisição de abertura ao banco de dados. Sempre que executamos um pedido de abertura, temos que lidar com três eventos: *onupgradeneeded* , *onsuccess*, *onerror*.

Para entendermos como esses eventos são disparados podemos escrever o seguinte código no console do navegador:

```js
let openRequest = window.indexedDB.open("MyDatabase", 2)
openRequest.onupgradeneeded = () => {
    console.log("Banco criado ou atualizado")
}
openRequest.onsuccess = () => {
    console.log("Conexão ao banco estabelecida com sucesso")
}
openRequest.onerror = () => {
    console.log("erro ao tentar conectar ao banco")
}
```

Ao executarmos o código pela primeira vez, podemos ver no console, que os eventos *onupgradedneeded* e *onsuccess* foram disparados:

![Ferramentas do desenvovedor - Chrome](/images/2017-12-20-indexeddb02.jpg)

Se atualizarmos a página e executarmos esse mesmo código, veremos que apenas o evento onsuccess foi disparado. Explicarei porque isso acontece logo a seguir.

![Ferramentas do desenvovedor - Chrome](/images/2017-12-20-indexeddb03.jpg)

## onupgradeneeded

Esse evento é disparado em duas ocasiões, ou no momento em que criamos o banco, ou quando alteramos a versão do mesmo. Vamos ao primeiro caso. Quando uma requisição de abertura é feita, é verificado se existe algum banco com o nome fornecido, se não existir, o onupgradeneeded é disparado. Na callback associada a esse evento escrevemos toda a lógica de criação da estrutura do nosso Banco.

```js
openRequest.onupgradeneeded = () => {
    // Aqui criamos a estrutura do nosso banco de dados
}
```

Vamos ao segundo caso. Tendo o nosso banco já criado,  naturalmente podemos precisar fazer alguma alteração na sua estrutura, seja excluir, adicionar ou até mesmo modificar uma *objectStore*(lembre que no lugar das *tabelas* dos bancos relacionais, temos *objectStores*), não basta apenas inserir mais código na callback associada ao *onupgradeneeded*, pois a mesma nunca será executada novamente se não alterarmos o número da versão. Então o código, até aqui, deve ficar assim:

```js
let openRequest = window.indexedDB.open("MyDatabase", 2) // note que a versão passou de 1 para 2
openRequest.onupgradeneeded = () => {
    // podemos inserir mais código aqui, modificando a estutura do banco
}
```

## Criando e deletando objectStores

O resultado de uma requisição de abertura é um objeto <i>IDBDatabase</i>, que é o banco de dados propriamente dito.  Esse objeto pode ser obtido dentro da callback atrelada ao onupgradeneeded da seguinte forma:

```js
openRequest.onupgradeneeded = () => {
    let DB = openRequest.result
}
```

A variável *DB* guarda o objeto *IDBDatabase*, nosso banco de dados. A partir dele podemos criar uma objectStore chamando o método *createObjectStore*, esse método recebe dois parâmetros, o primeiro é uma string com o nome da *objectStore*, o segundo é uma flag, que determina como será a chave em que nossos objetos JavaScript serão armazenados. Essa flag pode ser de dois tipos, *keyPath* e *keyGenerator*. O keyPath funciona com uma espécie de chave primária. Vejamos o exemplo abaixo:

```js
openRequest.onupgradeneeded = () => {
    let DB = openRequest.result
    DB.createObjectStore("pessoas", {keyPath: "cpf"})
}
```

No código acima estamos criando uma objectStore "pessoas", onde serão armazenados nossos objetos JavaScript. Para o keyPath passamos o valor  "cpf", portanto temos que garantir que os objetos que iremos armazenar na objectStore possuam o atributo "cpf". Dessa forma, quando quisermos obter um objeto armazenado no banco de dados, obtemos o mesmo pelo valor do seu atributo "cpf". O mesmo vale para quando quisermos, deletar ou atualizar um objeto.
Vejamos como fica o nosso banco de dados:

![Ferramentas do desenvovedor - Chrome](/images/2017-12-20-indexeddb04.jpg)

Agora vou mostrar como faríamos o mesmo utilizando um *keyGenerator*.

```js
openRequest.onupgradeneeded = () => {
    let DB = openRequest.result
    DB.createObjectStore("pessoas", {autoIncrement: true})
}
```

O que mudou desse código pro anterior, foi o segundo parâmetro passado para o método createObjectStore, dessa forma nosso primeiro objeto será armazenado na chave 1, o segundo na chave 2 e assim por diante. Veja só como ficaria o nosso banco de dados:

![Ferramentas do desenvovedor - Chrome](/images/2017-12-20-indexeddb05.jpg)

Neste artigo, para não estender muito, foquei apenas na parte inicial do IndexedDB, no próximo, trabalharemos dentro da callback do evento onsuccess e aprenderemos como realizar as operções de CRUD, ou seja, veremos como inserir dados, bem como atualizar, obter e deletar os dados inseridos.
