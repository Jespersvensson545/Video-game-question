import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ImageUpload from "../components/ImageUpload"

const Home = () => {
    const [name, setName] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!name) return
        const formData = new FormData()
        formData.append("name", name)
        if(image) formData.append("image", image)

        const res = await axios.post("http://localhost:5000/api/users", formData)
        localStorage.setItem("userId", res.data.id)
        navigate("/quiz")
    }

return (
    <div className="home">
        <h2>Skapa din profil</h2>
        <input
         type="text"
         placeholder="Ditt namn"
         value={name}
         onChange={e => setName(e.target.value)}
         />
         <ImageUpload onUpload={(file) => setImage(file)} />
         <button onClick={handleSubmit}>Starta quiz</button>
    </div>
)

}

export default Home
