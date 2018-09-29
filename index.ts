const Cheerio = require('cheerio')
const Rq = require('request-promise')
const PhoneNumber = require('awesome-phonenumber')

export class FrenchPhoneInformations {
  isMobile?: boolean
  danger?: number
  operator?: string
  formated?: string
  input?: string
}

export class FrenchPhoneInfoError extends Error {
  constructor(message?: string){
      super(message)
  }
}

export class FrenchPhoneInfoGetter {
  public readonly input: string
  private pn: any

  constructor(phone: string) {
    this.pn = new PhoneNumber(phone, 'FR')

    // if not valid throw error
    if (!this.pn.isValid()) {
      throw new FrenchPhoneInfoError('Phone number is not valid')
    }

    this.input = phone.trim()
  }

  public async requestMobileHTML(input: string): Promise<string>{
    const urlMobile =
    'https://www.recherche-inverse.com/annuaire-inverse-portable/'
    return await Rq(urlMobile + input)
  }

  public async requestFixHTML(input: string): Promise<string>{
    const urlFixe =
    'https://www.recherche-inverse.com/annuaire-inverse-fixe/'
    return await Rq(urlFixe + input)
  }

  public async getInformations(): Promise<FrenchPhoneInformations> {
    // Mobile phone
    if (this.pn.isMobile()) {
      const response = await this.requestMobileHTML(this.input)
      return this.parseMobileHTML(response)
    } else {
      const response = await this.requestFixHTML(this.input)
      return this.parseFixHTML(response)
    }
  }

  private parseMobileHTML(html: string): FrenchPhoneInformations{
    const $ = Cheerio.load(html)
    const info: FrenchPhoneInformations = {}

    info.input = this.input
    info.formated = this.pn.getNumber()

    info.isMobile =
      $('.num_type')
        .find('.value')
        .text()
        .trim() === 'Numéro mobile'

    info.danger = parseInt(
      $('.dangerousness')
        .text()
        .split('\n')[2]
        .replace(/\s/g, '')
        .trim(),
      10
    )

    info.operator = $('.num_operator')
      .find('.value')
      .text()
      .toLowerCase()
      .trim()

    info.formated = $('.abroad')
      .find('.value')
      .text()
      .replace(/\s/g, '')
      .trim()

    return info
  }

  private parseFixHTML(html: string): FrenchPhoneInformations {
    const $ = Cheerio.load(html)
    const info: FrenchPhoneInformations = {}

    info.input = this.input
    info.formated = this.pn.getNumber()

    info.isMobile =
      $('.num_type')
        .find('.value')
        .text()
        .trim() === 'Numéro mobile'

    info.danger = parseInt(
      $('.dangerousness')
        .text()
        .split('\n')[2]
        .replace(/\s/g, '')
        .trim(),
      10
    )

    info.operator = $('.num_operator')
      .find('.value')
      .text()
      .toLowerCase()
      .trim()

    info.formated = $('.abroad')
      .find('.value')
      .text()
      .replace(/\s/g, '')
      .trim()

    return info
  }

}
