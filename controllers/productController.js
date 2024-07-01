class ProductController {
  constructor(productService) {
      this.productService = productService;
  }

  async createProduct(req, res) {
      try {
          const product = await this.productService.createProduct(req.body);
          res.status(201).json({ message: 'Product created successfully', product });
      } catch (error) {
          handleError(error, res);
      }
  }

  async getAllProducts(req, res) {
      try {
          const products = await this.productService.getAllProducts();
          res.status(200).json(products);
      } catch (error) {
          handleError(error, res);
      }
  }

  async getProductById(req, res) {
      try {
          const product = await this.productService.getProductById(req.params.id);
          res.status(200).json(product);
      } catch (error) {
          handleError(error, res);
      }
  }
}

module.exports = ProductController;
