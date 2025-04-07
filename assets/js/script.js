// Elementos do DOM
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");
const dataEl = document.getElementById("data");
const diaSemanaEl = document.getElementById("dia-semana");
const toggleTemaBtn = document.getElementById("toggle-tema");
const toggleFormatoBtn = document.getElementById("toggle-formato");

// Estado da aplicação
let formato24h = true;
let darkMode = false;

// Dias da semana em português
const diasSemana = [
    "Domingo", "Segunda-feira", "Terça-feira", 
    "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
];

// Meses em português
const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Função para atualizar o relógio
function atualizarRelogio() {
    const agora = new Date();
    
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();
    
    // Formatar para AM/PM se necessário
    let periodo = "";
    if (!formato24h) {
        periodo = horas >= 12 ? " PM" : " AM";
        horas = horas % 12;
        horas = horas ? horas : 12; // 0 deve ser 12 no formato 12h
    }
    
    // Adicionar zero à esquerda se necessário
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    
    // Atualizar os elementos do relógio
    horasEl.textContent = horas;
    minutosEl.textContent = minutos;
    segundosEl.textContent = segundos;
    
    // Adicionar o período (AM/PM) se estiver no formato 12h
    if (!formato24h) {
        horasEl.textContent = horas;
if (!formato24h) {
    const periodoEl = document.createElement('span');
    periodoEl.className = 'periodo';
    periodoEl.textContent = periodo;
    horasEl.appendChild(periodoEl);
}
    }
    
    // Atualizar a data
    const dia = agora.getDate();
    const mes = agora.getMonth();
    const ano = agora.getFullYear();
    const diaSemana = agora.getDay();
    
    dataEl.textContent = `${dia} de ${meses[mes]} de ${ano}`;
    diaSemanaEl.textContent = diasSemana[diaSemana];
    
    // Efeito de pulso nos segundos
    segundosEl.classList.add("pulse");
    setTimeout(() => {
        segundosEl.classList.remove("pulse");
    }, 500);
}

// Alternar entre modo claro e escuro
toggleTemaBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkMode = !darkMode;
    
    // Atualizar ícone do botão
    toggleTemaBtn.innerHTML = darkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Alternar entre formato 12h e 24h
toggleFormatoBtn.addEventListener("click", () => {
    formato24h = !formato24h;
    toggleFormatoBtn.textContent = formato24h ? "24h" : "12h";
    atualizarRelogio(); // Atualizar imediatamente para refletir a mudança
});

// Inicializar o relógio e configurar a atualização a cada segundo
atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// Adicionar animação CSS para o pulso dos segundos
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
.pulse {
    animation: pulse 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
