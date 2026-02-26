const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const axios = require('axios')
const fs = require('fs/promises')
const { getFileName } = require('./getFileName')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) =>
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    })
)

app.get('/download', async (req, res) => {
    const imageUrl = req.query.url

    if (!imageUrl) {
        return res.status(400).send('Missing image URL. Use query param `imageUrl` or `url`.')
    }

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        const imageBuffer = Buffer.from(response.data, 'binary')

        const fileName = getFileName(imageBuffer, imageUrl)
        await fs.writeFile(fileName, imageBuffer)

        res.send(`Image downloaded and saved as ${fileName}`)
    } catch (e) {
        console.error('Error downloading image:', e.message)
        res.status(500).send(`Failed to download image: ${e.message}`)
    }
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

module.exports = app;
