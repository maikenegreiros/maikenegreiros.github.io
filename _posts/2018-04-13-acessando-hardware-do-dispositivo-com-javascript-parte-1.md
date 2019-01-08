---
layout: post
title: Acessando hardware do dispositivo com JavaScript
description: Obtendo informações da bateria do dispositivo
keywords: javascript, device battery, battery api, battery status api, api bateria
image: /images/2018-04-13-battery-status-api.jpg
alt:
url:
updateDate: 13/04/2018
---

Esse é o primeiro artigo de uma série onde apresentarei algumas APIs capazes de acessar o hardware do dispositivo do usuário.

No artigo de hoje, iniciaremos falando sobre a Battery Status API. Ela pode ser útil quando se deseja ajustar a utilização de recursos da aplicação, diminuindo o uso de bateria, quando esta estiver com um nível muito baixo.

## Battery API

A Battery API fornece algumas informações, a respeito da bateria do dispositivo, tais como, nível atual, estado (carregando ou não), tempo até descarregar e tempo até carga completa. Cada uma dessas informações está contida em uma propriedade do Objeto BatteryManager, como veremos a seguir.

Através do método getBattery do objeto navigator conseguimos uma promise que contém um objeto *BatteryManager*, é ele o coração da API.

### Propriedades

O objeto *BatteryManager* possui quatro propriedades de *readonly*, vejamos a seguir:

#### level
retorna um número de 0 à 1 (0 se estiver completamente descarregado, 1 se estiver com cargar em 100%) indicando o nível da bateria.

#### charging
Retorna um boolean, true se o dispositivo estiver carregando, false se não estiver.

#### chargingTime
Retorna, em segundos, a estimativa do tempo restante até atingir 100% de carga

#### dischargingTime
Retorna, em segundos, a estimativa do tempo restante até o dispositivo descarregar completamente

### Eventos
A BatteryManager possui quatro eventos:

#### chargingchange
É disparado quando o estado de carregamento do dispositivo é alterado.

#### chargingtimechange
É disparado quando a estimativa do tempo de carregamento completo é atualizado.

#### dischargingtimechange
É disparado quando a estimativa do tempo de descarregamento total é atualizado.

#### levelchange
É disparado quando o nível de bateria é atualizado.

#### Exemplo

Vejamos um exemplo abaixo:

<p data-height="265" data-theme-id="dark" data-slug-hash="MVLKXd" data-default-tab="js,result" data-user="maikke" data-embed-version="2" data-pen-title="Battery API" class="codepen">See the Pen <a href="https://codepen.io/maikke/pen/MVLKXd/">Battery API</a> by Maike Negreiros (<a href="https://codepen.io/maikke">@maikke</a>) on <a href="https://codepen.io">CodePen</a>.
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
