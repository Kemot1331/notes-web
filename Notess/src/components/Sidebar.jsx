import Button from './Button';
import './Sidebar.css';
import { useState } from 'react';
import ColorDotButton from './ColorDotButton';

export default function Sidebar({ onColorSelect }){
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [showColorDots, setShowColorDots] = useState(false);

    const colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];

    const toggleAddMenu = () => {
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

    const handleColorPick = (color) => {
      onColorSelect(color);
      if(isAddMenuOpen){
        toggleAddMenu();
      }
    };

    return (
        <div className="side-bar">
        <div className="logo">Notess</div>
        <Button 
          content={"+"}
          size={"5vh"}
          onClick={toggleAddMenu}
        />
        {showColorDots &&
          <div className={`color-dots ${isAddMenuOpen ? "dots-opening" : "dots-closing"}`}>
            {/* <ColorDotButton 
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
            /> */}
            {colors.map((color) => (
              <ColorDotButton color={color} onClick={() => handleColorPick(color)}/>
            ))}
          </div>
        }
      </div>
    );
}