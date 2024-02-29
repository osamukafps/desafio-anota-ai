# **_Catálogo de Produtos Online_**
### _Este é um aplicativo de catálogo de produtos online que permite aos usuários registrar produtos e categorias, associar produtos a categorias, atualizar dados de produtos e categorias e excluir produtos ou categorias do catálogo. O aplicativo também fornece um endpoint de pesquisa para acessar informações do catálogo._
### _Esta aplicação foi desenvolvida com o objetivo de resolver o desafio [Backend Analyst Candidate Test](https://github.com/githubanotaai/new-test-backend-nodejs) da ANOTA AI._


### 💻 **_Funcionalidades_**

**_Histórias do Usuário: O aplicativo atende às seguintes histórias do usuário:_**<BR>
_✅  Registrar um produto com seu proprietário._<br>
_✅ Registrar uma categoria com seu proprietário._ <br>
_✅  Associar um produto a uma categoria._<br>
_✅ Atualizar dados de produtos ou categorias._<br>
_✅ Excluir um produto ou categoria._<br>
_✅ Associação de Produto-Categoria: Cada produto pode estar associado a apenas uma categoria por vez._<br>
_✅ Associação de Proprietário: Produtos e categorias pertencem apenas a um proprietário._<br>
_✅ Pesquisa de Catálogo: Fornece um endpoint para pesquisar o catálogo de produtos sem buscar informações diretamente do banco de dados._<br>
_✅ Atualizações em Tempo Real: Todas as alterações no catálogo de produtos são publicadas no tópico "catalog-emit" na AWS SQS para notificações em tempo real._<br>
_✅ Consumidor de Catálogo: Um consumidor ouve alterações no catálogo para um proprietário específico, recupera o catálogo atualizado do banco de dados, gera uma compilação JSON e publica-a em um bucket AWS S3._ <br>

### 💻 **_Tecnologias Utilizadas_**
_✅ Banco de Dados: MongoDB_<br>
_✅ Serviço de Fila: AWS SNS_<br>
_✅ Serviço de Notificação: AWS SQS_<br>
_✅ Serviço de Armazenamento: AWS S3_<br>
_✅ Framework Backend: Node.js com Express.js_<br>
_✅ Framework de Testes: Jest_<br>
_✅ Containerização: Docker_<br>

### 💻 **_Configuração_**
🔹 _Clonar o Repositório: Clone este repositório para a sua máquina local._<br>

🔹 _Instalar Dependências: Execute npm install para instalar todas as dependências necessárias._<br>

🔹 _Configurar o MongoDB: Certifique-se de que o MongoDB está instalado e em execução na sua máquina. Você também pode usar o Docker para configurar uma instância do MongoDB._<br>

🔹 _Configurar os Serviços AWS: Configure os serviços AWS SQS e S3 e obtenha as credenciais necessárias._<br>

🔹 _Variáveis de Ambiente: Configure as variáveis de ambiente para a string de conexão do MongoDB, as credenciais da AWS e outras configurações necessárias. Consulte o arquivo .env.example para as variáveis necessárias._<br>

🔹 _Executar o Aplicativo: Execute npm start para iniciar o servidor._<br>

🔹 _Executar os Testes: Execute npm test para executar os testes unitários._<br>

🔹 _Dockerizar: Use o Docker para containerizar o aplicativo para fácil implantação._<br>

### **_Integração Contínua_** <br>
🔄 O repositório inclui um fluxo de trabalho do GitHub Actions que automatiza os processos de teste e implantação. O fluxo de trabalho é acionado a cada push na branch _develop_, garantindo qualidade e confiabilidade do código.

### **_Estrutura de Diretórios_**
📁 _/src: Contém o código-fonte do aplicativo._ <br>
📁 _/tests: Inclui testes unitários para o aplicativo._

### **_Licença_**<br>
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

### 📩 **_Contato_** 
Para quaisquer dúvidas ou suporte, entre em contato com [Samuel](mailto:samuelhplt@gmail.com).