import React, { useState } from 'react';
import './App.css';

function Button(props) {
  const handleClick = () => {
    props.onClickAct(props.bkColor);
  };

  return (
    <button className="Button" onClick={handleClick} style={{ backgroundColor: props.bkColor }}>
      {props.text}
    </button>
  );
}

function DisplayBlock(props) {
  let textColor;

  if (props.bkColor === 'red') {
    textColor = 'green';
  } else if (props.bkColor === 'green') {
    textColor = 'yellow';
  } else {
    textColor = 'red'; // Значення за замовчуванням для інших кольорів
  }

  return (
    <div className="Display" style={{ backgroundColor: props.bkColor, color: textColor }}>
      <div className="txt">don't worry if something doesn't work, if something did work you would be fired</div>
    </div>
  );
}


function QuoteButton({ onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      Show Quote of the Day
    </button>
  );
}

function QuoteDisplay({ quote, author }) {
  return (
    <div className="QuoteDisplay">
      <p className="QuoteText">"{quote}"</p>
      <p className="Author">- {author}</p>
    </div>
  );
}

function App() {
  const [displayBkColor, setDisplayBkColor] = useState('white');

  const stateFunc = (newBkColor) => {
    setDisplayBkColor(newBkColor);
  };
  

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      setQuote(randomQuote.text);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };


  return (
    <div className="App">
      <Button bkColor="red" text="Red" onClickAct={stateFunc} />
      <Button bkColor="green" text="Green" onClickAct={stateFunc} />
      <Button bkColor="yellow" text="Yellow" onClickAct={stateFunc} />
      <DisplayBlock bkColor={displayBkColor} />
      <QuoteButton onClick={fetchQuote} />
      {quote && <QuoteDisplay quote={quote} author={author} />}
    </div>
    
  );
}

export default App;
