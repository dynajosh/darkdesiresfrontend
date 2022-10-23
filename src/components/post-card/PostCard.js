import './index.css'

export const PostCard = ({body, id, primaryColor, secondaryColor}) =>{
    return (
        <div className="post-card"
            style={{
                backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`

            }}
        >
            <h4>#{id}</h4>
            <p>{body}</p>
        </div>
    )
}