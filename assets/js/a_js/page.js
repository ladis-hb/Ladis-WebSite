var nCurPage = 1;
function loadItemList(){
	moreHtmlText=$("#getmore").html();
  	$("#getmore").html('数据加载中...');
	$("#getmore").removeClass();
	$("#getmore").addClass("loading");
	iphone_next_page();
}

function iphone_next_page()
{
	
	if(nCurPage >= pageNumTotal)
	{
		$("#getmore").html('数据加载完成');
		$("#getmore").removeClass();
		$("#getmore").addClass("finish");
		return;
	}
	nCurPage++;
	
	iphone_goToPage(nCurPage);
}


function iphone_goToPage(nPage)
{
	var sPage = "_" + nPage;
	if(nPage == 1)
	{
		sPage = "";
	}
	var pageUrl = "http://" + document.location.host + "/_CMS_TXT_/"+txtId+sPage+".txt";
	iframeDownload.location.href = pageUrl;
	setTimeout('iphone_finishNextPage()',1000);
}

function iphone_finishNextPage(){
	var sContent = iframeDownload.document.body.innerHTML;
	if(sContent != null && sContent.length > 30)
	{
		$("#loadMore").append(sContent);
		sContent =$("#loadMore").text();
		$("#getmore").html(moreHtmlText);
		$("#loadMore").before(sContent);
		$("#loadMore").html("");
		$("#getmore").removeClass();
		$("#getmore").addClass("refresh");
	}
	else
	{
		setTimeout('iphone_finishNextPage()',1000);
	}
}

//new change style
function changeNewsOption()
{
	var option= getCmsvl("option");
	
	if(option!=null&&option!=""&&option!="null")
	{
		$("#"+option).removeClass();
		$("#"+option).addClass("select");
	}else
	{
		
		$("#news_01").removeClass();
		$("#news_01").addClass("select");
		
		
	}
}

function getCmsvl(name) {
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
	};