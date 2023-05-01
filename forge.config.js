const { version } = require("./package.json")
const { execSync } = require("child_process")
const path = require("path")

const windows_icon_path = path.join(__dirname, "build/icon.ico")
const linux_icon_path = path.join(__dirname, "assets/icon.png")

module.exports = {
    packagerConfig: {
        icon: windows_icon_path,
        ignore: [
            "\\.git",
            "\\.scss",
            "\\.vscode",
            "\\.ts",
            "yarn",
            "/build",
        ]
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "calculadora.js",
                setupIcon: windows_icon_path,
                iconURL: windows_icon_path,
                setupExe: `calculadora.js-${version}-setup.exe`
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            platforms: [
                "linux"
            ],
            config: {
                name: "calculadora.js",
                productName: "Calculadora.js",
                categories: [
                    "Utility"
                ],
                description: "Calculadora simples feita com electron",
                genericName: "Calculadora",
                icon: linux_icon_path
            }
        },
        {
            name: "@electron-forge/maker-rpm",
            platforms: [],
            config: {}
        }
    ],
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "ArthurLobopro",
                    name: "calculadora.js"
                },
                prerelease: false,
                draft: true
            }
        }
    ],
    hooks: {
        async generateAssets() {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log("Compiling TypeScript...")
                    execSync("yarn tsc")
                    console.log("Compiling SASS...")
                    execSync("yarn sass-compiler --compile")
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
