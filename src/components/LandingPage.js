import React, { useState } from 'react'
import '../App.css';
import CsvDownloadButton from 'react-json-to-csv'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
  } from 'recharts';

  var data={}
  var j=0
  var val=[{}]
const LandingPage = () => {
    const [flag,setFlag]=useState(false)
    const handleClick=(e)=>{
        e.preventDefault()
        val=[{}]
        getText()
    }

    function getText(){
      fetch('https://www.terriblytinytales.com/test.txt')
      .then(function(response){
        return response.text();
      }).then(function (str) {
    
        const num = 20;
        const map = {};
        const findMostFrequent = (str = '', num = 1) => {
        const strArr = str.trim().split('?').join(' ').split('.').join(' ').split(/\s+/).join(' ').split(' ');
        strArr.forEach(word => {
          word=word.toLowerCase()
           if(map.hasOwnProperty(word)){
              map[word]++;
           }else{
              map[word] = 1;
           }
        });

       const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
            frequencyArr.sort((a, b) => b[1] - a[1]);
            return frequencyArr.slice(0, num).map(el => el[0]);
        };
        data=findMostFrequent(str, num)
        
        for(let i=0;i<data.length;i++){
          val[j++]={"key":data[i],"value":map[data[i]]}
        }
        setFlag(true)
      })
      
    }

  return (
    <div>
         {flag &&
         <>
          <h1>Histogram of 20 most frequent words</h1>
          <BarChart className='.chart' width={600} height={400} data={val}>
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
          <CsvDownloadButton 
            className='white_btn1' 
            filename='wordfrequency' 
            delimiter=' : ' 
            headers={['Word','Frequency']} 
            data={val} >
            Export in CSV
          </CsvDownloadButton>
         </>
         
         }
         <button className='green_btn' onClick={handleClick}>Submit</button>
    </div>
  )
}

export default LandingPage