import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

//* Contextin temelini oluştur
export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useLocalStorage("sepet", []);

  const addToBasket = (newProduct) => {
    //* Tıkladığımız eleman sepette var mı yok mu kontrol etmek için find methodu kullarak
    //* idsi eşit olan ürünü bulduk.
    const found = basket.find((i) => i.id === newProduct.id);

    //* Ürün sepette varsa miktarını 1 arttır.
    if (found) {
      console.log("ürün bulundu");
      console.log(found);
      //* Bulunun ürünün miktarını bir arttır
      const updated = { ...found, amount: found.amount + 1 };
      //* Sepet dizisindeki eski ürün yerine güncel halini koy
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      console.log(newBasket);
      //* Statei güncelle
      setBasket(newBasket);

      toast.success(`Ürün miktarı arttırıldı.(${updated.amount})`);
    } else {
      //* Ürün sepette yoksa ürünün miktarı 1 olarak sepete ekle
      console.log("ürün ilk defa eklendi");
      setBasket(basket.concat({ ...newProduct, amount: 1 }));
    }
  };
  //* Sepetten ürün kaldıran fonksiyon
  const removeFromBasket = (delete_id) => {
    console.log(delete_id);
    //* Silinecek ürünün dışarısında kalanlar ile yeni dizi oluştur.
    const filtred = basket.filter((i) => i.id !== delete_id);
    //* State i güncelle
    setBasket(filtred);

    toast.error("Ürün sepette kaldırıldı");
  };

  const decreaseAmount = (delete_id) => {
    //* 1.adım: Miktarı azaltılacak olan ürünü sepet içerisinde bulmak için find methodu kullandık.
    const found = basket.find((i) => i.id === delete_id);

    //* 2.adım: Miktar 1'den fazla ise miktarı 1 azalt
    if (found.amount > 1) {
      console.log("çalıştı");
      //* a) Elemanın güncel nesnesini oluştur.
      const updated = { ...found, amount: found.amount - 1 };
      //* b) Dizideki elemanın eski hali yerine güncel halini koy.
      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));
      //* c) Statei güncelle
      setBasket(newBasket);

      toast.info(`Ürün miktarı azaltıldı.(${updated.amount})`);
    } else {
      removeFromBasket(delete_id);
    }
  };
  console.log(basket);
  //* Toplam ürün sayısı
  const totalAmount = basket.reduce((total, i) => total + i.amount, 0);
  console.log(totalAmount);
  return (
    <BasketContext.Provider
      value={{
        addToBasket,
        basket,
        decreaseAmount,
        removeFromBasket,
        totalAmount,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
