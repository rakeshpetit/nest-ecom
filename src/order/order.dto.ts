interface ProductOrderDTO {
  product: string;
  quantity: number;
}
export interface CreateOrderDTO {
  products: ProductOrderDTO[];
}
