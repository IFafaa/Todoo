const app = require('./app')
const _PORT = 3333

app.listen(_PORT, () => {
    console.log(`Server rodando na url: http://localhost:${_PORT}`);
})