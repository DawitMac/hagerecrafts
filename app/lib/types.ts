export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    more_info: string;
    category: string;
    weight: number;
    currency: string;
    size: number;
    quantity: number;
    url: string;
  };

  export type CartProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    more_info: string;
    category: string;
    weight: number;
    currency: string;
    size: number;
    quantity: number;
    url: string;
    qnt: number;
  };