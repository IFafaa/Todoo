const status = [
    {description: 'A fazer', id: 'todo'},
    {description: 'Em progresso', id: 'progress'},
    {description: 'Finalizado', id: 'done'},
]

const getStatus = (req,res) => {
    res.status(200).send(status)
}

module.exports = {
    getStatus
}