import  type { User } from '../types'

interface Props {
    user: User
    onDelete: (id: string) => void
}

const PlayerCard = ({ user, onDelete }: Props) => {
    return (
        <div className="player-card">
            {user.image && (
                <img
                    src={`http://localhost:5000${user.image}`}
                    alt={user.name}
                />
            )}
            <div className="player-card__info">
                <h3>{user.name}</h3>
                <p>Poäng: {user.score}</p>
            </div>
            <button onClick={() => onDelete(user.id)}>Radera</button>
        </div>
    )
}

export default PlayerCard
