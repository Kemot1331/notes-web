import './ColorDotButton.css';

export default function ColorDotButton({color, onClick}){
    return(
        <button className='dot' style={{backgroundColor: color}} onClick={onClick}></button>
    );
}
