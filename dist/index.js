"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cheerio = require('cheerio');
const Rq = require('request-promise');
const PhoneNumber = require('awesome-phonenumber');
class FrenchPhoneInformations {
}
exports.FrenchPhoneInformations = FrenchPhoneInformations;
class FrenchPhoneInfoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.FrenchPhoneInfoError = FrenchPhoneInfoError;
class FrenchPhoneInfoGetter {
    constructor(phone) {
        this.pn = new PhoneNumber(phone, 'FR');
        // if not valid throw error
        if (!this.pn.isValid()) {
            throw new FrenchPhoneInfoError('Phone number is not valid');
        }
        this.input = phone.trim();
    }
    requestMobileHTML(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlMobile = 'https://www.recherche-inverse.com/annuaire-inverse-portable/';
            return yield Rq(urlMobile + input);
        });
    }
    requestFixHTML(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlFixe = 'https://www.recherche-inverse.com/annuaire-inverse-fixe/';
            return yield Rq(urlFixe + input);
        });
    }
    getInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            // Mobile phone
            if (this.pn.isMobile()) {
                const response = yield this.requestMobileHTML(this.input);
                return this.parseMobileHTML(response);
            }
            else {
                const response = yield this.requestFixHTML(this.input);
                return this.parseFixHTML(response);
            }
        });
    }
    parseMobileHTML(html) {
        const $ = Cheerio.load(html);
        const info = {};
        info.input = this.input;
        info.formatted = this.pn.getNumber();
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
        info.formatted = $('.abroad')
            .find('.value')
            .text()
            .replace(/\s/g, '')
            .trim();
        return info;
    }
    parseFixHTML(html) {
        const $ = Cheerio.load(html);
        const info = {};
        info.input = this.input;
        info.formatted = this.pn.getNumber();
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
        info.formatted = $('.abroad')
            .find('.value')
            .text()
            .replace(/\s/g, '')
            .trim();
        return info;
    }
}
exports.FrenchPhoneInfoGetter = FrenchPhoneInfoGetter;
