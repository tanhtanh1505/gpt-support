import './App.css';
import {ReactComponent as Submit} from './asset/icon/submit.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HistoryItem from './component/HistoryItem';


function App() {
  function changeTab(evt, tabId) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function changeLanguage(evt, language) {
    var i, button;
  
    button = document.getElementsByClassName("language-button");
    for (i = 0; i < button.length; i++) {
      button[i].className = button[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";

    i18n.changeLanguage(language);

  }

  function querySubmit() {
    console.log('Call API')
  }

  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('bbno$');
  const [answer, setAnswer] = useState('bbno$ (pronounced "baby no money") is a Canadian rapper, singer, and songwriter. He first gained popularity through his music on the streaming platform SoundCloud, and has since released multiple albums and singles. His style is known for its blend of rap, pop, and electronic music, and his lyrics often contain humorous and playful references to popular culture. Some of his most popular songs include "Lalala," "Edamame," and "Nursery."')

  return (
    <div className="wrapper">
      <div className="tab">
        <button className="tablinks active" onClick={(e) => changeTab(e, "lookup")} tabid="lookup">{t('lookup')}</button>
        <button className="tablinks" onClick={(e) => changeTab(e, "history")} tabid="history">{t('history')}</button>

      </div>

      <div className="tabcontent" id="lookup" style={{display: 'block'}}>      
        <div className="inputbox">
          <div className="heading">{t('query')}:</div>
          <div className="language">
            <button className="language-button active" onClick={(e) => changeLanguage(e, 'en')}>EN</button>
            <div style={{width: '7px'}}></div>
            <button className="language-button" onClick={(e) => changeLanguage(e, 'vi')}  >VI</button>
          </div>
        </div>  
        <div className="inputbox">
          <input type="text" onChange={(e) => setQuery(e.value)} defaultValue={query}/>
          <Submit style={{cursor: 'pointer'}} onClick={querySubmit}></Submit>
        </div>
        <div className="answer">
          <div className="heading">{t('answer')}:</div>
          <div className="regular" style={{marginTop: '4px'}}>
            {answer}
          </div>
        </div>
      </div>

      <div className="tabcontent" id="history">
        <HistoryItem query='bbno$'/>
        <HistoryItem query='The resignation of the shōgun led to the Boshin War...'/>
        <HistoryItem query='ChatGPT'/>
        <HistoryItem query='Alter'/>

      </div>

    </div>
  );
}

export default App;
