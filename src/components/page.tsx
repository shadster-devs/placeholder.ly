'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Page() {
    const [width, setWidth] = useState(300)
    const [height, setHeight] = useState(150)
    const [text, setText] = useState('300x150')
    const [bgColor, setBgColor] = useState('cccccc')
    const [textColor, setTextColor] = useState('333333')
    const [url, setUrl] = useState('')

    useEffect(() => {
        const baseUrl = window.location.origin
        const imageUrl = `${baseUrl}/api/image/${width}/${height}?text=${encodeURIComponent(text)}&bg=${bgColor}&color=${textColor}`
        setUrl(imageUrl)
    }, [width, height, text, bgColor, textColor])

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Placeholder Image Generator</h1>
    <div className="grid grid-cols-2 gap-4">
    <div>
        <Label htmlFor="width">Width</Label>
        <Input
    id="width"
    type="number"
    value={width}
    onChange={(e) => setWidth(Number(e.target.value))}
    />
    </div>
    <div>
    <Label htmlFor="height">Height</Label>
        <Input
    id="height"
    type="number"
    value={height}
    onChange={(e) => setHeight(Number(e.target.value))}
    />
    </div>
    </div>
    <div>
    <Label htmlFor="text">Text</Label>
        <Input
    id="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    />
    </div>
    <div className="grid grid-cols-2 gap-4">
    <div>
        <Label htmlFor="bgColor">Background Color</Label>
    <Input
    id="bgColor"
    value={bgColor}
    onChange={(e) => setBgColor(e.target.value)}
    />
    </div>
    <div>
    <Label htmlFor="textColor">Text Color</Label>
    <Input
    id="textColor"
    value={textColor}
    onChange={(e) => setTextColor(e.target.value)}
    />
    </div>
    </div>
    <div className="p-4 bg-gray-100 rounded">
    <p className="text-sm font-mono break-all">{url}</p>
        </div>
        <div className="border border-gray-300 rounded p-4">
    <img src={url} alt="Generated Placeholder" className="mx-auto" />
        </div>
        </div>
)
}