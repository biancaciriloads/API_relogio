const express = require('express');

const app = express();

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  next();
});

const port = Number(process.env.PORT) || 3000;
const serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

function formatDateTime(date) {
  const dateParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: serverTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const timeParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: serverTimeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date);

  const getValue = (parts, type) => parts.find((part) => part.type === type)?.value;

  return {
    data: `${getValue(dateParts, 'day')}/${getValue(dateParts, 'month')}/${getValue(dateParts, 'year')}`,
    hora: `${getValue(timeParts, 'hour')}:${getValue(timeParts, 'minute')}:${getValue(timeParts, 'second')}`,
    dataHora: date.toISOString(),
    fusoHorario: serverTimeZone
  };
}

app.get('/', (request, response) => {
  response.json({
    servico: 'API de data e hora',
    fusoHorario: serverTimeZone,
    rotas: [
      {
        metodo: 'GET',
        caminho: '/data-hora',
        descricao: 'Consulta a data e hora do servidor'
      }
    ]
  });
});

app.get('/data-hora', (request, response) => {
  response.set('Cache-Control', 'no-store');
  response.json(formatDateTime(new Date()));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API disponível na porta ${port}`);
});
