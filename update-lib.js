const { exec } = require('child_process');
const path = require("path");

console.log("===Instalando dependências===");

const packages = [
    "https://github.com/ArthurLobopro/time-converter",
    "./src/lib"
]

exec(`yarn add ${packages.join(' ')} --cwd ${__dirname}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
    }
    if(stdout){
        console.log(stdout);
    }
    console.log("==Tudo pronto para começar==")
});