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

  public async getInformations(): Promise<FrenchPhoneInformations> {
    const info: FrenchPhoneInformations = {}
    info.input = this.input
    info.formated = this.pn.getNumber()
    if (this.pn.isMobile()) {
      const urlMobile =
        'https://www.recherche-inverse.com/annuaire-inverse-portable/'
      const response: any = await Rq(urlMobile + this.input)
      const $ = Cheerio.load(response)

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
    } else {
      const urlFixe =
        'https://www.recherche-inverse.com/annuaire-inverse-fixe/'
      const response: any = await Rq(urlFixe + this.input)
      const $ = Cheerio.load(response)

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
    }
    return info
  }
}
