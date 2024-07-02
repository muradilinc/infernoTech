export interface ProductMutation {
  name: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  characteristics: Characteristics[];
  image?: File | null | string;
}

export interface Characteristics {
  title: string;
  characteristic: CharacteristicDetail[];
}

export interface CharacteristicDetail {
  name: string;
  value: string;
}

export interface CategoryMutation {
  title: string;
  image?: string;
}

export interface BrandMutation {
  name: string;
  logo?: string;
}
