const express = require('express')
const bodyParser = require('body-parser')
const login = require('./UseCases/Login/login')
const jwtAuth = require('./UseCases/JwtToken/jwtauth')
const UserController = require('./Controller/UserController')
const jwtDecode = require('./UseCases/JwtToken/jwtdecoder')
const { param, validationResult } = require('express-validator');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.post('/api/auth/login', (req, res, next) => {
  const credentials = req.body
  let token = login(credentials?.usuario, credentials?.password)
  if(token) {
    res.json("Authorization: Bearer "+token)
  } else (res.status(401).json("Falha ao Efetuar Login"))
}) 

app.get('/api/auth/unrestricted', (req, res, next) => {
  let decoded = jwtDecode(req, res)
  let userController = new UserController()
  let data = userController.findUserByUsername(decoded.id)
  res.status(200).json("Access Granted, user Data:"+JSON.stringify(data))
}) // Passo 6, Novo endpoint para recuperação de dados do usúario não restrito ao admin

const checkAdmin = new jwtAuth("admin")
app.use(checkAdmin.run.bind(checkAdmin)) // Passo 5, Todos os endpoints a seguir só podem ser acessados com o token a nível de admin.

app.get('/api/auth/restricted', (req, res, next) => {
  res.status(200).json("Access Granted")
 })

//Endpoint para recuperação dos dados de todos os usuários cadastrados

app.get('/api/auth/users', (req, res) => {
  let userController = new UserController()
  data = userController.getAll()
  res.status(200).json("Usuários: "+JSON.stringify(data))
})

//Endpoint para recuperação dos contratos existentes

app.get('/api/auth/contracts/:empresa/:inicio', [
  param('empresa')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Empresa não pode estar vazio')
    .escape(),
  param('inicio')
    .isDate({ format: 'DD-MM-YYYY' })
    .withMessage('Formato Invalido. Use DD-MM-YYYY.')], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const empresa = req.params.empresa;
  const dtInicio = req.params.inicio;
  const result = getContracts(empresa, dtInicio);
  if(result)
    res.status(200).json({ data: result })
  else
    res.status(404).json({data: 'Dados Não encontrados'})
})

class Repository{
  execute(query){
    return [];
  }
}

function getContracts(empresa, inicio){
  const repository = new Repository();
  const query = `Select * from contracts Where empresa = '${empresa}' And data_inicio = '${inicio}'`;
  const result = repository.execute(query);
  return result;
}