# api-paginacao

##### Descrição
Uma simples API que retorna um array com páginas.
Caso o número total de páginas seja menor ou igual a 5 ele ira retornar um array simples com [1,2,**3**,4,5].
Caso o número total de páginas ultrapasse o numero 5, ele ira começar a selecionar 5 páginas com array, dando foco nas mais proximas da pagina principal que é passada como parâmetro,e dando reticências para as outras páginas.
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
