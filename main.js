const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }// Esta função envia o caminho da imagem para o frontend via IPC
ipcMain.handle('get-image-path'), () => {
    // Caminho do arquivo de imagem
    const imagePath = path.join(__dirname, 'assets', 'imagem.jpg');
}
    // Verifica se o arquivo existe
    if (fs.existsSync(imagePath)) {
        return imagePath; // Retorna o caminho da imagem
    } else {
        return 'Imagem não encontrada';
    }
});
