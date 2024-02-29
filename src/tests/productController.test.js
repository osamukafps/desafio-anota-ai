const ProductController = require('../controllers/productController');
const Product = require('../models/productModel');

jest.mock('../models/productModel.js');

describe('Product Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {

    it('should create a new product', async () => {

      // Configura o comportamento do mock do Product
      const mockProduct = {
        id: 1,
        title: 'Pizza de Frango com Catupiry',
        description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas, parmesão ralado',
        price: 52.90,
        category: 'Pizzas Comuns',
        ownerId: 3442
      };
      Product.findOne.mockResolvedValue(null); // Retorna null para indicar que o produto não existe
      Product.create.mockResolvedValue(mockProduct); // Simula a criação de um novo produto

      // Chama o método createProduct da ProductController
      await ProductController.createProduct(req, res);

      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 409 if product already exists', async () => {

      // Configura o comportamento do mock do Product
      Product.findOne.mockResolvedValue({ 
        id: 1 
      }); // Simula que o produto já existe

      // Chama o método createProduct da ProductController
      await ProductController.createProduct(req, res);

      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Product already exists!'
      });
    });

    it('should handle internal server error', async () => {

      // Configura o comportamento do mock do Product para lançar um erro
      Product.findOne.mockRejectedValue(new Error('Database error'));

      // Chama o método createProduct da ProductController
      await ProductController.createProduct(req, res);

      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal Server Error',
        error: 'Database error'
      });
    });
  });

  describe('getProducts', () => {
    
    it('should return all products', async () => {
      
      // Configuração do mock do Product.find para retornar uma lista de produtos
      const mockProducts = [
        { 
          id: 1,
          title: 'Pizza de Frango com Catupiry',
          description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas, parmesão ralado',
          price: 52.90,
          category: 'Pizzas Comuns',
          ownerId: 3442 
        }, 
        { 
          id: 2,
          title: 'Pizza de Calabresa',
          description: 'Molho de tomate, mussarela, calabresa, bacon, orégano.',
          price: 49.90,
          category: 'Pizzas Comuns',
          ownerId: 3442
        }
      ];

      Product.find.mockResolvedValue(mockProducts);

      // Chama o método getProducts da ProductController
      await ProductController.getProducts(req, res);

      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ 
        products: mockProducts 
      });
    });

    it('should return 404 if no products found', async () => {

      // Configuração do mock do Product.find para retornar uma lista vazia
      Product.find.mockResolvedValue([]);
    
      // Chama o método getProducts da ProductController
      await ProductController.getProducts(req, res);
    
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(404); // Corrigido para esperar 404
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Product not found!' 
      });
    });
    
    it('should return 500 if internal server error occurs', async () => {

      // Configuração do mock do Product.find para lançar um erro
      const errorMessage = 'Database error';
      Product.find.mockRejectedValue(new Error(errorMessage));
  
      // Chama o método getProducts da ProductController
      await ProductController.getProducts(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        error: errorMessage
      });
    });
    
  });

  describe('associateCategory', () => {

    it('should associate category to product', async () => {

      // Configuração do mock do Product.updateOne para retornar o produto atualizado
      const updatedProduct = { 
        id: 1, 
        category: 'Pizzas Comuns' 
      };

      Product.updateOne = jest.fn().mockResolvedValue({
        matchedCount: 1
      });// Simula sucesso na atualização
 
      // Configuração da requisição com dados de teste
      req.body = { 
        id: 1, 
        category: 'Pizzas Premium' 
      };
    
      // Chama o método associateCategory da ProductController
      await ProductController.associateCategory(req, res);
      console.log(req.body);
    
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(200);
    });  
  
    it('should return 404 if product not found', async () => {

      // Configuração do mock do Product.updateOne para indicar que nenhum produto foi atualizado (não encontrado)
      Product.updateOne.mockResolvedValue({ matchedCount: 0 });
  
      // Configuração da requisição com dados de teste
      req.body = { 
        id: 999, 
        category: 'Pizzas Comuns' 
      }; // ID de produto inexistente
  
      // Chama o método associateCategory da ProductController
      await ProductController.associateCategory(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Produto não encontrado.' 
      });
    });
  
    it('should return 500 if internal server error occurs', async () => {

      // Configuração do mock do Product.updateOne para lançar um erro
      const errorMessage = 'Database error';
      Product.updateOne.mockRejectedValue(new Error(errorMessage));
  
      // Configuração da requisição com dados de teste
      req.body = { 
        id: 1, 
        category: 'Pizzas Comuns' 
      };
  
      // Chama o método associateCategory da ProductController
      await ProductController.associateCategory(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
        error: errorMessage
      });
    });
  });

  describe('updateProduct', () => {
    
    it('should update product', async () => {

      // Produto existente que será atualizado
      const existingProduct = { 
        id: 1, 
        title: 'Pizza de Franco com Catupiry', 
        description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas, parmesão ralado', 
        price: 52.90,
        ownerId: 3442 
      };
    
      // Dados de atualização do produto
      const updateData = {
        description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas', 
        price: 52.90,
        ownerId: 3442 
      };
    
      // Produto atualizado após a atualização
      const updatedProduct = { 
        id: 1, 
        title: 'Pizza de Frango com Catupiry', 
        description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas', 
        price: 52.90,
        ownerId: 3442 
      };
    
      // Configuração do mock do Product.findOne para retornar o produto existente
      Product.findOne.mockResolvedValue(existingProduct);
    
      // Configuração do mock do Product.updateOne para indicar que a atualização foi bem-sucedida
      Product.updateOne.mockResolvedValue(updatedProduct); // ou você pode retornar o produto atualizado
    
      // Configuração da requisição com dados de teste
      req.params = { 
        id: 1 
      };
      req.body = updateData;
    
      // Chama o método updateProduct da ProductController
      await ProductController.updateProduct(req, res);
    
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(200);
    });
    
  
    it('should return 404 if product not found', async () => {
      // Configuração do mock do Product.findOne para indicar que o produto não foi encontrado
      Product.findOne.mockResolvedValue(null);
  
      // Configuração da requisição com dados de teste
      req.params = {
        id: 999
      }; // ID de produto inexistente
      req.body = {}; // Dados de atualização vazios
  
      // Chama o método updateProduct da ProductController
      await ProductController.updateProduct(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Product not found' 
      });
    });
  
    it('should return 500 if internal server error occurs', async () => {

      // Configuração do mock do Product.findOne para lançar um erro
      const errorMessage = 'Database error';
      Product.findOne.mockRejectedValue(new Error(errorMessage));
  
      // Configuração da requisição com dados de teste
      req.params = {
        id: 1
      };
      req.body = { 
        description: 'Molho de tomate, mussarela, frango desfiado, catupiry, orégano, tomate em rodelas' 
      };
  
      // Chama o método updateProduct da ProductController
      await ProductController.updateProduct(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error when updating...',
        error: errorMessage
      });
    });
  });
  
  describe('removeProduct', () => {

    it('should remove product', async () => {

      // Configuração do mock do Product.deleteOne para indicar que a remoção foi bem-sucedida
      Product.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
      // Configuração da requisição com dados de teste
      req.params = {
        id: 1
      };
  
      // Chama o método removeProduct da ProductController
      await ProductController.removeProduct(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({});
    });

    it('should return 404 if product not found', async () => {

      // Configuração do mock do Product.deleteOne para indicar que o produto não foi encontrado
      Product.deleteOne.mockResolvedValue({ deletedCount: 0 });
  
      // Configuração da requisição com dados de teste
      req.params = {
        id: 999
      }; // ID de produto inexistente
  
      // Chama o método removeProduct da ProductController
      await ProductController.removeProduct(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Could not delete' 
      });
    });

    it('should return 500 if internal server error occurs', async () => {

      // Configuração do mock do Product.deleteOne para lançar um erro
      const errorMessage = 'Database error';
      Product.deleteOne.mockRejectedValue(new Error(errorMessage));
  
      // Configuração da requisição com dados de teste
      req.params= {
        id: 1
      };
  
      // Chama o método removeProduct da ProductController
      await ProductController.removeProduct(req, res);
  
      // Verifica se a resposta foi enviada corretamente
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal Server Error',
        error: errorMessage
      });
    });
  });
});
