
const NewsAPI = require('newsapi');
let apikey = '108d1da5686b4cffba2ffb8a09799e55';
const newsapi = new NewsAPI(apikey);

test('apikey',() => {
const newsapi = new NewsAPI(apikey);
expect(apikey).toBe('108d1da5686b4cffba2ffb8a09799e55');
});


test('check whether top headlines works',() => {

    return newsapi.v2.topHeadlines({
        sources: 'bbc-news,the-verge',
        q: 'bitcoin',
        language: 'en'
      }).then(function(result){
          expect(result.status).toEqual('ok');
      });

})
test('check whether everything works',() => {

    return  newsapi.v2.everything({
            q: 'bitcoin',
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2019-09-13',
            to: '2019-09-14',
            language: 'en',
            sortBy: 'relevancy',
            page: 2
          }).then(function(result){
            expect(result.status).toEqual('ok');
        });
  
  })

  test('check whether top headlines works',() => {

     return newsapi.v2.sources({
            // category: 'technology',
             language: 'en',
             country: 'us'
           }).then(function(result){
            expect(result.status).toEqual('ok');
        });
  
  })


