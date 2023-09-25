import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "products.json";
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, "utf-8");

        return JSON.parse(productsFile);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const products = await this.getProduct();

      let id;

      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }

      const newProducts = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      products.push({
        ...newProducts,
        id,
      });

      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

      return productoFiltrado;
    } catch (error) {
      return error;
    }
  }

  async deleteProductById(id) {
    try {
      const products = await this.getProduct();

      const productoFiltrado = products.find((item) => item.id === id);

      const products2 = products.filter((item) => {
        return item.id != id;
      });

      if (productoFiltrado) {
        await fs.promises.writeFile(this.path, JSON.stringify(products2));
      } else {
        console.log("PRODUCTO A ELIMINAR N0 EXITSE");
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProduct();

      const index = products.findIndex((item) => item.id === id);

      if (index === -1) {
        return null;
      }

      const updateProd = { ...products[index], ...obj };

      products.splice(index, 1, updateProd);

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      return updateProd;
    } catch (error) {
      return error;
    }
  }
}

export { ProductManager };

