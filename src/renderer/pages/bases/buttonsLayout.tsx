import { assetsPath } from "../../../Util"
import { resolve } from "path"

export const buttons = [
    { value: "Delete", content: "CE" },
    { value: "Backspace", content: <img src={resolve(assetsPath, "keyboard/delete.svg")} alt="Apagar" /> },
    { value: "0", content: "0" },
    { value: "A", content: "A" },
    { value: "B", content: "B" },
    { value: "C", content: "C" },
    { value: "1", content: "1" },
    { value: "2", content: "2" },
    { value: "3", content: "3" },
    { value: "D", content: "D" },
    { value: "4", content: "4" },
    { value: "5", content: "5" },
    { value: "6", content: "6" },
    { value: "E", content: "E" },
    { value: "7", content: "7" },
    { value: "8", content: "8" },
    { value: "9", content: "9" },
    { value: "F", content: "F" }
]