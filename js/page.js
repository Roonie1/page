(function($){
  $.fn.page = function(options, callback){  
    var defaults = {  
      totalPage:10,
      currentPage:1,
      pageUrl:function(page){
        return null;
      },
      callback:null
    };
    var options = $.extend(defaults, options);
    var html = "";
    var _this = this;
    //初始化
    if (options.currentPage == 1){
      html += '<a href="javascript:void(0)" class="page_before disabled_page"><em></em></a>';
    } else {
      html += '<a href="javascript:void(0)" class="page_before"><em></em></a>';
    }

    for (var i = 1; i < options.totalPage + 1; i++){
      if (i == options.currentPage){
        html += '<a href="javascript:void(0)" class="page_active page_number">'+i+'</a>';
      } else {
        html += '<a href="javascript:void(0)" class="page_number">'+i+'</a>';
      }
    }
    if (options.currentPage == options.totalPage){
      html += '<a href="javascript:void(0)" class="page_after disabled_page"><em></em></a>'
    } else{
      html += '<a href="javascript:void(0)" class="page_after"><em></em></a>'
    }
    $(_this).append(html);

    //增加点击事件
    $(_this).find("a").on("click",function(){
      var url = "";
      var nextPage;
      if ($(this).hasClass('disabled_page')){
        return true;
      }

      if ($(this).hasClass('page_before')){
        url = options.pageUrl.apply(options.pageUrl, [options.currentPage - 1]);
        nextPage = options.currentPage - 1;
      } else if ($(this).hasClass('page_after')){
        url = options.pageUrl.apply(options.pageUrl, [options.currentPage + 1]);
        nextPage = options.currentPage + 1;
      } else{
        url = options.pageUrl.apply(options.pageUrl, [parseInt($(this).text())]);
        nextPage = parseInt($(this).text());
      }

      //设置选中状态
      $(_this).find("a").each(function(index){
        if ($(this).hasClass('page_active')){
          $(this).removeClass('page_active');
        }
        if (!$(this).hasClass('page_after') && !$(this).hasClass('page_before') && parseInt($(this).text()) == nextPage){
          $(this).addClass('page_active');
          return true;
        }
      });
      if (nextPage == 1){
        $(".page_before").addClass('disabled_page');
        $(".page_after").removeClass('disabled_page');
      } else if(nextPage == options.totalPage){
        $(".page_after").addClass('disabled_page');
        $(".page_before").removeClass('disabled_page');
      } else {
        $(".page_before").removeClass('disabled_page');
        $(".page_after").removeClass('disabled_page');
      }
      options.currentPage = nextPage;
      $.ajax({
        url: 'url',
        dataType: 'json',
        success:function(data){
          callback(data);
        }
      });
      
    })
  }
})(jQuery);
