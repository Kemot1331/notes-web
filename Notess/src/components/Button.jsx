import "./Button.css";

export default function Button({content, size, onClick}){
    return(
        <button className="btn" style={{height: size, width: size}} onClick={onClick}>{content}</button>
    );
}