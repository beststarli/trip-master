
const crypto = require('crypto')
const path = require('path')

function getFileName(buffer, url) {
    const hash = crypto.createHash('md5')
    hash.update(buffer)

    const fileName = `${hash.digest('hex')}${path.extname(url)}`
    return path.join(__dirname, 'images', fileName)
}

module.exports = { getFileName }