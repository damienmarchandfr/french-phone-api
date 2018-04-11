"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cheerio = require('cheerio');
var Rq = require('request-promise');
var PhoneNumber = require('awesome-phonenumber');
var FrenchPhoneInformations = (function () {
    function FrenchPhoneInformations() {
    }
    return FrenchPhoneInformations;
}());
exports.FrenchPhoneInformations = FrenchPhoneInformations;
var FrenchPhoneInfoError = (function (_super) {
    __extends(FrenchPhoneInfoError, _super);
    function FrenchPhoneInfoError(message) {
        return _super.call(this, message) || this;
    }
    return FrenchPhoneInfoError;
}(Error));
exports.FrenchPhoneInfoError = FrenchPhoneInfoError;
var FrenchPhoneInfoGetter = (function () {
    function FrenchPhoneInfoGetter(phone) {
        this.pn = new PhoneNumber(phone, 'FR');
        if (!this.pn.isValid()) {
            throw new FrenchPhoneInfoError('Phone number is not valid');
        }
        this.input = phone.trim();
    }
    FrenchPhoneInfoGetter.prototype.getInformations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, urlMobile, response, $, urlFixe, response, $;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        info = {};
                        info.input = this.input;
                        info.formated = this.pn.getNumber();
                        if (!this.pn.isMobile()) return [3, 2];
                        urlMobile = 'https://www.recherche-inverse.com/annuaire-inverse-portable/';
                        return [4, Rq(urlMobile + this.input)];
                    case 1:
                        response = _a.sent();
                        $ = Cheerio.load(response);
                        info.isMobile =
                            $('.num_type')
                                .find('.value')
                                .text()
                                .trim() === 'Numéro mobile';
                        info.danger = parseInt($('.dangerousness')
                            .text()
                            .split('\n')[2]
                            .replace(/\s/g, '')
                            .trim(), 10);
                        info.operator = $('.num_operator')
                            .find('.value')
                            .text()
                            .toLowerCase()
                            .trim();
                        info.formated = $('.abroad')
                            .find('.value')
                            .text()
                            .replace(/\s/g, '')
                            .trim();
                        return [3, 4];
                    case 2:
                        urlFixe = 'https://www.recherche-inverse.com/annuaire-inverse-fixe/';
                        return [4, Rq(urlFixe + this.input)];
                    case 3:
                        response = _a.sent();
                        $ = Cheerio.load(response);
                        info.isMobile =
                            $('.num_type')
                                .find('.value')
                                .text()
                                .trim() === 'Numéro mobile';
                        info.danger = parseInt($('.dangerousness')
                            .text()
                            .split('\n')[2]
                            .replace(/\s/g, '')
                            .trim(), 10);
                        info.operator = $('.num_operator')
                            .find('.value')
                            .text()
                            .toLowerCase()
                            .trim();
                        info.formated = $('.abroad')
                            .find('.value')
                            .text()
                            .replace(/\s/g, '')
                            .trim();
                        _a.label = 4;
                    case 4: return [2, info];
                }
            });
        });
    };
    return FrenchPhoneInfoGetter;
}());
exports.FrenchPhoneInfoGetter = FrenchPhoneInfoGetter;
