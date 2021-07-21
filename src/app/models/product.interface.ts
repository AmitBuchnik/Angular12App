export interface Product {
    id: number; // (number, unique)
    name: string; // (string, up to 30 characters, mandatory)
    description: string // (string, up to 200 characters, optional)
    price: number; // (number, larger than zero, mandatory)
    creationDate: Date; //(Date, mandatory)
}

