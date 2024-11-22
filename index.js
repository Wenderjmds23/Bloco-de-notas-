const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, 
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('save-file', async (event, content) => {
    const result = await dialog.showSaveDialog({
        title: 'Salvar arquivo',
        defaultPath: path.join(__dirname, 'documento.txt'),
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    });

    if (!result.canceled && result.filePath) {
        fs.writeFileSync(result.filePath, content);
        return result.filePath;
    }
    return null;
});

ipcMain.handle('open-file', async () => {
    const result = await dialog.showOpenDialog({
        title: 'Abrir arquivo',
        filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const content = fs.readFileSync(result.filePaths[0], 'utf-8');
        return content;
    }
    return null;
});


ipcMain.handle('get-image-path', () => {
    const imagePath = path.join(__dirname, 'assets', 'imagem.jpg');
    
    if (fs.existsSync(imagePath)) {
        return imagePath; 
    } else {
        return 'Imagem não encontrada';
    }
});
