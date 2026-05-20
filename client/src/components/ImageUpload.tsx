import React, { useState } from 'react'

interface Props {
    onUpload: (file: File) => void
}

const ImageUpload = ({ onUpload }: Props) => {
    const [preview, setPreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPreview(URL.createObjectURL(file))
        onUpload(file)
    }

    return (
        <div className="image-upload">
            <label htmlFor="upload">Ladda upp profilbild</label>
            <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleChange}
            />
            {preview && <img src={preview} alt="Förhandsgranskning" />}
        </div>
    )
}

export default ImageUpload
