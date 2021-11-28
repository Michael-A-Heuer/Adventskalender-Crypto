const QRCode = require('qrcode')
const ethers = require('ethers')
const poaps = require('./poap_claim_codes/poap.json')
const fs = require('fs')

var wallets = {}
var disperseInput = {}

const xdai = 2.0

for (let i = 1; i <= poaps.length; i++) {

    let wallet = ethers.Wallet.createRandom();

    wallets[i] = {
        'address': wallet.address,
        'publicKey': wallet.publicKey,
        'privateKey': wallet.privateKey,
        'mnemonic':wallet.mnemonic
    }

    disperseInput[wallet.address] = xdai

    QRCode.toFile('./artifacts/qrcodes/mnemonic_'+i+'.png', wallet.mnemonic.phrase)
    QRCode.toFile('./artifacts/qrcodes/poap_'+i+'.png', poaps[i-1])
}

fs.writeFile('./artifacts/wallets.json', JSON.stringify(wallets), (err) => {
    if (err) throw err;
})

fs.writeFile('./artifacts/addresses.json', JSON.stringify(disperseInput), (err) => {
    if (err) throw err;
})

QRCode.toFile('./artifacts/qrcodes/website.png', "https://michael-a-heuer.github.io/Adventskalender-Crypto/")

QRCode.toFile('./artifacts/qrcodes/alphawallet.png', "https://alphawallet.com/download-alphawallet-app/")
