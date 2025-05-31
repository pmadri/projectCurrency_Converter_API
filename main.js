const apiKey = 'e51568986df5df19badee825';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

async function getExchangeRate(daMoeda, paraMoeda) {
    try{
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json();
        
        if (data.result === "success") {
            return data.conversion_rates[paraMoeda];
        }else {
            throw new Error("Erro ao buscar taxas de câmbio");
        }
    }catch(error) {
        console.error("Erro:", error);
        return null;
    }
}

document.getElementById("currency-form").addEventListener("submit", async function(event){
    event.preventDefault();

    const valor = document.getElementById('amount').value;
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;

    //Buscar taxa de cambio da API

    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);

    if(exchangeRate){
        const valorConvertido = valor * exchangeRate;
        const conversao = document.getElementById('conversao');
        conversao.textContent = `Resultado: ${valorConvertido.toFixed(2)} ${paraMoeda}`;
    }else{
        alert("Erro ao buscar taxa de câmbio. Tente novamente.");
    }
});