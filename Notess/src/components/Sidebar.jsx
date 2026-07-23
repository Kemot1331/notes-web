import Button from './Button';
import './Sidebar.css';
import { use, useState } from 'react';

const ColorDotButton = ({color, onClick}) => (
  <button className='dot' style={{backgroundColor: color}} onClick={onClick}></button>
);

export default function Sidebar(){
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

    return (
        <div className="side-bar">
        <div className="logo">Notess</div>
        <Button 
          content={"+"}
          size={"5vh"}
          onClick={() => {
            setIsAddMenuOpen(!isAddMenuOpen);
          }}
        />
        {isAddMenuOpen &&
          <div className="color-dots">
            <ColorDotButton 
              color={"#ffb3ba"}
            />
            <ColorDotButton 
              color={"#ffdfba"}
            />
            <ColorDotButton 
              color={"#ffffba"}
            />
            <ColorDotButton 
              color={"#baffc9"}
            />
            <ColorDotButton 
              color={"#bae1ff"}
            />
          </div>
        }
      </div>
    );
}