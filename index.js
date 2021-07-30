const customExpress = require('./config/customExpress');

const app = customExpress();

app.listen(8000, () => console.log("Servidor rodando na porta 8000"));
