export class Productos {
  constructor() {
    this.products = [];
    this.count = 1;
  }

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    const productById = this.products.find((element) => element.id == id);
    return productById;
  };

  addProduct = (product) => {
    this.products.push({ ...product, id: this.count++ });
    return product;
  };
  //ENTREGA 9
  updateProduct = (product, id) => {
    const updatedProduct = (this.products[id] = product);
    return updatedProduct;
  };

  deleteProduct = (id) => {
    const deletedProduct = this.products.splice(id, 1);
    return deletedProduct;
  };
}
