import './Sidebar.css';

export default function Sidebar(){
    return (
         <div className="side-bar">
        <div className="logo">Notess</div>
        <button className="add-btn">+</button>
        <div className="color-dots">
          <span className="dot" style={{ backgroundColor: '#ffb3ba' }}></span>
          <span className="dot" style={{ backgroundColor: '#ffdfba' }}></span>
          <span className="dot" style={{ backgroundColor: '#ffffba' }}></span>
          <span className="dot" style={{ backgroundColor: '#baffc9' }}></span>
          <span className="dot" style={{ backgroundColor: '#bae1ff' }}></span>
        </div>
      </div>
    );
}