const Users = require("../models/users");
const config = require("../config/auth.config")
const message = require("./validators/message");


var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
  const form = req.body;
  if (!form.username || !form.email || !form.password) {
    return res.status(400).json({ message: "Dados enviados inválidos" });
  }
  
  if(await getEmail(form.email)){
    return res.status(406).json({message: 'Este email já existe.'})
  }

  Users.create({
    username: form.username,
    email: form.email,
    password: bcrypt.hashSync(form.password,8),
  })
    .then(() => {
      return res.status(200).json({ message: "Conta criada com sucesso." });
    })
    .catch(() => {
      return res.status(500).json(message.internalError);
    });
};

const validEmail = async (req,res) => {
    if(await getEmail(req.query.email)){
        return res.status(406).json({message: 'Este email já existe.'})
    }
    return res.status(200).json({message: 'Email ainda não cadastrado.'})
}

const login = async (req,res) => {
    const form = req.body;
    if(!form.email || !form.password)  return res.status(400).json({ message: "Dados enviados inválidos." });
    const user = await Users.findOne({where: { email: form.email }})
    if(!user) return res.status(400).json({ message: "Não foi encontrado uma conta com esse e-mail."});
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(400).send({
        accessToken: null,
        message: "Senha inválida!",
        });
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    }

    const token = jwt.sign(userData, config.secret, {
      expiresIn: 86400 //24h
    })
    res.status(200).send({
        ...userData,
        accessToken: token
    })
}

const changeEmail = async (req, res) => {
  const newEmail = req.body.newEmail;
  const token = getTokenDecoded(req.headers["authorization"]);
  if(!newEmail) return res.status(400).json({message: 'Por favor envie um e-mail.'})

  const userData = {
    id: token.id,
    username: token.username,
    email: newEmail,
  }

  const newToken = jwt.sign(userData, config.secret, {
    expiresIn: 86400 //24h
  })

  const user = await getEmail(token.email);
  await user.update({email: newEmail})
  .then(() => {
    return res.status(200).json({ 
      message: "Email alterado com sucesso.",
      accessToken: newToken
    });
}).catch(() => {
    return res.status(500).json(message.internalError);
})
}

function getTokenDecoded(token){
  token = token.substring(7, token.length);
  return jwt.decode(token);
}

const getEmail = async (email) => {
    return await Users.findOne({where: { email: email }})
}

module.exports = {
  createUser,
  validEmail,
  login,
  changeEmail
};
