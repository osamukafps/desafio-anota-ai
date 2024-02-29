const categoryController = require('../controllers/categoryController');
const Category = require('../models/categoryModel');

jest.mock('../models/categoryModel.js');

describe('Category Controller', () => {
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


    describe('create category', () => {

        it('should create a new category', async () => {

            Category.findOne.mockResolvedValueOnce(null);

            const createdCategory = {
                id: 1,
                title: 'Pastéis Grandes',
                description: 'Pastéis de 20cm com recheio especial',
                ownerId: 3442
            };

            Category.create.mockResolvedValueOnce(createdCategory);

            await categoryController.createCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Created'
            });
        });

        it('should return 409(conflict) if category already exists', async () => {

            Category.findOne.mockResolvedValue({
                id: 1
            });

            await categoryController.createCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Category already exists',
                data: {
                    id: 1
                }
            });
        });

        it('should handle a internal server error', async () => {

            Category.findOne.mockRejectedValue(new Error('Database Error'));

            await categoryController.createCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});