export interface CreateProductDTO {
  title: string;
  description: string;
  image: string;
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
