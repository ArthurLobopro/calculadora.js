const { version } = require("./package.json")
const { execSync } = require("child_process")
const path = require("path")

const icon_path = path.join(__dirname, "build/icon")

module.exports = {
    packagerConfig: {
        icon: icon_path,
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
                setupIcon: icon_path,
                iconURL: icon_path,
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
                name: calculadora.js,
                productName: "Calculadora.js",
                categories: [
                    "Utility"
                ],
                description: "Calculadora simples feita com electron",
                genericName: "Calculadora",
                icon: icon_path
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
