---
layout: post
title: IndexedDB – seu banco de dados no client-side (Parte 2)
description: Aprenda os primeiros passos para utilizar indexedDB, armazene dados no navegador
keywords: javascript, html5, ecmascript, es6, es2015, indexeddb, banco de dados
image: /images/2017-12-28-indexeddb-logo.jpg
alt: Logo HTML5 com o nome IndexedDB em seguida
url: "https://maikenegreiros.me/artigos/indexeddb-parte2"
updateDate: "13/01/2018"
---

Esse artigo é uma continuação de um artigo anterior, recomendo que leiam primeiro o [IndexedDB – parte 1](/2017/12/20/indexed-db-parte-1.html). No artigo passado falei como criar e deletar as *objectStores*, e vimos que essas operações eram feitas dentro da callback atrelada ao evento *onupgradeneeded*.

## onsuccess

Como prometido, nesse artigo irei abordar as operações de CRUD (create, read, update, delete). Essas operações são feitas dentro da callback do evento **onsuccess**.

### Armazenando um objeto

Com as objectStores criadas, agora precisamos adicionar dados à elas, essa operação será executada dentro da callback atrelada ao evento *onsuccess*. Vejamos o código:

```js
let openRequest = window.indexedDB.open("MyDatabase", 1)
let DB;
openRequest.onupgradeneeded = () => {
    DB = openRequest.result
    DB.createObjectStore("pessoas", {autoIncrement: true}</code>)</li>
}
//O código escrito até aqui é fruto do artigo anterior, uma única alteração foi feita, a variável  DB teve sua declaração realizada fora do escopo da callback, pois essa variável terá uma atribuição dentro da callback atrelada a onsuccess também.

let pessoa1 = {
    nome: "Fulano da Silva",
    data_nascimento: "05/02/1980",
    cpf: "333.333.333-33"
}
openRequest.onsuccess = () => {
    DB = openRequest.result
    DB.transaction(["pessoas"], "readwrite")
    .objectStore("pessoas")
    .add(pessoa1)
}
```

Vamos entender o código acima. Na linha 15 é criada uma transação através do método *transaction* do DB, note que esse método recebe dois parâmetros, o primeiro é um array com as objectStores que iremos trabalhar na transação, no nosso caso iremos trabalhar apenas com uma, então essa linha poderia ser escrita assim também:

```js
let transaction = DB.transaction("pessoas", "readwrite")
```

O segundo parâmetro é o tipo de transação que iremos executar, como estamos escrevendo no banco, o tipo deve ser **readwrite**. Existem outros dois tipos de transações, a **readonly** e **versionchange**.
Na linha seguinte, estamos especificando em qual objectStore iremos operar. Parece um comando desnecessário, visto que já determinamos isso no primeiro parâmetro do método *transaction*, mas lembre-se, que poderíamos ter um array de objectStores na transação.
Finalmente, na linha 17, armazenamos o objeto **pessoa1** no banco através do método *add* da objectStore. Se abrirmos as ferramentas do desenvolvedor, na aba Application poderemos comprovar isso, mas antes é preciso dar um refresh no banco de dados, aliás, sempre que adicionarmos ou modificarmos alguma coisa no banco é necessário atualizar o mesmo para que possamos ver as alterações:

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb01.jpg)

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb02.jpg)

O método *add* é assíncrono e possui dois event handlers, o *onsuccess* e o *onerror*, então podemos adicionar as seguintes linhas para sabermos se a operação foi executada com sucesso ou se algum erro ocorreu.

```js
//Código anterior omitido
openRequest.onsuccess = () => {
    DB = openRequest.result
    let request = DB.transaction(["pessoas"], "readwrite")
        .objectStore("pessoas")
        .add(pessoa1)
    //Novidade aqui
    request.onsuccess = () => {
        console.log("Cadastro realizado com sucesso")
    }
    request.onerror = () => {
        console.log(request.error)
    }
}
```

Ao executar o código acima, a mensagem da linha 9 será logada no console:

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb04.jpg)

### Recuperando um objeto
Aqui não muda muita coisa, assim como para armazenar um dado, devemos abrir uma transação para recuperarmos um dado do banco, o mesmo ocorre para as demais operações. Vejamos o código:

```js
openRequest.onsuccess = () => {
    DB = openRequest.result
    let request = DB.transaction("pessoas", "readonly")
    .objectStore("pessoas")
    .get(1)
    request.onsuccess = () => {
        console.log(request.result)
    }
    request.onerror = () => {
        console.log(request.error)
    }
}
```

Veja que na linha 3, o segundo parâmetro do método *transaction* mudou. Já que não escreveremos ou apagaremos nada no banco, não há necessidade de usarmos o modo readwrite.
Quando o segundo parâmetro não é fornecido, o modo readonly é adotado como padrão, então a linha 3 poderia ser escrita assim também:

```js
let request = DB.transaction("pessoas")
```

Na linha 4 não temos nenhuma novidade. Na linha 5 chamamos o método get, passando o valor da chave onde está armazenado o objeto que queremos recuperar. Assim como o método add, o método *get* é uma requisição assíncrona e temos os eventos *onsuccess* e *onerror*. É no onsuccess que teremos acesso ao objeto recuperado, como podemos ver na linha 7. Na imagem abaixo podemos ver o log da linha 7.

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb03.jpg)

### Recuperando todos os registros
Aqui temos duas opções. Podemos usar o método *getAll*, onde o resultado é um array com os registros da objectStore, ou podemos lançar mão do método *openCursor*, que nos fornece um cursor capaz de iterar em cada valor armazenado na objectStore.
Antes de irmos aos exemplos, irei inserir mais dois objetos utilizando o método *add*, pois no momento possuímos apenas um armazenado. Serão eles:

```js
{
    nome: "Virgulino Ferreira",
    data_nascimento: "13/06/1950",
    cpf: "555.444.333-88"
},
{
    nome: "João de Deus",
    data_nascimento: "15/11/1970",
    cpf: "999.555.777-88"
}
```

Exemplo utilizando **getAll**:

```js
openRequest.onsuccess= () => {
    DB = openRequest.result
    let request = DB.transaction("pessoas", "readonly")
        .objectStore("pessoas")
        .getAll()
    request.onsuccess = () => {
        console.log(request.result)
    }
    request.onerror= () => {
        console.log(request.error)
    }
}
```

Utilizar o getAll é bastante simples, basta abrir uma transação, dizer qual a objectStore que será utilizada e chamar o método getAll, que não necessita de nenhum parâmetro. A linha 7 irá fazer o log de um array com todos os registros contidos no banco.

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb05.jpg)

Agora, vamos ver um exemplo utilizando **openCursor**:

```js
openRequest.onsuccess= () => {
    DB = openRequest.result
    let pessoas = []
    let request = DB.transaction("pessoas", "readonly")
        .objectStore("pessoas")
        .openCursor()
    request.onsuccess = () => {
        let cursor = request.result
        if (cursor) {
            pessoas.push(cursor.value)
            cursor.continue()
        } else {
            console.log(pessoas)
        }
    }
    request.onerror= () => {
        console.log(request.error)
    }
}
```

Na linha 3, eu criei um array **pessoas** que será populado posteriormente com os objetos armazenados na objectStore pessoas. Outra novidade aqui é o método *openCursor*, na linha 6. O resultado dessa requisição é um objeto **IDBCursorWithValue** que tem a capacidade de iterar sobre os objetos da objectStore. Na linha 8 armazenamos esse iterador na variável cursor e em seguida verificamos se ele existe, se ele existir, as linhas 10 e 11 serão executadas. Na linha 10 fazemos um push no array pessoas criado anteriormente, adicionando o objeto atual da objectStore no cursor. Temos acesso à esse objeto através da propriedade *value* do cursor. Na linha seguinte, iteramos o cursor através do método *continue*, fazendo com que o bloco (iniciado na linha 7) seja reexecutado. Ao chegar no if novamente é verificado se o cursor possui algum valor, se sim, tudo irá se repetir. Quando a condição não for mais verdadeira, ou seja, quando não houver mais dados para iterar, o bloco else será executado, logando o array já populado com os objetos da objectStore de pessoas.

O cursor pode fazer várias outras coisas, mas ficaremos por aqui e daremos continuidade aos outros métodos.

### Editando um objeto
Vamos supor que o valor da propriedade *nome* do objeto pessoa1 que armazenamos anteriormente estivesse errado e quiséssemos atualizar o objeto armazenado no banco com o nome correto, então faremos uma nova atribuição ao objeto pessoa1, alterando a propriedade nome. Logo em seguida faremos a atualização do objeto no banco:

```js
pessoa1 = {
    //Alterando o valor da propriedade nome
    nome: "Ciclano Sousa",
    data_nascimento: "05/02/1980",
    cpf: "333.333.333-33"
}
openRequest.onsuccess= () => {
    DB = openRequest.result
    let request = DB.transaction("pessoas", "readwrite")
        .objectStore("pessoas")
        .put(pessoa1, 1)
    request.onsuccess = () => {
        console.log("Registro atualizado com sucesso")
    }
    request.onerror= () => {
        console.log(request.error)
    }
}
```

Note que nessa operação, a nossa transação será do tipo readwrite,  pois estaremos alterando um registro do banco de dados. Na linha 10, utilizamos o método *put* e passamos dois parâmetros para ele, o primeiro é o objeto que será armazenado (nosso objeto pessoa1 com o nome corrigido), o segundo parâmetro é a chave onde está armazenado o objeto que queremos atualizar. Assim como nas outras operações já realizadas, temos os eventos *onsuccess* e *onerror* para a requisição de atualização.

Se executarmos o código acima e sem seguida dermos um refresh no banco, veremos que o objeto foi realmente atualizado:

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb06.jpg)

### Deletando um objeto
Para apagarmos um objeto em uma objectStore é a mesma coisa: abrimos uma transação (do tipo readwrite), apontamos a objectStore que iremos operar e por fim fazemos uma requisição para deletar o objeto.

```js
openRequest.onsuccess= () => {
    DB = openRequest.result
    let request = DB.transaction("pessoas", "readwrite")
        .objectStore("pessoas")
        .delete(1)
    request.onsuccess = () => {
        console.log("Registro deletado com sucesso")
    }
    request.onerror= () => {
        console.log(request.error)
    }
}
```

Se dermos um refresh no banco, veremos que o objeto armazenado na chave 1 não estará mais lá:

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb07.jpg)

Pensei em deixar o evento *onerror* da **requisição de abertura do banco** para um próximo post, mas acabaria sendo um post bem pequeno, pois sobre isso não há tanto para se falar. Serei bem sucinto nas próximas linhas, pois o artigo já ficou mais extenso do que eu gostaria.

<h2>onerror</h2>
Caso a requisição de abertura falhe, o evento que será disparado será o *onerror*. A API indexedDB foi feita tentando evitar que erros aconteçam, será difícil acontecer erros. Um erro que pode acontecer durante um requisição de abertura é se o programador fornecer ao método open um número de versão menor do que o atual. No momento, meu banco está na versão 5, então passarei o valor 4:

```js
let openRequest = window.indexedDB.open("MyDatabase", 4)
let DB;
openRequest.onupgradeneeded = () => {
    //Código omitido
}
openRequest.onsuccess= () => {
    //Código omitido
}
openRequest.onerror= () => {
    console.log(openRequest.error)
}
```

O log da linha 10 será executado nos retonando a seguinte exception:

![Ferramentas do desenvovedor - Chrome](/images/2018-01-11-indexeddb08.jpg)
