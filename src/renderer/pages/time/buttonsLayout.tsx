import { assetsPath } from "../../../Util"
import { resolve } from "path"

export const buttons = [
    { value: "invert", content: <img src={resolve(assetsPath, "keyboard/revert.svg")} width="25px" alt="Inverter" /> },
    { value: "Delete", content: "CE" },
    { value: "Backspace", content: <img src={resolve(assetsPath, "keyboard/delete.svg")} alt="Apagar" /> },
    { value: "7", content: "7" },
    { value: "8", content: "8" },
    { value: "9", content: "9" },
    { value: "4", content: "4" },
    { value: "5", content: "5" },
    { value: "6", content: "6" },
    { value: "1", content: "1" },
    { value: "2", content: "2" },
    { value: "3", content: "3" },
    { value: "0", content: "0", double: true },
    { value: ",", content: "," },
]