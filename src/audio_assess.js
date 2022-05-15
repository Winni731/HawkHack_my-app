const axios = require("axios");
const { constants } = require("buffer");
let audioURL = "https://bit.ly/3yxKEIY"
//replace the following APIKey by your own one
const APIKey = "05d848160bc849e0a6a1257828a61f81"
const refreshInterval = 5000
const fs = require("fs");
//file path of mp3 file
const file = "DanGilbert_2004-2m26to3m49.mp3";

// Setting up the AssemblyAI headers
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
})


fs.readFile(file, (err, data) => {
    if (err) return console.error(err);
    
    assembly
    .post("/upload", data)
    .then((res) => {
        audioURL = res.data.upload_url;
        console.log(audioURL);
        getTranscript(audioURL);
        })
    .catch((err) => console.error(err))
    
});

var getSentimentJson = (url) => {
    assembly
    .post("/transcript", {
        audio_url: url,
        sentiment_analysis: true,
        //iab_categories: true
        entity_detection: true
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

//getSentimentJson(audioURL)
let flag = 1;
let transcript;
let da;

const getTranscript = async (url) => {
  // Sends the audio file to AssemblyAI for transcription
  const response = await assembly.post("/transcript", {
    audio_url: url,
    sentiment_analysis: true
  });

  // Interval for checking transcript completion
  
  
  const checkCompletionInterval = setInterval(async () => {
    transcript = await assembly.get(`/transcript/${response.data.id}`)
    const transcriptStatus = transcript.data.status

    if (transcriptStatus !== "completed") {
      console.log(`Transcript Status: ${transcriptStatus}`)
    } else if (transcriptStatus === "completed") {
      console.log("\nTranscription completed!\n")
      da = transcript.data
      let transcriptText = da.text
      console.log(`Your transcribed text:\n\n${transcriptText}`)
      //let sentimentResults =  transcript.data.sentiment_analysis_results
      //console.log(`\nYour JSON Data:\n\n${sentimentResults}`)
      clearInterval(checkCompletionInterval)
      flag=0;
    }
  }, refreshInterval);
  
  /*
  const flagState = setInterval(async () =>{
      if(flag==0){
        return da;
      }
  }
  ,1000)
  */

  
}

const getText = (data) => data.text;

const getSenList = (obj) => {
    let senData = obj.sentiment_analysis_results;
    let senList = [];
    senData.forEach((value, index, array) => {
        senList.push(value.sentiment) 
    });
    return senList;
}

//下面这个是获取音频情感分类占比的function
const getSenRate = (list) => {
    var countPos = 0;
    var countNeu = 0;
    var countNeg = 0;
    list.forEach((value, index, array) =>{
        if (value == "POSITIVE") {
            countPos++;
        }
        else if (value == "NEGATIVE") {
            countNeg++;
        }
        else if(value == "NEUTRAL"){
            countNeu++;
        }
    })
    const n = list.length;
    let rate = new Map([
        ['positive',countPos/n],
        ['negative',countNeg/n],
        ['neutral',countNeu/n]
    ]);
    rate.forEach((value,key) => {
        console.log(key + ':\t' + value + '\n')
    })
    return rate;
}

//console.log(audioURL);
//getTranscript(audioURL);
/*
let getTopic = (obj) => {
    const iabResult = obj.iab_categories_result;
    if (iabResult.status == "success"){
        //console.log(typeof iabResult.summary);
        return iabResult.summary;
    }
    else if (iabResult.status == "unavailable"){
        console.log("topics unavailable");
    }
    else{
        console.log("error");
    }
}

let printTopic = (summary) => {
    let count = 0;
    sorted = new Map([...Object.entries(summary)].sort((a,b) => b[1]-a[1]))
    sorted.forEach((value,key) => {
        if(count<5){
        console.log(key+':\t'+value+'\n');
        count++;
        }  
    })
}
*/

/*
let topics = getTopic(ss);
if (topics!=null){
    printTopic(topics);
}
*/

//const Chart = require('chart.js');

//下面这个是提取关键词的function，返回array
const getEntities = (obj) => {
    let allEntities = obj.entities;
    if (allEntities == null){
        return null
    }
    else{
        let keyWords = [];
        allEntities.forEach((value,index) => {
        keyWords[index] = value.text;
    })
    return keyWords;
    }
    
    
    
}

const flagState = setInterval(async () =>{
    if(flag==0){
        
        let data = da;
        //console.log(JSON.stringify(data));

        //text是音频转过来的文字
        let text = getText(data);
        let senList = getSenList(data);
        let senRate = getSenRate(senList);
        //console.log(senRate.get("positive"));
        let keyWords = getEntities(data);
        //console.log(keyWords);
        /*
        let topics = getTopic(data);
        if (topics!=null){
            printTopic(topics);
        }
        */

        clearInterval(flagState);
    }
}
,1000)


