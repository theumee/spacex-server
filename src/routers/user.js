const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

router.post('/api/user/register', async (req, res) => {
  const { password, name, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  prisma.user
    .create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    .then((value) => {
      res.status(200).json({ id: value.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then(async (user) => {
      if (!user) {
        return res.status(500).json({ error: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(500).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token, name: user.name });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
