---
layout: post
title: Strict Mode - JavaScript não é terra sem lei
description: Escreva códigos JavaScript mais seguros
keywords: javascript, strict mode, strict, javascript seguro, javascript rigoroso
image: /images/strict-mode-javascript-nao-e-terra-sem-lei.jpg
alt:
url:
updateDate: "14/03/2018"
categories: [artigos]
---

O strict mode foi inserido no Ecmascript 5 e age dizendo ao browser para interpretar o código JavaScript de forma mais rigorosa (strict), lançando erros que em modo normal são silenciados. Isso aumenta a qualidade do código e nos previne de bugs futuros.

## Ativando Strict Mode

Para ativar o strict mode é bastante simples, basta inserir uma string ‘use strict’ no código. Essa string pode ser colocada no começo do código, ou seja, no escopo global, ou pode ser colocada no início do escopo de uma função, nesse caso, o strict mode só valerá para o código inserido dentro desta função. 

### strict mode no escopo global:

<script src="https://gist.github.com/maikenegreiros/88c891e1453a8f407e25f287ea8319a1.js"></script>

### strict mode no escopo de função:

<script src="https://gist.github.com/maikenegreiros/2063d5ed203092ee5213825e232da6e5.js"></script>

Para que tenhamos um código mais seguro, o strict mode muda algumas coisas na forma como o browsers executam o código. Vejamos algumas dessas mudanças:

## Variáveis não declaradas

Em strict mode utilizar variáveis não declaradas lança um Uncaught Reference Error.

<script src="https://gist.github.com/maikenegreiros/76063797e1f056a25870a0c2b25bcefe.js"></script>

Sem strict mode o erro não ocorre e uma variavel de nome variavel é automaticamente declarada e tem valor dez atribuída a mesma.

## Delete

Em strict mode, tentar deletar uma variável retorna um erro, em modo normal esse erro é silenciado. Vejamos o código:

<script src="https://gist.github.com/maikenegreiros/7aea3a8bed8cacf36de50dcfad0326de.js"></script>

Se o código acima for executado em modo normal, a variável não é deletada, porém, nenhum erro é lançado.

## With

A keyword with não existe mais no strict mode, tentar usá-la simplesmente lança um erro de sintaxe:

<script src="https://gist.github.com/maikenegreiros/0fa461ad5a12f787629544328cdf5310.js"></script>

## Parâmetros duplicados

No modo strict, parâmetros duplicados também lança um erro de sintaxe.

<script src="https://gist.github.com/maikenegreiros/e1f6423921919da8ab5311d5c194c231.js"></script>


## Atribuições sem efeito

Em modo não strict, atribuições que possam vir a falhar por algum motivo, não lançam qualquer erro. Em modo strict isso não acontece mais. Qualquer um dos exemplos abaixo lançam um Type Error.

<script src="https://gist.github.com/maikenegreiros/085fd7f6bfffcf95f92d17eac813217b.js"></script>

## Proibido definir propriedades em valores primitivos

Em modo não strict, fazer coisas absurdas como as ilustradas abaixo não emitiam qualquer erro.

<script src="https://gist.github.com/maikenegreiros/52cfe046a80934beb692cac85a9fa2b8.js"></script>

## Palavras reservadas

Em modo strict, *eval* e *arguments*, se tornam palavras reservadas, portanto não é possível declarar variáveis com esses nomes.

<script src="https://gist.github.com/maikenegreiros/3f5d5ac2704f2b7d6eb8a0050fc2cb9e.js"></script>

## Variáveis definidas em eval

Em modo não strict, variáveis definidas dentro de eval são adicionadas ao escopo global. Em modo strict, se tentarmos acessar, no escopo global, uma variável definida em eval, um erro será lançado:

<script src="https://gist.github.com/maikenegreiros/707bb4661f304108347bbe37c72c95dd.js"></script>

## This

Em modo não strict, o valor do this sempre será tranformado em um objeto, isso não ocorre em modo strict. Veja alguns exemplos:

<script src="https://gist.github.com/maikenegreiros/12843a4f7813b5b4557db7792bc28af7.js"></script>

<script src="https://gist.github.com/maikenegreiros/f1a305180d60aea3dfac68c9a8eddd38.js"></script>

<script src="https://gist.github.com/maikenegreiros/4efbc4f8364185d83e53b8fc179d3ea5.js"></script>

<script src="https://gist.github.com/maikenegreiros/3e5ddd66ba7266e3d3c41069fb89c743.js"></script>
