module.exports = (id) => (req, res, next) => {
  if (res.locals.jwtPayload.id && req.params[id]) {
    const checkId = id === 'userId' ? res.locals.jwtPayload.id : '';
    if (req.params[id] === checkId || checkId === '') {
      return next();
    }
  }
  res.status(403).json({ message: 'Forbidden' });
};
