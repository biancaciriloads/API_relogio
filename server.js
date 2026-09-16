const express = require('express');

const app = express();
const port = Number(process.env.PORT) || 3000;
const timeZone = 'America/Sao_Paulo';

function formatDateTime(date) {
  const dateParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);

  const timeParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
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
    fusoHorario: timeZone
  };
}

app.get('/data-hora', (request, response) => {
  response.json(formatDateTime(new Date()));
});

app.listen(port, () => {
  console.log(`API disponível em http://localhost:${port}`);
});
