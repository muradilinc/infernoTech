export interface ProductMutation {
  name: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  characteristics: {
    title: string;
    characteristic: { name: string; value: string }[];
  }[];
  image: File | null;
}
