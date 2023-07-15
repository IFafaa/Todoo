const Tasks = require("../models/task");
const message = require("./validators/message");
const jwt = require("jsonwebtoken")

const createTask = (req, res) => {
  const user = getTokenDecoded(req.headers["authorization"])
  console.log('userId',user);
  const form = req.body;
  if (!form.name) return res.status(400).json({ message: "Nome da task inválido." });
  if (!isValidStatus(form.status)) return res.status(400).json({ message: "Status inválido." });
  Tasks.create({
    name: form.name,
    status: form.status,
    description: form.description,
    userId: user.id
  })
    .then(() => {
      return res.status(200).json({ message: "Task criada com sucesso." });
    })
    .catch(() => {
        return res.status(500).json(message.internalError);
    });
};

const listTasks = (req, res) => {
  const user = getTokenDecoded(req.headers["authorization"])
    Tasks.findAll({where: {userId : user.id}})
    .then((task) => {
        return res.send(stageTasks(task));
    })
    .catch(() => {
        return res.status(500).json(message.internalError);
    });
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const form = req.body;
    const whereId = { where: { id: id }}
    if (!id) return res.status(400).json({ message: "Por favor envie um ID válido." });
    if (!form.name) return res.status(400).json({ message: "Nome da task inválido." });
    if (!isValidStatus(form.status)) return res.status(400).json({ message: "Status inválido." });
    const task = await Tasks.findOne({where : {id : id}});
    task.update(form)
    .then(() => {
        return res.status(200).json({ message: "Task editada com sucesso." });
    }).catch(() => {
        return res.status(500).json(message.internalError);
    })
 
};

const deleteTask = (req,res) => {
    const id = req.params.id;
    if(id){
        Tasks.destroy({where: {id:id}})
        .then(() => {
            res.status(201).json({message: 'Task deletada com sucesso.'});
        }).catch(() => {
            res.status(400).json({message: 'Esta task não existe.'});
        })
    }else{
        res.status(400).json({message: 'Por favor, informe um ID.'});
    }
}

function getALlTasks() {
  return Tasks.findAll();
}

function isValidStatus(status) {
  return status === "todo" || status === "progress" || status === "done";
}

function stageTasks(tasks) {
  return [
    {
      status: "A fazer",
      data: tasks.filter((e) => e.status == "todo"),
    },
    {
      status: "Em progresso",
      data: tasks.filter((e) => e.status == "progress"),
    },
    {
      status: "Finalizado",
      data: tasks.filter((e) => e.status == "done"),
    }
  ]
}

function getTokenDecoded(token){
  token = token.substring(7, token.length);
  return jwt.decode(token);
}

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask
};
