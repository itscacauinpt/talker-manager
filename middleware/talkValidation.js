function validateToken(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }

  next();
}

function validateTalker(request, response, next) {
  const { name, age } = request.body;

  if (!name) {
    return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

// function validateName(request, response, next) {
//   const { name } = request.body;

//   if (!name) {
//     return response.status(400).json({ message: 'O campo "name" é obrigatório' });
//   }
//   if (name.length < 3) {
//     return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   }

//   next();
// }

// function validateAge(request, response, next) {
//   const { age } = request.body;

//   if (!age) {
//     return response.status(400).json({ message: 'O campo "age" é obrigatório' });
//   }
//   if (Number(age) < 18) {
//     return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }

//   next();
// }

function validateTalkDate(request, response, next) {
  const { talk } = request.body;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!talk.watchedAt) {
    return response.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const dataValid = dateRegex.test(talk.watchedAt);
  console.log(dataValid);

  if (!dataValid) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
}

function validateRate(request, response, next) {
  const { talk } = request.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!talk.rate) {
    return response.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
}

function validateTalk(request, response, next) {
  const { talk } = request.body;

  if (!talk) {
    return response.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
}

module.exports = {
  // validateName,
  // validateAge,
  validateTalker,
  validateToken,
  validateRate,
  validateTalkDate,
  validateTalk,
};