import Button from './Button';
import './Sidebar.css';
import { use, useState } from 'react';
import ColorDotButton from './ColorDotButton';

export default function Sidebar(){
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [showColorDots, setShowColorDots] = useState(false);

    const toogleAddMenu = () => {
      if(isAddMenuOpen){
        setIsAddMenuOpen(false);
        setTimeout(() => {
          setShowColorDots(false);
        }, 450);
      } else{
        setShowColorDots(true);
        setIsAddMenuOpen(true);
      }
    };

    return (
        <div className="side-bar">
        <div className="logo">Notess</div>
        <Button 
          content={"+"}
          size={"5vh"}
          onClick={toogleAddMenu}
        />
        {showColorDots &&
          <div className={`color-dots ${isAddMenuOpen ? "dots-opening" : "dots-closing"}`}>
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