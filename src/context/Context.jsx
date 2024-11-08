import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecent] = useState("");
  const [prevPrompt, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextword) => {
    setTimeout(function ()  {
      setResultData(prev=>prev+nextword);
    },75*index)
  };

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    setRecent(input)
  
    const response = await run(input)
    let responseArry = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArry.length; i++) {
      if (i === 0 || i % 2 === 0) {
        newResponse += responseArry[i];
      } else {
        newResponse += "<b>" + responseArry[i] + "</b>";
      }
    }
  let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArry = newResponse2.split(" ");
    for ( let i=0; i < newResponseArry.length;i++)
    {
    const nextword = newResponseArry[i];
    delaypara(i,nextword+ " ")
    }
    setLoading(false)
    setInput("")
  }

  const contextValue = {
    prevPrompt,
    setPrevPrompts,
    onSent,
    setRecent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
