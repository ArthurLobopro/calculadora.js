"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSVG = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function loadSVG(...PathSegments) {
    return fs_1.default.readFileSync(path_1.default.resolve(...PathSegments), { encoding: "utf-8" });
}
exports.loadSVG = loadSVG;
