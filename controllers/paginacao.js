module.exports = app => {

    app.get('/paginacao', (req, res) => {
        var body = (req.body);

        if (!body.id || !body.paginacao) {
            res.statusCode = 400;
            res.send('Ocorreu um erro com o layout recebido, mande na seguinte forma: {"pagina":  1,"paginacao": 30}')
        }
        else {
            if (body.paginacao <= 5) { //REGRA PARA PAGINA TOTAL DE ITENS MENOR QUE 5
                let response = []

                for (let i = 1; i <= body.paginacao; i++) {
                    if (i == body.id) {
                        response.push("**" + i + "**");
                    }
                    else {
                        response.push("" + i);
                    }
                }

                res.send(response);
            }
            else if (body.paginacao >= 6) {
                //-------------------------------------------------------
                //LOGICA PARA LIMITAR O NUMERO MAXIMO E MINIMO DE PAGINAS
                //-------------------------------------------------------

                var limitadorMax = body.id + 2;
                var limitadorMin = body.id - 2;

                if (limitadorMax >= body.paginacao) {
                    limitadorMin -= 2;
                    limitadorMax = body.paginacao;

                    limitadorMin += limitadorMax - body.id;
                }

                if (limitadorMin <= 1) {
                    limitadorMin = 1
                    limitadorMax += 2;

                    limitadorMax += limitadorMin - body.id;
                }
                //-----------------------------------------------------------------
                //FAZ AS ULTIMAS TRATIVAS DOS ITENS SEGUINDO AS REGRAS APRESENTADAS
                //-----------------------------------------------------------------

                let response = []

                for (let i = limitadorMin; i <= limitadorMax; i++) {
                    if (i == body.id) {
                        response.push("**" + i + "**");
                    }
                    else {
                        response.push("" + i);
                    }
                }
                if (response[0] > 1) {
                    response.unshift('...');
                }
                if (response[4] < body.paginacao && !response[5]) {
                    response.push('...');
                }
                if (response[4] < body.paginacao && response[5] < body.paginacao) {
                    response.push('...');
                }

                res.send(response);
            }
            //-----------------------------------------------------------------
            //-----------------------------------------------------------------
            //-----------------------------------------------------------------

            else {//CASO DE ALGUM ERRO INESPERADO PARA NÃO DEIXAR SEM RESPOSTA
                res.statusCode = 404
                res.send("Ocorreu um erro ao processar sua requisição!");
            }
        }

    });
}