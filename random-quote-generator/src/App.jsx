import { useEffect, useState } from "react";
import "./styles/style.scss";
import { PiQuotesFill} from "react-icons/pi";
import axios from "axios";
import { FaTwitter } from "react-icons/fa";

function App() {
  const [color, setColor] = useState("");
  const [randomQuote, setRandomQuote] = useState({});
  const { quote, character, character_avatar_url: img } = randomQuote
  
     
  const style = {
    backgroundColor: color,
  };

  const update = () => {
    axios.get('https://officeapi.akashrajpurohit.com/quote/random')
      .then(res => {
        setRandomQuote(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(update, [])
  const handleClick = () => {
    const hex = "0123456789ABCDE";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      const idx = Math.floor(Math.random() * 16);
      color += hex.charAt(idx);
    }
    setColor(color.length === 7 && color);
    update()
  };

  return (
    <>
      <div className="wrapper" style={style}>
        <div id="quote-box">
          <main>
            <h1>Random 'The Office U.S' Series Quotes</h1>
            <div className="content">
            <p id='text'>
              <PiQuotesFill className="quote open" />
              {quote}
              <PiQuotesFill className="quote close" />
              </p>
              <img src={img} alt="" />
           </div>
          </main>
          <span id="author">
            <em>~ {character}</em>
          </span>
          <hr style={style} />
          <aside >
            <a href="twitter.com/intent/tweet" id='tweet-quote'  target="_blank" style={{borderColor: color}}>
              <FaTwitter id='tweet-icon' style={{color: color}} />
            </a>
            <button id='new-quote' style={style} onClick={handleClick}>
              Change Quote
            </button>
          </aside>
        </div>
      </div>
    </>
  );
}

export default App;
