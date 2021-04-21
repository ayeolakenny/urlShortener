"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openShortLink = void 0;
const Url_1 = require("../entities/Url");
const openShortLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { random_characters } = req.params;
    try {
        let url = yield Url_1.UrlModel.findOne({
            randomCharacter: random_characters,
        });
        if (url) {
            return res.redirect(301, url.originalUrl);
        }
        else {
            return res.status(404).json({ error: "Not found" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.openShortLink = openShortLink;
//# sourceMappingURL=url.controller.js.map