import { salvarInscricaoFirebase, escutarConfirmados } from "./inscricoes-service.js";
import { collection, onSnapshot } from "firebase/firestore";


const form = document.getElementById("formBarretos");
const setorSelect = document.getElementById("setorShow");
const modalidadeSelect = document.getElementById("modalidadeIngresso");
const querCampingCheckbox = document.getElementById("querCamping");
const secaoCamping = document.getElementById("secaoCamping");
const tamanhoBarracaSelect = document.getElementById("tamanhoBarraca");
const valorTotalSpan = document.getElementById("valorTotal");
const listaConfirmadosDiv = document.getElementById("listaConfirmados");

const PRECOS_SETORES = {
    PISTA: 200,
    PISTA_PRIME: 590,
    PISTA_GOLD: 789,
    ARQUIBANCADA_SUP: 235,
    ARQUIBANCADA_INF: 350,
    BACKSTAGE: 900,
    CAMAROTE_BRAHMA: 1300
};

const PRECOS_BARRACAS = { P: 80, M: 140, G: 200 };

querCampingCheckbox.addEventListener("change", () => {
    secaoCamping.classList.toggle("hidden", !querCampingCheckbox.checked);
    calcularTotal();
});

[setorSelect, modalidadeSelect, tamanhoBarracaSelect].forEach(el => {
    el.addEventListener("change", calcularTotal);
});

function calcularTotal() {
    let valorDia = PRECOS_SETORES[setorSelect.value] || 0;
    let total = modalidadeSelect.value === "COMBO" ? valorDia * 10 : valorDia;

    if (querCampingCheckbox.checked) {
        total += PRECOS_BARRACAS[tamanhoBarracaSelect.value] || 0;
    }

    valorTotalSpan.textContent = total.toFixed(2).replace(".", ",");
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nomeCompleto").value,
        cidade: document.getElementById("cidadeOrigem").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        sexo: document.getElementById("sexo").value,
        setor: setorSelect.options[setorSelect.selectedIndex].text,
        modalidade: modalidadeSelect.options[modalidadeSelect.selectedIndex].text,
        camping: querCampingCheckbox.checked ? tamanhoBarracaSelect.value : "Não",
        valorTotal: valorTotalSpan.textContent,
        dataCriacao: new Date()
    };

    try {
        await salvarInscricaoFirebase(dados);
        alert("Inscrição realizada com sucesso!");
        form.reset();
        secaoCamping.classList.add("hidden");
        calcularTotal();
    } catch (error) {
        alert("Erro ao salvar inscrição. Verifique o console.");
    }
});

escutarConfirmados((participantes) => {
    listaConfirmadosDiv.innerHTML = "";

    if (participantes.length === 0) {
        listaConfirmadosDiv.innerHTML = "<p style='text-align:center;'>Nenhum participante confirmado ainda.</p>";
        return;
    }

    participantes.forEach(p => {
        const card = document.createElement("div");
        card.style.cssText = "padding: 12px; margin-bottom: 10px; border-radius: 6px; background: rgba(255,255,255,0.05);";
        card.innerHTML = `
            <strong>${p.nome}</strong> (${p.cidade || 'Cidade não informada'}) - <span style="color: #f39c12;">${p.setor}</span><br>
            <small>Modalidade: ${p.modalidade} | Camping: ${p.camping}</small>
        `;
        listaConfirmadosDiv.appendChild(card);
    });
});