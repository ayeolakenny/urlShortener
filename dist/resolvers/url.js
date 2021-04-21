"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UrlResolver = void 0;
const Url_1 = require("../entities/Url");
const type_graphql_1 = require("type-graphql");
const generateCharacters_1 = require("../utils/generateCharacters");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let baseUrl = process.env.BASE_URL;
let UrlResolver = class UrlResolver {
    shortenURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let randomCharacter = generateCharacters_1.generateRandomCharacters();
            let originalUrl = url;
            const checkIfCharacterExist = yield Url_1.UrlModel.findOne({ randomCharacter });
            if (checkIfCharacterExist) {
                randomCharacter = generateCharacters_1.generateRandomCharacters();
            }
            if (!originalUrl.includes("https")) {
                originalUrl = `https://${originalUrl}`;
            }
            if (!originalUrl.includes(".com")) {
                originalUrl = `${originalUrl}.com`;
            }
            const shortUrl = `${baseUrl}/i/${randomCharacter}`;
            const newUrl = new Url_1.UrlModel({
                originalUrl,
                randomCharacter,
                shortUrl,
            });
            yield newUrl.save();
            return shortUrl;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String, { nullable: true }),
    __param(0, type_graphql_1.Arg("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "shortenURL", null);
UrlResolver = __decorate([
    type_graphql_1.Resolver(() => Url_1.Url)
], UrlResolver);
exports.UrlResolver = UrlResolver;
//# sourceMappingURL=url.js.map