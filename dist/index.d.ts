export declare class FrenchPhoneInformations {
    isMobile?: boolean;
    danger?: number;
    operator?: string;
    formatted?: string;
    input?: string;
}
export declare class FrenchPhoneInfoError extends Error {
    constructor(message?: string);
}
export declare class FrenchPhoneInfoGetter {
    readonly input: string;
    private pn;
    constructor(phone: string);
    requestMobileHTML(input: string): Promise<string>;
    requestFixHTML(input: string): Promise<string>;
    getInformation(): Promise<FrenchPhoneInformations>;
    private parseMobileHTML;
    private parseFixHTML;
}
