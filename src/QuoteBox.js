import React, { useState, useEffect } from 'react';

function QuoteBox() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotesArray, setQuotesArray] = useState([]);

  const fetchQuotes = async () => {
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    const data = await response.json();
    setQuotesArray(data.quotes);
    getRandomQuote(data.quotes);
  };

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div id="quote-box" className="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <div className="buttons">
        <button id="new-quote" onClick={() => getRandomQuote(quotesArray)}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet
        </a>
      </div>
    </div>
  );
}

export default QuoteBox;
