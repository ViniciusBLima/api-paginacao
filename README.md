# api-paginacao

##### Descrição
Uma simples API que retorna um array com 5 itens, deixando o número principal escolhido pelo usuario na requisição em negrito, e casa haja continuação antes dos 2 primeiros numeros, ou depois dos 2 últimos números é adicionado reticências:  ```'['...', '5', '6', '**7**', '8', '9', '...']'```<br>

Caso o número de paginação seja menor do que 5 é retornado um array simples, exemplo: ```'['1', '**2**', '3', '4']'```

##### URL

```
http://localhost:8000/paginacao
```

##### Parâmetros 
```
{
    "id":  5,
    "paginacao": 6
}
```
