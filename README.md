# Word Frequency Asssignment

# Website Live Url

https://salikwordfrequency.netlify.app/

# Dependencies Used

1) recharts -: For Displaying Histogram
2) react-json-to-csv -: For Downloading Csv File

 # Code Explanation
 1) Onclick Function of Submit Button
 
    ```
    const handleClick=(e)=>{
        e.preventDefault()
        val=[{}]
        getText()
    }
    
    Expalnation -: 
    
    a) val is an array of object which contains word and it's frequency
    b) getText() is the function which will read complete 'txt file' and update val with word and it's frequency -> [{'key':word,'val':Frequency},.......]
    
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
    ```
    
2) Setting Up Histogram
    
   ```
   <BarChart className='.chart' width={600} height={400} data={val}>
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Bar dataKey="value" />
    </BarChart>
    
    Expalnation -:
    
    a) 'width/height' is for setting height and width of bar
    b) 'data' is used for filling array of object in the histogram (which i have updated in 'val' on first step)
    c) <XAxis dataKey="key" /> --> This line of code is helping in setting x-axis as  top 20 word name
    d) <YAxis dataKey="key" /> --> This line of code is helping in setting x-axis as  top 20 frequency value
    ```    
    
3) Export To Csv
    
  ``` 
  <CsvDownloadButton 
            className='white_btn1' 
            filename='wordfrequency' 
            delimiter=' : ' 
            headers={['Word','Frequency']} 
            data={val} >
            Export in CSV
    </CsvDownloadButton>
  ```
    
    a) filename -: Setting up filename of csv file which will be downloaded
    b) delimiter -: Gives separation  of ' : ' between Word and Frequency
    c) headers={['Word','Frequency']} -: It will rename the column name for the csv file
    d) data={val} -: This will feed the data {val -: array of objects} into the file. 
    
    Note -: onclick of this button csv file will be downloaded.

# ScreenShots

![sc1](https://github.com/khansalikaziz/Word-Frequency-Assignment/assets/76683360/c976014f-350d-4a70-80a2-0f1730f7588d)

![one](https://github.com/khansalikaziz/Word-Frequency-Assignment/assets/76683360/e2e03361-65e7-4867-a2bc-f910634c57b4)

![two](https://github.com/khansalikaziz/Word-Frequency-Assignment/assets/76683360/83919c1f-2ab2-48e2-918d-ff59169db052)

![three](https://github.com/khansalikaziz/Word-Frequency-Assignment/assets/76683360/0ed9514c-f04c-4587-a492-6bd223dbedf2)

