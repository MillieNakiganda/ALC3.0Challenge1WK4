const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('108d1da5686b4cffba2ffb8a09799e55');


var readlineSync = require('readline-sync'); //synchronous readline

var standard_input = process.stdin; //userinput
standard_input.setEncoding('utf-8'); //set character encoding to avoid changing it tostring()
console.log('\x1b[32m',"ENTER: 1 FOR TOP HEADLINES \n\n 2 FOR DIFFERENT ARTICLES FROM DIFFERENT SOURCES\n\n 3 FOR THE DIFFERERNT SOURCES FROM WHICH WE GET ARTICLES\n");

standard_input.on('data', function (data) {

//get titles from articles
  function listarticles(prods) {
    let articlesarray = [];
    
    for (let i=0; i<prods.length; i+=1) {
     //product_names.push('\x1b[32m',"SOURCE: "+ prods[i].source.name); //push item with color
     articlesarray.push('\x1b[33m',i+1 +"."+ prods[i].title);
     articlesarray.push('\x1b[34m',prods[i].description);
     articlesarray.push('\x1b[32m',prods[i].url);
    }
    return articlesarray.join('\r\n'); //each item on a new line
  }
  //get source names
  function listsources(prods) {
    let source_names = [];
    
    for (let i=0; i<prods.length; i+=1) {
      source_names.push('\x1b[32m',"SOURCE: "+ prods[i].name);
     
      source_names.push('\x1b[34m',prods[i].description);
      source_names.push('\x1b[33m',prods[i].url);
    }
    return source_names.join('\r\n');
  }


    if(data == 1)
    {
      
      let keyword,newssources,chosensource;
      console.log('\x1b[35m',"TOP HEADLINES");
      keyword = readlineSync.question('Whats the keyword to search for?\n ');
      newssources = readlineSync.question('\nFrom which news sources should we get the articles?\n A FOR BBC NEWS\n B FOR THE VERGE\n C FOR BBC SPORT\n D FOR ALJAZEERA\n');
      if(newssources === 'A')
      {
        chosensource = 'bbc-news';
      }
      else if(newssources === 'B')
      {
        chosensource == 'abc-news';
      }
      else if(newssources === 'C'){
        chosensource == 'al-jazeera-english';
      }
      else if(newssources == 'D'){
        chosensource == 'associated-press';
        
      }
      else{
        console.log('\x1b[31m',"You have to write the letter in capital letters\n");
        process.exit();
      }
      
        // To query /v2/top-headlines
      // All options passed to topHeadlines are optional, but you need to include at least one of them
        newsapi.v2.topHeadlines({
          sources: [chosensource],
          q: [keyword],
          language: 'en',
          pageSize: 10
        }).then(function(result) {
          
          if(result.totalResults != 0)
          {
            console.log(listarticles(result.articles));   
          }
          else{
            console.log('\x1b[31m',"No results for that keyword within that time, or try again with the right spelling of the key word");
          }
      
        }).catch(function(error){
            console.log(error);
        });
        
    }
      
      else if(data == 2 )
      {
      
        //get date in the format 2019-09-13
        let today = new Date().toISOString().slice(0, 10);
   
        newsapi.v2.everything({
          
          sources: 'bbc-news,the-verge',
          domains: 'bbc.co.uk, techcrunch.com',
          from: '2019-09-13',
          to: [today], 
          language: 'en',
          sortBy: 'relevancy',
          page: 2
        }).then(function(result) {
          if(result.totalResults != 0)
          {
            console.log(listarticles(result.articles));
            
            process.exit();
          }
          else{
            console.log('\x1b[31m',"No results for that keyword within that time, or try again with the right spelling of the key word");
          }
          
        }).catch(function(error){
            console.log(error);
        });
      
   

      }
      else if(data == 3)
      {
        newsapi.v2.sources({
           language: 'en',
           country: 'us'
         }).then(function(result) {

          if(result.totalResults != 0)
          {
            console.log(listsources(result.sources));
            process.exit();
          }
          else{
            console.log('\x1b[31m',"No results for that keyword within that time, or try again with the right spelling of the key word");
          }
          
         }).catch(function(error){
             console.log('\x1b[41m',error);
         });
      }
      else
      {
         console.log('\x1b[31m',"Please enter only numbers 1 to 3\n");
         process.exit();
      }
      

});
