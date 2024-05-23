import '../Cards/Card.css';
export default function Category({ title }){
    return(
        <div className="Card">
            <div>{title}</div>
        </div>
    )
}