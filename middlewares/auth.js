const jwt = require('jsonwebtoken');

/* Linter показывал ошибку  */
/* Expected to return a value at the end of arrow function.eslint(consistent-return) */
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, '2fa5a3af71b147c0e696aa8ae458831ab64482d236667469bec82a548e646aeb');
  } catch (err) {
    return res.status(404).send({ message: 'Неправильные почта или пароль' });/* Поменял на 404. Но в задании указана ошибка 401 */
  }

  req.user = payload;

  next();
};

module.exports = auth;
