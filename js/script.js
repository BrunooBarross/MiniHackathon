let lat = 0;
let long = 0;
let dadosApi = [];

function pegarLocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(salvarLocalizacao);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function salvarLocalizacao(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    buscarCidade();
}

function buscarCidade(){ 
    const resposta = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=306cba7453823da837a2dba4b11ef734`);
    resposta.then(renderizarTela);
    resposta.catch(erroNoGet); 
} 

function erroNoGet(){
    console.log('Deu erro na sua requisição');
}

function renderizarTela(array){
    dadosApi = array.data;
    let conteudo = document.querySelector('.conteudo');
    conteudo.innerHTML = ''
    let tempAtual = dadosApi.main.temp;    
    let tempMax = dadosApi.main.temp_max;
    let tempMin =  dadosApi.main.temp_min;
    tempAtual = tempAtual - 273,15;
    tempMax = tempMax - 273,15;
    tempMin = tempMin - 273,15;
    conteudo.innerHTML = `   
                    <div class="img">

                    </div>   
                    <div class="informacoes">
                        <div>                            
                            <span><strong>Cidade:</strong> ${dadosApi.name}</span>
                        </div>
                        <div>
                            <span><strong>Temperatura:</strong> ${tempAtual.toFixed(1)}°C</span>
                        </div>                       
                        <div>
                            <span><strong>Max:</strong> ${tempMin.toFixed(1)}°C</span>
                        </div>  
                        <div>
                            <span><strong>Min:</strong> ${tempMax.toFixed(1)}°C</span>
                        </div>
                        <div>
                            <span><strong>Umidade:</strong> ${dadosApi.main.humidity}%</span>
                        </div>                   
                    </div>     
                `;
}

