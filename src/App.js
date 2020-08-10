import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'
const alanKey =
  "bc5eafe1955a00615e22f6aa352e41712e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles()
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        } else if (command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if (command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number
         const article = articles[parsedNumber -1]

         if(parsedNumber > 20) {
           alanBtn().playText('Please Try Again');
         } else if(article){
          window.open(article.url, '_blank')
          alanBtn().playText('I am Opening Sire!')
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" alt="Alan Logo" className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
