import "./App.css";
import { ReactComponent as Submit } from "./asset/icon/submit.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";

import HistoryItem from "./component/HistoryItem";
import LoadingIndicator from "./component/LoadingIndicator"

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const question = queryParams.get("q") || "";

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

    document.getElementById(tabId).style.display = "flex";
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

  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState(question);
  const [answer, setAnswer] = useState("");
  const itemList = JSON.parse(localStorage.getItem('itemList')) || {};

  function querySubmit(evt) {
    evt.preventDefault();
    setAnswer('');
    trackPromise(
      fetch(`https://woparadise.tech/gpt-support/question?q=${query}`).then((res) => {
        res.json().then((data) => {  
          setAnswer(data.answer);
          itemList[query] = data.answer;
          localStorage.setItem('itemList', JSON.stringify(itemList))
        });
      })
    );
  }

  function historyItemClick(query, answer) {
    setQuery(query);
    setAnswer(answer);

    var i, tabcontent;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById('lookup').style.display = "flex";

    document.getElementById('tab-lookup').className += " active";
    document.getElementById('tab-history').className = document.getElementById('tab-history').className.replace(" active", "");
  }

  return (
    <div className="wrapper">
      <div className="tab">
        <button className="tablinks active" onClick={(e) => changeTab(e, "lookup")} id="tab-lookup">
          {t("lookup")}
        </button>
        <button className="tablinks" onClick={(e) => changeTab(e, "history")} id="tab-history">
          {t("history")}
        </button>
      </div>

      <div className="tabcontent" id="lookup" style={{ display: "flex" }}>
        <div className="inputbox">
          <div className="heading">{t("query")}:</div>
          <div className="language">
            <button className="language-button active" onClick={(e) => changeLanguage(e, "en")}>
              EN
            </button>
            <div style={{ width: "7px" }}></div>
            <button className="language-button" onClick={(e) => changeLanguage(e, "vi")}>
              VI
            </button>
          </div>
        </div>
        <form className="inputbox" onSubmit={querySubmit}>
          <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} />
          <Submit type={"submit"} style={{ cursor: "pointer" }} onClick={querySubmit}/>
        </form>
        <div className="answer">
          <div className="heading">{t("answer")}:</div>
          <LoadingIndicator />
          <div className="regular" style={{ marginTop: "4px" }}>
            {answer}
          </div>
        </div>
      </div>

      <div className="tabcontent" id="history">
        {
          Object.keys(itemList).map((key, index) => (
            <HistoryItem 
              query={key} 
              key={index} 
              onClick={() => historyItemClick(key, itemList[key])}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
