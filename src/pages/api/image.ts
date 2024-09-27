import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { w, h, t, bg, c, fm } = req.query

    if (!w || !h) {
        return res.status(400).json({ error: 'Width and height are required' })
    }

    const width = parseInt(w as string, 10)
    const height = parseInt(h as string, 10)
    const text = (t as string) || `${width}x${height}`
    const bgColor = `#${(bg as string) || 'cccccc'}`
    const textColor = `#${(c as string) || '333333'}`
    const format = (fm as string) || 'png'

    try {

        const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text
          x="50%"
          y="50%"
          font-family="'Arial', sans-serif"
          font-size="${Math.min(width, height) / 5}px"
          fill="${textColor}"
          text-anchor="middle"
          dominant-baseline="middle"
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
        >
          ${text}
        </text>
      </svg>
    `

        let image = sharp(Buffer.from(svg))

        switch (format) {
            case 'jpeg':
                image = image.jpeg()
                break
            case 'webp':
                image = image.webp()
                break
            default:
                image = image.png()
        }

        const buffer = await image.toBuffer()

        res.setHeader('Content-Type', `image/${format}`)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.send(buffer)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error generating image' })
    }
}