# Arquitetura hexagonal

## Índice
- [Sobre](#-sobre)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução do server](#-execução-do-server)
- [Execução do CLI](#-execução-do-CLI)
- [Testes](#-testes)

## 💻 Sobre
Projeto desenvolvido no curso de arquitetura hexagonal do FullCycle. Ele possui basicamente duas formas de executar o projeto, pelo CLI ou pela API REST.

## 🗂 Pré-requisitos
Antes de começar, você vai precisar ter instalado:
- NodeJS >= 14

## 🔥 Instalação
```bash
# Clone este repositório
git clone git@github.com:LeonardoCamargo31/arquitetura-hexagonal.git

# Acesse a pasta do projeto no terminal
cd arquitetura-hexagonal

# Instale as dependências
npm install

# Crie o arquivo .env com suas variáveis de ambiente  
touch .env
```

## Execução do server

Execute a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

Pronto! Projeto estará disponível em http://localhost:3000.

## Execução do CLI

Deixei configurado um comando para criar um novo produto:
```bash
npm cli:dev
```
Ao executar esse comando, deve aparecer uma mensagem de sucesso.

## Testes 
### Testes unitários

Testes unitários utilizando o [Jest](https://jestjs.io/pt-BR/). Esses testes podem ser executados com:
```bash
npm run test:unit
```

### Cobertura de testes
Para obter a cobertura de testes pode executar o seguinte comando:
```bash
npm run test:ci
```
