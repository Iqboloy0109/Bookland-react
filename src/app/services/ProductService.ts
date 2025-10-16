import axios from "axios";
import { serverApi } from "../../lib/config";
import { Book, BookInquiry } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(
    input: BookInquiry
  ): Promise<{ results: Book[]; total: number }> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      if (input.bookGenre) url += `&bookGenre=${input.bookGenre}`;
      if (input.bookFormat) url += `&bookFormat=${input.bookFormat}`;
      if (input.bookCondition) url += `&bookCondition=${input.bookCondition}`;
      if (input.search) url += `&search=${input.search}`;
      if (input.minPrice !== undefined) url += `&minPrice=${input.minPrice}`;
      if (input.maxPrice !== undefined) url += `&maxPrice=${input.maxPrice}`;

      const result = await axios.get(url);
      console.log("getProducts: ", result);

      // Return the full response data which includes results and total
      return result.data;
    } catch (err) {
      console.log("Error, getProducts: ", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Book> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });

      console.log("getProduct: ", result);
      return result.data;
    } catch (err) {
      console.log("Error, getProducts: ", err);
      throw err;
    }
  }
}

export default ProductService;
