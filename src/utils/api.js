import axios from "axios";
//* axiosun ayarlarını bizim belirlediğimiz bir örneğini oluşturmaya yarar
const api = axios.create({
  //* Yapılacak olan bütün isteklerin başına baseURL içerisindeki değişkeni aktaracaktır.
  baseURL: "https://fakestoreapi.com/",
  // timeout: 4000, Belirlenen süre içinde isteğe bir yanıt gelmezse,axios otomatik olarak isteği iptal eder
});
export default api;
