import { db } from "./firebase-config.js";
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const COLECAO_INSCRICOES = "inscricoes";

export async function salvarInscricaoFirebase(dados) {
    try {
        const docRef = await addDoc(collection(db, COLECAO_INSCRICOES), dados);
        return docRef.id;
    } catch (e) {
        console.error("Erro ao salvar no Firestore: ", e);
        throw e;
    }
}

export function escutarConfirmados(callback) {
    const q = query(collection(db, COLECAO_INSCRICOES), orderBy("dataCriacao", "desc"));
    return onSnapshot(q, (snapshot) => {
        const confirmados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(confirmados);
    }, (error) => {
        console.error("Erro ao buscar confirmados:", error);
    });
}