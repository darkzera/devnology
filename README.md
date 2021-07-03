
## API
- MySQL
- NodeJS 
- TypeScript 

## Frontend
- Angular (xx)


# API setup
```bash    
$ clone <repo> 
$ cd <repo path/devnology-api>
$ yarn / npm install
```
#### Database setup
<i>./knexfile.ts</i>
```javascript
...
    connection: {
		host: '', // <-
		user: '', // <-
		database: 'devnology-test'
...
...
```

 Knex nao pode criar um schema por si quando o alvo é o MySQL. Entao, criamos o BD manualmente.
```bash
mysql> CREATE DATABASE devnology-test
```

##### Migrations
- :up  
```bash
$ yarn knex migrate:up 20210628041424_carro.ts (TODO: Mudar esse nome D=)
```
- :down   
```bash
$ yarn knex migrate:down 20210628041424_carro.ts (TODO: Mudar esse nome D=)
```

##### Seed dummy data
```bash
$ yarn knex seeding
```

##### Working flow
: wipe -> Executa o migrations DOWN e UP nesta ordem.
```bash
$ yarn wipe && yarn seeding
```

#### Executando API
```bash
$ yarn start:dev
```

#### Setup do Frontend e execuçao
```bash    
$ clone <repo> 
$ cd <repo path/devnology-WEB>
$ yarn / npm install
$ yarn ng serve
```



##### Testes (API)
```bash
$ yarn test:func 
OU 
$ yarn test:func venda
$ yarn test:func compra
$ yarn test:func carro
```
   
```bash
$ yarn test:unit gestao
```

## ROTAS // DOC API

// TODO <- pegar do postman

- Inicialmente eu queria consumir dados reais, experimentei uma API da sidesp mas tinha um tempo de descanso ridiculo.
- O preço da venda e comissao de um vendedor sao calculados automaticamente baseado no preço de compra do carro. Ao registrar uma venda, nao é possível fazer o input do valor. Cogitei fazer um campo de desconto que seria abatido a comissao do vendedor mas nao implementei. 
- Há a possibilidade de um mesmo veículo ser reinserido no sistema, mas ele precisa ter sido considerado vendido pra ser recadastrado


# Dificuldades
<div style="text-align:center"><img src="https://media.giphy.com/media/13puqToVXw7j8s/giphy.gif"/></div>


- Minha opçao inicial era utilizar PostgreSQL, mas tive alguns problemas com a minha conexao e pra nao perder muito tempo parti pro MysQL. Nao consegui fazer inserts multiplos com o mysql e o ORM (objectionjs [+knex]) entre outras dores de cabeça que tive, acabei jogando várias queries puras no meio do código o que talvez nao seja muito legal. 
- Também nem aproveitei o mapeamento que o ObjectionJS oferece, poderia ter usado knex direto. 
- Depois que finalizei e analisei o código, percebi alguns problemas graves de nomeclatura, o que dificulta a compreensao do codigo [ =( ups ]
- Pequei bastante na estrutura pela correria, acho que poderia ter modularizado melhor. No começo fui com bastante calma e escrevendo vários testes funcionais, e no final das contas virou <b>eXtreme Go Horse - <s>SORRY</s></b>




### Alguns escopos ficaram incompletos
-  [API] Relatorio final de compra/venda ao mes (só tem algumas queries e acabei nao finalizando)
-  [API] Login / Cadastro
-  [API] Alguns error handling 

- [Frontend] Faltam campos no form para a venda de um veículo, como a seleçao do funcionario (minha ideia era implementar authentication e assim eu simplesmente iria pegar o ID do func. - <b> no final das contas eu nao fiz nem um, nem outro </b>). Na pratica eu settei de forma arbitraria um ID pra ele pegar e enviar pra API.
- [Frontend] Nao há paginas para renderizaçao dos relatorios completos
- [Frontend] Nao tenho muita simpatia nem hábilidade no frontend..Nao que meu Backend seja incŕivel. Mas é o que eu, como um padawan, me sinto mais atraído (kkkk).