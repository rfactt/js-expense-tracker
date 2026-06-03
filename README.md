# Controle de Gastos

![Banner do Projeto](assets/readme/banner.png)

Aplicação web para controle de gastos pessoais, desenvolvida com HTML, CSS e JavaScript puro.

O projeto permite cadastrar despesas, organizar gastos por categoria, calcular o total gasto, salvar dados no navegador e aplicar a regra financeira 50/30/20 com base no salário mensal informado.

## Funcionalidades

* Adicionar gastos com nome, valor e categoria
* Listar gastos cadastrados
* Deletar gastos
* Calcular o total gasto
* Salvar gastos no LocalStorage
* Salvar salário mensal no LocalStorage
* Calcular automaticamente a regra 50/30/20
* Exibir barras de progresso por categoria
* Alertar quando uma categoria ultrapassa o limite recomendado
* Layout em estilo dashboard
* Interface responsiva

## Regra 50/30/20

A aplicação divide o salário mensal em três partes:

| Categoria  | Percentual | Uso recomendado                                   |
| ---------- | ---------: | ------------------------------------------------- |
| Essenciais |        50% | Moradia, alimentação, contas fixas e necessidades |
| Desejos    |        30% | Lazer, compras e gastos não essenciais            |
| Reserva    |        20% | Economia, investimentos ou reserva financeira     |

Quando uma categoria ultrapassa o limite recomendado, os gastos daquela categoria ficam destacados em vermelho e uma mensagem de alerta é exibida.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage

## Estrutura do projeto

```txt
js-expense-tracker/
├── assets/
│   └── readme/
│       └── banner.png
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Como executar

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/js-expense-tracker.git
```

Acesse a pasta:

```bash
cd js-expense-tracker
```

Abra o arquivo `index.html` no navegador.

Também é possível executar com a extensão Live Server no VS Code.

## Aprendizados

Durante o desenvolvimento deste projeto, foram praticados:

* Manipulação do DOM
* Eventos com JavaScript
* Arrays e objetos
* `forEach`
* `reduce`
* `filter`
* Validação de formulários
* LocalStorage
* CSS Grid
* Responsividade
* Organização visual em dashboard
* Separação entre HTML, CSS e JavaScript

## Status

Projeto finalizado como parte dos estudos práticos em desenvolvimento web com JavaScript puro.
