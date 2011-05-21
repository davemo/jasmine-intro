describe("Articles Module", function() {
  
  var sut = APP.Articles;
  
  it("should exist", function() {
    expect(sut).toBeDefined();
  });
  
  describe("#getArticles", function() {
    
    var response, $articles, getJSONSpy;
    
    beforeEach(function() {
      getJSONSpy = spyOn($, 'getJSON');
      sut.getArticles('/some/url');
    });
    
    it("should call getJSON and invoke the renderArticles function", function() {
      expect(getJSONSpy.mostRecentCall.args).toEqual(['/some/url', sut.renderArticles]);
    });
    
  });
  
  describe("#renderArticles", function() {
    
    var $articles;
    
    beforeEach(function() {
      $articles = $.jasmine.inject('<ul class="articles"></ul>');
    });

    context("a response with data", function() {
      
      var response, $appleLink;

      beforeEach(function() {        
        url = 'staticjson/results.json';
        response = [
          { "name" : "Google", link: "http://www.google.com" },
          { "name" : "Apple", link: "http://www.apple.com" }
        ];
        
        sut.renderArticles(response);
        
        $articles = $(".articles a");
        $googleLink = $(".articles a:first");
      });
      
      it("should return 2 articles for 'google.json'", function() {
        expect($articles.length).toBe(2);
      });
      
      it("should render the first link with an href attribute of 'http://www.google.com", function() {  
        expect($googleLink).toHaveAttr('href', 'http://www.google.com');
      });
      
      it("should render the first link with a display name of 'Google'", function() {      
        expect($googleLink).toHaveText('Google');
      });
      
    });    
      
    context("a response without data", function() {
      var response, $noResultsLi, $articles; 
    
      beforeEach(function() {
        url = 'staticjson/apple.json';
        response = [];
      
        sut.renderArticles(response);
      
        $articles = $(".articles li");
        $noResultsLi = $(".articles li:first");
      });
    
      it("should render 1 li", function() {
        expect($articles.length).toBe(1);
      });
      
    });
    
  });
  
  describe("#handleLoadArticleClick", function() {
    
    var $link, e;
    
    beforeEach(function() {
      $link = $.jasmine.inject('<a href="#" id="load-google">Load Google</a>');
      spyOn(sut, 'getArticles');
      e = {
        preventDefault: function() {}
      };
      spyOn(e, 'preventDefault');
      sut.handleLoadArticleClick.call($link, e);
    });
    
    it("calls getArticles with a url of 'staticjson/google.json'", function() {
      expect(sut.getArticles).toHaveBeenCalledWith('staticjson/google.json');
    });
    
  });
});
