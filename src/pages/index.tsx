import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardCopy } from 'lucide-react'

const formatOptions = ["png", "jpeg", "webp"]

export default function Home() {
    const [width, setWidth] = useState(300)
    const [height, setHeight] = useState(150)
    const [text, setText] = useState('300x150')
    const [bgColor, setBgColor] = useState('#cccccc')
    const [textColor, setTextColor] = useState('#333333')
    const [format, setFormat] = useState('png')
    const [url, setUrl] = useState('')

    useEffect(() => {
        const baseUrl = window.location.origin
        const params = new URLSearchParams({
            w: width.toString(),
            h: height.toString(),
            t: text,
            bg: bgColor.replace('#', ''),
            c: textColor.replace('#', ''),
            fm: format
        })
        const imageUrl = `${baseUrl}/api/image?${params.toString()}`
        setUrl(imageUrl)
    }, [width, height, text, bgColor, textColor, format])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
    }

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">Placeholder.ly</h1>
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
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-grow"
                        />
                        <Input
                            id="bgColor"
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-10 h-10 p-1 rounded"
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="flex-grow"
                        />
                        <Input
                            id="textColor"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-10 h-10 p-1 rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="text">Text</Label>
                    <Input
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="format">Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select format"/>
                        </SelectTrigger>
                        <SelectContent>
                            {formatOptions.map((f) => (
                                <SelectItem key={f} value={f}>
                                    {f.toUpperCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex bg-gray-100 rounded overflow-hidden">
                <div className="flex-grow">
                    <p className="text-sm font-mono break-all p-4 space-x-2">{url}</p>
                </div>
                <Button onClick={copyToClipboard} className="h-auto p-4 bg-gray-950 border-l border-gray-300 rounded-none">
                    <ClipboardCopy className="h-4 w-4" color={'white'}/>
                </Button>
            </div>

            <div className="border border-gray-300 rounded p-4">
                <img src={url} alt="Generated Placeholder" className="mx-auto"/>
            </div>
        </div>
    )
}