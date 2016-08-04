# Ping API

Este projeto tem como objetivo executar o comando ping do terminal através de endpoints disponíveis via Web.

## Instalação

Para executar o projeto é necessário que seu computador possua o node.js mais recente instalado. Logo em seguida, deve-se copiar o projeto através do comando:

```
$ git clone https://github.com/lucachaves/ping-api.git
```

O projeto possui alguma dependências que precisam ser instaladas. Para isto, acesse a cópia e execute a instalação dos pacotes via o npm:

```
$ cd ping-api
$ npm install
```

Em seguida, para disponibilizar a API localmente basta executar o servidor:

```
$ npm start
```

## Descrição

A execução do ping, conforme ocorre no terminal, precisa essencialmente da informação do host a ser conectado, mas algumas outras opções de configuração podem ser informadas, como a quantidade de disparos a ser executado pelo comando. A seguir, será detalhado os endpoints disponibilizados pelo projeto.

### Ping pelo endereço

Para gerar as informações do comando ping, a partir do `endereço`, é necessário utilizar o método **GET** para a rota `/v1/ping/:address`, sendo o parametro **:address** reservado para o `endereço`.

Por exemplo, para obter as informações do ping para o endereço 8.8.8.8 basta utilizar esta URL:

> http://localhost:5000/v1/ping/8.8.8.8

resultando na seguinte resposta:

```javascript
{
  address: "8.8.8.8",
  packets: [
    {
      seq: "0",
      ttl: "50",
      time: "170.946"
    }
  ],
  statistics: {
    transmitted: "1",
    received: "1",
    losted: "0.0%",
    min: "170.946",
    avg: "170.946",
    max: "170.946",
    stddev: "0.000"
  }
}
```

Observe que neste endpoint é executado apenas um disparo para o endereço fornecido.

### Ping com contagem

As obserções deste endpoint são as mesma da anterior, as informações do comando ping também deve declarar `endereço`. Contudo, além disso, é preciso informar a `contagem` de disparos que serão executados pelo comando ping, usando também o método **GET**.

A rota definida para este endpoint é `/v1/ping/:address/:count`, sendo os parametros **:address** e **:count** são reservados respectivamente para `endereço` e `contagem`.

Por exemplo, para obter as informações do ping para o endereço 8.8.8.8 através de 2 disparos basta utilizar esta URL:

> http://localhost:5000/v1/ping/8.8.8.8/2

Resultando na seguinte resposta:

```javascript
{
  address: "8.8.8.8",
  packets: [
    {
      seq: "0",
      ttl: "50",
      time: "150.426"
    },
    {
      seq: "1",
      ttl: "50",
      time: "154.522"
    }
  ],
  statistics: {
    transmitted: "2",
    received: "2",
    losted: "0.0%",
    min: "150.426",
    avg: "152.474",
    max: "154.522",
    stddev: "2.048"
  }
}
```
