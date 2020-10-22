# Desafio Charlie

Bem vindo ao Desafio Charlie, nos tópicos abaixo serão explicados como instalar, rodar e as motivação por trás das definições arquiteturais desta aplicação.

- [Desafio Charlie](#desafio-charlie)
  - [Instalar e rodar o projeto](#instalar-e-rodar-o-projeto)
    - [Docker](#docker)
    - [NPM](#npm)
  - [Arquitetura](#arquitetura)
  - [Produção](#produção)
    - [Docker](#docker-1)
    - [NPM](#npm-1)
    - [Considerações](#considerações)
  - [Considerações finais do desenvolvedor](#considerações-finais-do-desenvolvedor)

## Instalar e rodar o projeto

Este projeto pode ser instalado e rodado tanto pelo Docker quanto pelo npm.
É recomendado usar `node/npm` em desenvolvimento para ter maior velocidade de feedback, tempo de build e responsividade do servidor webpack.

### Docker

Para instalar as dependencias e rodar o projeto rode este comando em seu terminal: `make up`.

Caso não tenha [Make](https://pt.wikipedia.org/wiki/Make) instalado em seu computador você pode olhar os comandos dentro do arquivo `Makefile` para ajudar a entender como funciona os scripts. Como exemplo o comando `make up` é o mesmo de chamar no terminal `docker-compose up -d`.

Para rodar:
- `make up` ou `docker-compose up -d`
- Acesse em seu browser: [http://localhost:8080](http://localhost:8080/)


### NPM

- Para instalar as dependencias: `npm install`
- Para rodar o proxy para o site bing rode: `make up-bing`
- Para rodar o projeto no servidor de desenvolvimento: `npm run start`
- Acesse em seu browser: [http://localhost:8080](http://localhost:8080/)

Para rodar os testes: `npm run test`


## Arquitetura

A estrutura principal foi dividida em três partes: `Application`, `Domain`,  e `Infrastructure`. O objetivo desta estrutura é separar completamente toda a lógica de domínio e integrações da aplicação feita em `React`.

A princípio, com esta separação, é possível trocar o framework principal (React) ou até mesmo usar typescript puro mudando estruturalmente a configuração do webpack, package.json e os arquivos na pasta `application`. Apesar de não ser comum esta troca, manter a lógica de domínio separada de frameworks facilita futuras implementações devido a melhor divisão da aplicação em termos de responsabilidades.

Esta arquitetura foi inspirada na Clean Architecture, pegando alguns de seus conceitos para este pequeno projeto e posteriormente melhorá-lo com adição de features.

<img src="docs/clean_architecture.jpg" alt="Clean Architecture" />

- **Application**: Onde ficam as páginas e componentes feitos na biblioteca React. Este diretório consome as regras de domínio e infraestrutura para apresentar as informações na tela do usuário.
- **Domain**: O domínio da aplicação é a implementação das regras de negócio. Nela basicamente tem os objetos de domínio usados para instanciar, ter valores padões e utilitários para serem usadas nas telas ou na camada de `infraestrutura`.
- **Infrastruture**: A camada de infraestrutura desta aplicação contém a integração com as APIs necessárias para mostrar as informações dos climas na tela. Foi implementado a integração com o `Bing`, `OpenCage` e `OpenWeather`. Para estas chamadas de api foi utilizado a `Axios`.


## Produção

### Docker

- rode `make up-prod`
- Acesse em seu browser: [http://localhost:8080](http://localhost:8080/)

ps: este é apenas um meio de testar a aplicação com configuração de produção em um container docker. O correto seria gerar a imagem e tag para subir em um registro privado.

### NPM

Para buildar para produção utilize o comando `npm run build`.

Note que a pasta `build` foi criada, seus arquivos devem ser colocados em um servidor com roteamento configurado para servir os arquivos estáticos. Um exemplo simples é destinar o servidor para seguir normalmente seu roteamento interno (no formato `json` por exemplo) os requests para `https://{host_name}/api/*` e arquivos estáticos como `html`, `css`, `js` e imagens para `https://{host_name}/*`.

### Considerações

Como apresentado acima, pode-se gerar o build de produção tanto pelo Docker quanto pelo NPM. Caso for necessário apenas buildar a imagem `Docker` para depois subir em um registro, deve-se rodar o comando `make build-prod`. Assim com a imagem gerada pode-se colocar em um registro como o ECR da Amazon.

Na imagem de produção foi usado o servidor [nginx](https://nginx.com/) para o roteamento dos arquivos estáticos, mas poderia ser utilizado qualquer outro servidor para este fim. Após isso esta imagem pode ser usada em um cluster [Kuberentes](https://kubernetes.io/) por exemplo ou até rodar pelo próprio docker. Um comando simples para testá-la depois do build é:
`docker run -p 8080:80 --env-file .env desafio:latest`. Isso irá garantir o teste da imagem de produção de maneira fácil e rápida.

Para testar a imagem em produção sem ter problemas de CORS foi criado um pequeno `docker-compose` para facilitar o teste dessa imagem. Para rodar os arquivos estáticos em produção em conjunto com o proxy reverso do Bing, deve-se rodar o comando `docker-compose -f docker-compose.prod.yml up`.

## Considerações finais do desenvolvedor

Como é um desafio mais `Frontend` optei por colocar as integrações com as APIs no próprio projeto em React. Assim posso mostrar alguns patterns que gosto de utilizar nos projetos quando estamos chamando diferentes APIs. Idealmente todas as integrações deveriam estar em um backend dedicado, até porque são utilizadas variáveis sensíveis como as Keys de integração com os serviços externos. Deixá-las nesta aplicação é uma falha de segurança. Isso também evitaria o problema de CORS que o frontend tem ao chamar certos endpoints como a integração do `Bing`.

Sobre dockerizar a aplicação para produção eu gosto de utilizar o Multistage build para diminuir o tamanho da imagem final. Assim posso buildar todo o pacote de produção na imagem mais familiar com o ambiente node e externalizar ela para produção em uma imagem mais leve como a do Nginx alpine. A imagem de produção ficou com aproximadamente 23mb.

Uma forma que gosto de fazer com o Docker é utilizá-lo apenas no Backend. Se eu precisar de um frontend com desenvolvimento separado eu posso fazê-lo com build dos arquivos estáticos mais o roteamento deles a nível do próprio servidor. Se ainda precisar que o deploy de ambos seja separado também é possível usando o conceito de volumes na pasta do backend onde ficam os arquivos estáticos. Com o Kubernetes isso pode ser alcançado com os [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/). Outra forma é deployar estes arquivos em um servidor dedicado na infraestrutura. É possível fazer isso no [S3](https://aws.amazon.com/pt/s3/) da AWS por exemplo.