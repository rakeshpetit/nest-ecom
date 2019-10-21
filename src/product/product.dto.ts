import { IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
