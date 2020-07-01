# DBooking - Node API

- [DBooking - Node API](#dbooking---node-api)
  - [Técnologias](#técnologias)
  - [Rotas da aplicação](#rotas-da-aplicação)
    - [Rotas públicas](#rotas-públicas)
      - [Criar usuário](#criar-usuário)
      - [Fazer login na sessão](#fazer-login-na-sessão)
    - [Rotas privadas](#rotas-privadas)
      - [Atualizar perfil](#atualizar-perfil)
      - [Listar agenda diária](#listar-agenda-diária)
      - [Criar reserva](#criar-reserva)
      - [Listar reservas](#listar-reservas)
      - [Cancelar reserva](#cancelar-reserva)

Uma API que permite o usuário fazer uma reserva presencial para um jantar. A reserva de uma mesa será feita como a reseva de um lugar em aplicativos de cinema, apresentando todos os lugares disponíveis do restaurante e indicando quais estão livres ou não para a data e horário desejados.

Além da opção de reserva, o usuário também pode fazer um pedido através do delivery.

## Técnologias

A API é desenvolvida usando node js e outras técnologias como:

- Express
- Knex
- JsonWebToken
- PostGreSQL

## Rotas da aplicação

### Rotas públicas

#### Criar usuário

```
POST /users
```

Exemplo de corpo da requisição:

```
{
	"name": STRING,
	"email": STRING,
	"password": STRING
    "provider": BOOLEAN
}
```

Retorna o nome, email e id do usuário criado.

#### Fazer login na sessão

```
POST /sessions
```

Exemplo de corpo da requisição:

```
{
	"email": STRING,
	"password": STRING
}
```

Resposta da requisição para uma conta de provedor:

```
{
  "user": {
    "id": INT,
    "username": STRING,
    "email": STRING
  },
  "token": STRING
}

```

### Rotas privadas

As rotas abaixo devem possuir um token de acesso, que deve ser enviado atráves do cabeçalho de requisição como Bearer token.

#### Atualizar perfil

```
PUT /users
```

Exemplo de corpo da requisição:

```
{
	"username": STRING,
    "email": STRING,
    "oldPassword": STRING,
    "newPassword": STRING,
    "confirmPassword": STRING,
}
```

Retorna todos os dados atualizados.

#### Listar agenda diária

```
GET /tables
```

Retorna um objeto com os todos os horários e a disponibilidade das mesas para cada horário.

#### Criar reserva

```
POST /bookings
```

Exemplo de corpo da requisição:

```
{
	"table_id": INT,
    "date": DATE,
}
```

#### Listar reservas

```
GET /bookings
```

Retorna todas as reservas que já foram feitas.

#### Cancelar reserva

```
DELETE /bookings/:id
```

Retorna somente código 204.
