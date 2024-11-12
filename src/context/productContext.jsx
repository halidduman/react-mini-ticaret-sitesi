import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

//* 1.adım: Context yapısının temelini createContext kullanarak oluşturduk.
export const ProductContext = createContext();

//* 2.adım: Verileri bileşenlere aktarıcak olan sağlayıcıyı ve onun tuttuğu verileri tanımlar.
export function ProductProvider({ children }) {
  //* Ürünlerin verisi
  const [products, setProducts] = useState();
  //* Gösterilecek olan kategorinin verisi
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    //* Hangi adrese istek atılacağını belirledik.
    const url =
      selectedCategory === "all"
        ? "products" // bütün ürünler
        : `/products/category/${selectedCategory}`; // bir kategoriye ait ürünler

    api.get(url).then((res) => setProducts(res.data));
  }, [selectedCategory]);

  //* 3.adım: Sağlayıcı fonksiyonları mutlaka Provider'ı return etmeli ve App'i sarmalamalıdır.
  //* Value olarak props göndermemiz gerekir
  return (
    <ProductContext.Provider
      value={{ products, setSelectedCategory, selectedCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}
