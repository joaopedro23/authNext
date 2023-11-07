const express = require('express');
const app = express();
const port = 3333;

// Importe bibliotecas para lidar com autenticação, como jsonwebtoken
const jwt = require('jsonwebtoken');
const segredo = 'd4ccbc95-4e4e-41f5-ba0e-eeaad1404059'

const payload = {
    username: 'jose', // Dados do usuário que você deseja incluir no token
  };
  
  const token = jwt.sign(payload, segredo, { expiresIn: '1h' });

  const authtoken = 'd4ccbc95-4e4e-41f5-ba0e-eeaad1404059'; // O token JWT recebido do cliente

try {
  const decoded = jwt.verify(token, segredo);
  console.log(decoded);
  // Se a verificação for bem-sucedida, 'decoded' conterá os dados do payload do token
} catch (error) {
  console.error('Erro na verificação do token:', error.message);
  // Se a verificação falhar, um erro será lançado
}

app.get('/', (req, res) => {
  res.send('Olá, Mundo!');
});

app.get('/user', (req, res) => {
  // Lógica para verificar a autenticação do usuário aqui
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Acesso não autorizado. Token de autenticação ausente.');
  }

  try {
    const decoded = jwt.verify(token, segredo); // Substitua 'seu_segredo' pelo segredo real usado para assinar o token
    // Aqui, você pode verificar se o usuário tem permissão para acessar esta rota
    res.send(`Bem-vindo à página de user, ${decoded.username}!`);
  } catch (error) {
    res.status(401).send('Acesso não autorizado. Token de autenticação inválido.');
  }
});

app.get('/dashboard', (req, res) => {
  // Lógica para verificar a autenticação do usuário aqui, da mesma forma que /user
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Acesso não autorizado. Token de autenticação ausente.');
  }

  try {
    const decoded = jwt.verify(token, segredo); // Substitua 'seu_segredo' pelo segredo real
    // Aqui, você pode verificar se o usuário tem permissão para acessar esta rota
    res.send(`Bem-vindo à página de dashboard, ${decoded.username}!`);
  } catch (error) {
    res.status(401).send('Acesso não autorizado. Token de autenticação inválido.');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
