export default function Guitar({ guitar, addToCart }) {
  const { name, price, description, image } = guitar;

 
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.png`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3 price-color">{price}$</p>
        {/* NOTA ==> Si no ponemos ()=> delante la función se llama sola sin hacer click */}
        <button
          onClick={() => addToCart (guitar)}
          type="button"
          className="btn boton-agregar w-100"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
