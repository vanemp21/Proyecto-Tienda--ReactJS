import { useMemo } from "react";

export default function Header({ cart, removeFromCart, increaseQuantity,decreaseQuantity,clearCart }) {
  {
    /* NOTA ==> No hagas render completo de mi aplicacion hasta que no cambie el cart (eso para el usememo) */
  }
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  //el isempty se va a ejecutar solo cuando el carrito ha sido modificado, añadido elementos y tal
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );
  {
    /* NOTA ==> El .reduce pilla todos los numeros del array, devuelve lo que la función le diga 
reduce los valores a un solo elemento y empieza en 0*/
  }
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito está vacío</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>

                            <td className="flex align-items-start gap-4">
                              <button onClick={()=>decreaseQuantity(guitar.id)}
                              type="button" className="btn btn-dark">
                                -
                              </button>
                              {guitar.quantity}
                              <button  onClick={()=>increaseQuantity(guitar.id)}
                              type="button" className="btn btn-dark">
                                +
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-danger" type="button"
                              onClick={()=> removeFromCart(guitar.id)}>
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">{cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
