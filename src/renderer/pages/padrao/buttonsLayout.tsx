import { resolve } from "path"
import { assetsPath } from "../../../Util"

export const buttons = [
    { value: "MC", content: "MC" },
    { value: "MR", content: "MR" },
    { value: "M-", content: "M-" },
    { value: "M+", content: "M+" },

    { value: "%", content: "%" },
    { value: "Delete", content: "CE" },
    { value: "Escape", content: "C" },
    { value: "Backspace", content: <img src={resolve(assetsPath, "keyboard/delete.svg")} height={24} alt="Apagar" /> },

    { value: "^", content: "x²" },
    { value: "sqrt", content: <img src={resolve(assetsPath, "keyboard/sqrt.png")} height="14" alt="Raíz" /> },
    { value: "1/x", content: <img src={resolve(assetsPath, "keyboard/one-divided-by.svg")} alt="Um dividido por" /> },
    { value: "/", content: "/" },

    { value: "7", content: "7" },
    { value: "8", content: "8" },
    { value: "9", content: "9" },
    { value: "*", content: "x" },

    { value: "4", content: "4" },
    { value: "5", content: "5" },
    { value: "6", content: "6" },
    { value: "-", content: "-" },

    { value: "1", content: "1" },
    { value: "2", content: "2" },
    { value: "3", content: "3" },
    { value: "+", content: "+" },

    { value: "-or+", content: <img src={resolve(assetsPath, "keyboard/negative-or-positive.png")} /> },
    { value: "0", content: "0" },
    { value: ",", content: "," },
    { value: "Enter", content: "=" },
]