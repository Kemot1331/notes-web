import "./SearchBar.css"

export default function SearchBar({value, onChange}){
    return (
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder={'\ud83d\udd0e\ufe0e Search'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </div>
    );
}