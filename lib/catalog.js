import products from "../data/products.json";

export const allProducts = products;

export const featuredProducts = allProducts
    .filter((product) => product.featured)
    .slice(0, 3);

export const getProductById = (id) =>
    allProducts.find((product) => product.id === id);
