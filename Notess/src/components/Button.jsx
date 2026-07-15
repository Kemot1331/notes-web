import "./Button.css";

export default function Button({content, size}){
    return(
        <button className="btn" style={{height: size, width: size}}>{content}</button>
    );
}