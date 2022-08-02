const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./fileSystem');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await readFile();
  if (!talkers || talkers.length === 0) {
    return response.status(200).json([]);
  }
  return response.status(200).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const talkers = await readFile();
  const { id } = request.params;
  const talkerId = talkers.find((t) => t.id === Number(id));

  if (!talkerId) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
