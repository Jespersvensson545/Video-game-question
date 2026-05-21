import { useEffect, useState } from "react"
import axios from "axios"
import PlayerCard from "../components/PlayerCard"
import type { User } from "../types.ts"

const Highscores = () => {
  const [users, setUsers] = useState<User[]>([])

  const getPlayers = async () => {
    const res = await axios.get("http://localhost:5000/api/users")
    const sorted = res.data.sort((a: User, b: User) => b.score - a.score)
    setUsers(sorted)
  }

  const deletePlayer = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`)
    getPlayers()
  }

  useEffect(() => {
    getPlayers()
  }, [])

  return (
    <div className="highscores">
      <h2>Highscores</h2>
      {users.length === 0 ? (
        <p>Inga spelare ännu!</p>
      ) : (
        users.map(user => (
          <PlayerCard key={user.id} user={user} onDelete={deletePlayer} />
        ))
      )}
    </div>
  )
}

export default Highscores
