import { NextApiRequest, NextApiResponse } from 'next';
import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import path from 'path';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { w, h, t, bg, c } = req.query;

    if (!w || !h) {
        return res.status(400).json({ error: 'Width and height are required' });
    }

    const width = parseInt(w as string, 10);
    const height = parseInt(h as string, 10);
    const text = (t as string) || `${width}x${height}`;
    const bgColor = `#${(bg as string) || 'cccccc'}`;
    const textColor = `#${(c as string) || '333333'}`;

    try {
        // Load the font data
        const fontPath = path.join(process.cwd(), '/public/fonts/roboto-regular.ttf');
        const fontData = fs.readFileSync(fontPath);

        // Generate image response using @vercel/og
        return new ImageResponse(
            (
                <div
                    style={{
            display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: bgColor,
                color: textColor,
        }}
    >
        <h1 style={{ fontSize: `${Math.min(width, height) / 5}px`, fontFamily: 'Roboto, sans-serif' }}>
        {text}
        </h1>
        </div>
    ),
        {
            width,
                height,
                fonts: [
            {
                name: 'Roboto',
                data: fontData,
                style: 'normal',
            },
        ],
        }
    );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating image' });
    }
}
