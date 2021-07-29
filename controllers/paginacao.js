module.exports = app => {

    app.get('/paginacao', (req, res) => {
        var body = (req.body);

        if (!body.pagina || !body.totalPagina) {
            res.statusCode = 400;
            res.send('Ocorreu um erro com o layout recebido, mande na seguinte forma: {"pagina":  1,"totalPagina": 30}')
        }
        else {
            if (body.totalPagina <= 5) { //REGRA PARA PAGINA TOTAL DE ITENS MENOR QUE 5
                let response = []

                for (let i = 1; i <= body.totalPagina; i++) {
                    response.push("" + i);
                }

                res.send(response);
            }
            else if (body.totalPagina >= 6) {
                //-------------------------------------------------------
                //LOGICA PARA LIMITAR O NUMERO MAXIMO E MINIMO DE PAGINAS
                //-------------------------------------------------------

                var limitadorMax = body.pagina + 2;
                var limitadorMin = body.pagina - 2;

                if (limitadorMax >= body.totalPagina) {
                    limitadorMin -= 2;
                    limitadorMax = body.totalPagina;

                    limitadorMin += limitadorMax - body.pagina;
                }

                if (limitadorMin <= 1) {
                    limitadorMin = 1
                    limitadorMax += 2;

                    limitadorMax += limitadorMin - body.pagina;
                }
                //-----------------------------------------------------------------
                //FAZ AS ULTIMAS TRATIVAS DOS ITENS SEGUINDO AS REGRAS APRESENTADAS
                //-----------------------------------------------------------------

                let response = []

                for (let i = limitadorMin; i <= limitadorMax; i++) {
                    if (i == body.pagina) {
                        response.push("**" + i + "**");
                    }
                    else {
                        response.push("" + i);
                    }
                }
                if (response[0] > 1) {
                    response.unshift('...');
                }
                if (response[5] < 10 && response[4] < 10) {
                    response.push('...');
                }

                res.send(response);
            }
            //-----------------------------------------------------------------
            //-----------------------------------------------------------------
            //-----------------------------------------------------------------

            else {//CASO DE ALGUM ERRO INESPERADO PARA NÃO DEIXAR SEM RESPOSTA
                res.statusCode(404)
                res.send("Ocorreu um erro ao processar sua requisição!");
            }
        }

    });
}