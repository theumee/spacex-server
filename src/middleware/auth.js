const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

module.exports = authMiddleware;
