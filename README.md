# API Relógio

API desenvolvida com Express para consultar a data e a hora atuais do servidor.

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

A API utiliza a porta definida em `PORT`. Quando essa variável não está configurada, usa a porta `3000`.

## Rotas

- `GET /` - Retorna informações sobre a API e suas rotas.
- `GET /data-hora` - Retorna a data, hora, registro ISO e fuso horário do servidor.

Exemplo de resposta:

```json
{
  "data": "16/09/2026",
  "hora": "23:00:00",
  "dataHora": "2026-09-16T23:00:00.000Z",
  "fusoHorario": "UTC"
}
```

O fuso horário é detectado automaticamente a partir da configuração da máquina onde o servidor está executando.

## Variáveis de ambiente

- `PORT`: porta utilizada pelo servidor.

## Deploy no Render

Configure o serviço com:

- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/`
