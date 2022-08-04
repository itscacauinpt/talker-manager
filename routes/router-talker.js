const router = require('express').Router(); 
// const crypto = require('crypto');
const { readFile, writeFile } = require('../service/fileSystem');
// const validateUser = require('../middleware/loginValidation');
const { validateTalkDate, validateTalker, validateToken,
  validateRate, validateTalk } = require('../middleware/talkValidation');

router.get('/search', validateToken, async (request, response) => {
  const { q: name } = request.query;
  const talkers = await readFile();

  if (!name) return response.status(200).json(talkers);
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(name));
  if (filteredTalkers.length === 0) return response.status(200).json([]);

  return response.status(200).json(filteredTalkers);
});

router.get('/', async (_request, response) => {
  const talkers = await readFile();
  if (!talkers || talkers.length === 0) {
    return response.status(200).json([]);
  }
  return response.status(200).json(talkers);
});

router.get('/:id', async (request, response) => {
  const talkers = await readFile();
  const { id } = request.params;
  const talkerId = talkers.find((t) => t.id === Number(id));

  if (!talkerId) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200).json(talkerId);
});

// router.post('/login', validateUser, (_request, response) => {
//   const token = crypto.randomBytes(8).toString('hex');

//   return response.status(200).json({ token });
// });

router.post('/', validateToken, validateTalker,
  validateTalk, validateTalkDate, validateRate,
  async (request, response) => {
  const talkers = await readFile();

  const newTalker = {
    id: talkers.length + 1,
    ...request.body,
  };

  talkers.push(newTalker);
  await writeFile(talkers);
  return response.status(201).json(newTalker);
});

router.put('/:id', validateToken, validateTalker,
  validateTalk, validateTalkDate, validateRate,
  async (request, response) => {
  const { id } = request.params;
  const talkers = await readFile();

  const findTalkerInd = talkers.findIndex((talker) => Number(talker.id) === Number(id));
  let editedTalker = talkers[findTalkerInd];

  editedTalker = {
    id: Number(id),
    ...request.body,
  };

  talkers.push(editedTalker);
  await writeFile(talkers);
  return response.status(200).json(editedTalker);
});

router.delete('/:id', validateToken, async (request, response) => {
  const talkers = await readFile();
  const { id } = request.params;

  const deleteTalker = talkers
    .filter((talker) => Number(talker.id) !== Number(id));

  await writeFile(deleteTalker);
  return response.status(204).json();
});

module.exports = router;