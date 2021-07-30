module.exports = app => {

    app.get('/paginacao', (req, res) => {
        var body = (req.body);

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        function AddArr(x, comparativo) {
            response = []
            for (i = x; i <= comparativo; i++) {
                if (i == body.id) {
                    response.push("**" + i + "**");
                }
                else {
                    response.push("" + i);
                }
            }
            return response
        }

        if (isNumeric(body.id) && isNumeric(body.paginacao))
                if (body.paginacao <= 5) { //REGRA PARA PAGINA TOTAL DE ITENS MENOR QUE 5
                    let response = []
                    res.send(AddArr(1, body.paginacao));
                }
                //-------------------------------------------------------
                //LOGICA PARA LIMITAR O NUMERO MAXIMO E MINIMO DE PAGINAS
                //-------------------------------------------------------
                else {


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

                    let response = (AddArr(limitadorMin, limitadorMax));

                    if (response[0] > 1) {
                        response.unshift('...');
                    }

                    let tamanhoArr = response.length - 1;

                    if (response[tamanhoArr] < body.paginacao) {
                        response.push('...');
                    }

                    res.send(response);
            }

        else {
            res.statusCode = 400;
            res.send('Ocorreu um erro com o layout recebido, mande na seguinte forma: {"pagina":  1,"paginacao": 30}')
        }
    });
}