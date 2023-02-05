const SYMBOLS = {
    ID: Symbol("id"),
    NAME: Symbol("name"),
    PRICE: Symbol("price"),
    BRAND: Symbol("brand"),
    IMG: Symbol("img"),
    PRODUCTS_LIST: Symbol("product-list")
}

const geraId = {
    _id:0,
    get id(){
        return ++this._id;
    }
}

function updatePricesInHtml(total, type) {
    const totalSpan = document.querySelector(`.${type} span`);
    const formatedTotal = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    totalSpan.innerHTML = formatedTotal;
  }

function callToast(text, colorFrom = "#00b09b", colorTo="#96c93d", position = "left"){
    Toastify({
        text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function validDescount(campo, msg, valid){
  document.querySelector(".cupomDiv")?.remove()
  const div = document.createElement("div")
  div.innerHTML = msg
  div.classList.add("cupomDiv")
  
  if(valid){
    div.classList.add("valid-true")
    campo.classList.remove("inputError")
  }else{
    div.classList.add("valid-false")
    campo.classList.add("inputError")
  }
  
  
  campo.parentElement.insertAdjacentElement("afterend", div)
}


export { geraId, SYMBOLS, callToast , updatePricesInHtml, validDescount}