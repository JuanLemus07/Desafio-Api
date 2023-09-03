const btn = document.getElementById("btn");
//const moneda = document.getElementById("monedas").options.value;

async function getApiInfo(moneda){
  try {
    const data = await fetch(`https://mindicador.cl/api/${moneda}`)
    //const data = await fetch("https://mindicador.cl/api/dolar");
    const json = await data.json();
    return json;
        

  } catch (error) {
    console.log('Error en getApiInfo', error);
    const divError = document.getElementById("error");
    divError.innerHTML = "<h1>En este momento el servidor no esta disponible</h1>";
        
  }
}
//getApiInfo()

btn.addEventListener("click", async () =>{
  const moneda = document.querySelector("#monedas").value;
  const precioCLP = Number(document.getElementById("input1").value);
  const resultado1 = document.getElementById("resultado1");
  const canvas = document.getElementById("grafico");

  const infoApi = await getApiInfo(moneda);
  const calculo = precioCLP / infoApi.serie[0].valor;
  resultado1.innerHTML = calculo;

  const fechas = infoApi.serie.map(elemen => elemen.fecha.slice(0,10)).reverse();
  const precioUsd = infoApi.serie.map(elemen => elemen.valor).reverse();

  const grafica = {
    type: "line",
    data: {
      labels: fechas,
      datasets: [{
        label: `${moneda.charAt(0).toUpperCase()+moneda.slice(1)}`,
        backgroundColor: "red",
        data: precioUsd,
      }]
    }
  }
    new Chart(canvas,grafica)
});