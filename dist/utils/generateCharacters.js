"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCharacters = void 0;
const generateRandomCharacters = () => {
    let result = [];
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
};
exports.generateRandomCharacters = generateRandomCharacters;
//# sourceMappingURL=generateCharacters.js.map