import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { useEffect, useState } from "react";
import { db } from "./data/db";
function App() {
  const initialCart = ()=>{

    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart):[]
    {/* NOTA ==> Si en el localstorage hay cosas guardadas en el cart va a inicializar con lo que hay en el storage, si no con []*/}
  }
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  {
    /* NOTA ==> una vez que el cart se actualice ejecuta el localstorage setitem */
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      {
        /* NOTA ==> Para no modificar el estado y solo actualizarlo (mutar/inmutar) se hace una copia y se agrega la copia con el set */
      }
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }
  function removeFromCart(id) {
    {
      /* NOTA ==> Muestrame y setea todas las guitarras donde el filtro sea guitar id distinto a la id que me das
  para así eliminar las guitarras que no quiero */
    }
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id != id));
  }
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      {/* NOTA ==> Envía el cart al header y allí lo obtiene mediante argumento/prop, debe tener el mismo nombre de prop en ambos lados
    si se llama cart= aqui en el otro lado debe llamarse cart tambien */}
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* NOTA ==> El data es el json llamado guitar, itera cada uno y lo asigna en un prop llamado guitar que después ese prop lo recibe en su componente */}
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
