const fs = require('fs');
const path = require('path');

// Caminho do arquivo de notas
const notesFilePath = path.join(__dirname, 'notas.txt');

// Carregar notas ao iniciar
window.onload = () => {
    if (fs.existsSync(notesFilePath)) {
        const notes = fs.readFileSync(notesFilePath, 'utf-8');
        document.getElementById('notepad').value = notes;
    }
};

// Salvar notas automaticamente quando o conteúdo mudar
document.getElementById('notepad').addEventListener('input', () => {
    const notes = document.getElementById('notepad').value;
    fs.writeFileSync(notesFilePath, notes);
});
const { ipcRenderer } = require('electron');

// Função para obter o caminho da imagem do processo principal
async function loadImage() {
    const imagePath = await ipcRenderer.invoke('get-image-path');
    
    // Verifica se o caminho da imagem foi retornado corretamente
    if (imagePath !== 'Imagem não encontrada') {
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = "Imagem carregada";
        imgElement.width = 500; // Ajuste o tamanho da imagem conforme necessário

        // Adiciona a imagem ao corpo da página
        document.body.appendChild(imgElement);
    } else {
        console.log(imagePath);
    }
}

// Chama a função para carregar a imagem
loadImage();
