(function($, APP, _) {
  
  APP.Articles = {};

  APP.Articles.getArticles = function(url) {
    $.getJSON(url, APP.Articles.renderArticles);
  };
  
  APP.Articles.renderArticles = function(articles) {
    var $articles = $(".articles");
    $articles.html("");
    var linkRenderer = _.template('<li><a href="<%= link %>"><%= name %></a></li>');
    
    if(!articles.length) {
      $articles.append('<li>No Results</li>');
    } else {     
      _.each(articles, function(article){
        $articles.append(linkRenderer({
          link: article.link,
          name: article.name
        }));
      }); 
    }  
  };
     
  APP.Articles.handleLoadArticleClick = function(e) {
    e.preventDefault();
    var url = "staticjson/" + $(this).attr("id").split("-")[1] + ".json";
    APP.Articles.getArticles(url);
  };
    
})(jQuery, APP, _);