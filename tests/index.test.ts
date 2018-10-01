import { expect } from 'chai'
import * as fs from 'fs'
import 'mocha'
import * as sinon from 'sinon'
import {FrenchPhoneInfoError, FrenchPhoneInfoGetter, FrenchPhoneInformations} from '../index'

let htmlFix: string
let htmlMobile: string

let stub: sinon.SinonStub

describe('Test MailBoxLayer class', () => {
    before( async () => {

        htmlFix = await new Promise((resolve) => {
            fs.readFile(__dirname + '/html/fix.html',(err,data) => {
                expect(err).to.be.null
                resolve(data.toString())
            })
        }) as string

        htmlMobile = await new Promise((resolve) => {
            fs.readFile(__dirname + '/html/mobile.html',(err,data) => {
                expect(err).to.be.null
                resolve(data.toString())
            })
        }) as string
    })

    afterEach(() => {
        stub.restore()
    })

    it('should return phone informations', async () => {
        const fpig = new FrenchPhoneInfoGetter('0473512671')
        stub = sinon.stub(fpig, 'requestFixHTML').resolves(htmlFix)
        const t = await fpig.getInformation()
        expect(t.danger).to.eql(0)
        expect(t.formatted).to.eql('+33473512671')
        expect(t.input).to.eql('0473512671')
        expect(t.isMobile).to.be.false
        expect(t.operator).to.eql('')
    })

    it('should return mobile phone informations', async () => {
        const fpig = new FrenchPhoneInfoGetter('0782301615')
        stub = sinon.stub(fpig, 'requestMobileHTML').resolves(htmlMobile)
        const t = await fpig.getInformation()
        expect(t.danger).to.eql(0)
        expect(t.formatted).to.eql('+33782301615')
        expect(t.input).to.eql('0782301615')
        expect(t.isMobile).to.be.true
        expect(t.operator).to.eql('free mobile')
    })

    it('should throw an error if phone number is not valid',() => {
        let error: FrenchPhoneInfoError | undefined

        try {
            new FrenchPhoneInfoGetter('635244')
        } catch (err) {
            error = err
        }

        expect(error).not.to.be.undefined
    })
})
