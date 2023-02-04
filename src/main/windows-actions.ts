import { app } from 'electron'
import path from "path"

const appPath = app.getAppPath()

export function setWindowsJumplist() {
    app.setJumpList([
        {
            name: "Calculadoras",
            type: "custom",
            items: [
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --bases",
                    iconPath: path.resolve(appPath, "assets/binary.png"),
                    iconIndex: 0,
                    title: 'Bases',
                    description: 'Calculadora de bases decimais'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --data",
                    title: 'Data',
                    description: 'Calculadora de Data'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --equacao",
                    title: 'Eq. de 2° Grau',
                    description: 'Calculadora de equação de 2° grau'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --padrao",
                    title: 'Padrão',
                    description: 'Calculadora Padrão'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --time",
                    title: 'Tempo',
                    description: 'Calculadora de Tempo'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --pa",
                    title: 'Gerador de PA',
                    description: 'Gerador de Progressão Aritimética'
                },
                {
                    type: "task",
                    program: process.execPath,
                    args: ". --pg",
                    title: 'Gerador de PG',
                    description: 'Gerador de Progressão Geométrica'
                }
            ]
        }
    ])
}