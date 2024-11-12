import { useState } from "react";

import LoginModal from "./LoginModal";
import ThemeModal from "./ThemeModal";
import WarningModal from "./WarningModal";
import Modal from "./Modal";
import Login from "./Login";

const App = () => {
  const [isOpen, setIsOpen] = useState(null);

  const close = () => setIsOpen(null);

  return (
    <div className="p-5">
      <div className="d-flex justify-content-center gap-4 my-4">
        <button className="bg-danger" onClick={() => setIsOpen("login")}>
          Giriş Yap
        </button>
        <button className="bg-warning" onClick={() => setIsOpen("darkmode")}>
          Tema Seç
        </button>
        <button className="bg-primary" onClick={() => setIsOpen("warning")}>
          Uyarı Fırlat
        </button>
      </div>
      {/* 
    * 1.Yol
    > Normal componentler oluşturduk.
    > Amacımıza ulaştık.
    > Çok fazla kod tekrarı yapıldı.
    */}
      {/* {isOpen === "login" ? (
        <LoginModal close={() => setIsOpen(false)} />
      ) : isOpen === "darkmode" ? (
        <ThemeModal close={() => setIsOpen(false)} />
      ) : isOpen === "warning" ? (
        <WarningModal close={() => setIsOpen(false)} />
      ) : (
        ""
      )} */}

      {/* 
        2.Yol
        > Kod tekrarını önlemek için HOC kullandık.
      */}
      {isOpen === "login" ? (
        <Modal close={close}>
          <Login />
        </Modal>
      ) : isOpen === "darkmode" ? (
        <Modal close={close}>
          <h2>Zevkinize Uygun temayı seçiniz!</h2>

          <select className="form-select my-4">
            <option>Koyu</option>
            <option>Açık</option>
            <option>Kırmızı</option>
            <option>Mavi</option>
          </select>
        </Modal>
      ) : isOpen === "warning" ? (
        <Modal close={close}>
          <h2>İşlem başarısız oldu!</h2>
          <p>Yapılan veri çekme isteği 404 kod ile hata oluşturdu.</p>
          <p>Lütfen tekrar deneyiniz.</p>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
