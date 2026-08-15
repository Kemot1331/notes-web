import './ColorDotButton.css';

export default function ColorDotButton({color, onClick, style}){
    return(
        <button className='dot' style={{...style, backgroundColor: color}} onClick={onClick}></button>
    );
}
