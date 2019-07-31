//播放器跨域问题
//document.domain="86idd.com";

var webIp = "www.ladis.com.cn";

//web应用的域名url
var txCMSIp = "www.ladis.com.cn:8585";

//驾校查询url地址
var jxWebIp = "www.ladis.com.cn:8585";

//驾校教练url地址
var jlWebIp = "www.ladis.com.cn:8585";

//汽车陪练url地址
var plWebIp = "www.ladis.com.cn:8585";

//web登陆应用的域名url
var loginWebIp = "www.ladis.com.cn:8585";

//网页浏览的时候是否需要计数 0不记数 1记数
var txCMSRememberViewNumber = 1;

//ios播放器端口
var mediaPort = 80;

var nCurPage = 1;
function change_on_status() {
	if (nCurPage == 1) {
		document.getElementById("span_first_page").style.cursor = "";
		document.getElementById("span_pre_page").style.cursor = "";
		document.getElementById("span_first_page").style.color = "#bcbcbc";
		document.getElementById("span_pre_page").style.color = "#bcbcbc";
	} else {
		document.getElementById("span_first_page").style.cursor = "pointer";
		document.getElementById("span_pre_page").style.cursor = "pointer";
		document.getElementById("span_first_page").style.color = "#5B5B5B";
		document.getElementById("span_pre_page").style.color = "#5B5B5B";
	}
	
	if (nCurPage == pageNumTotal || pageNumTotal == 1) {
		document.getElementById("span_last_page").style.cursor = "";
		document.getElementById("span_next_page").style.cursor = "";
		document.getElementById("span_last_page").style.color = "#bcbcbc";
		document.getElementById("span_next_page").style.color = "#bcbcbc";
	} else {
		document.getElementById("span_last_page").style.cursor = "pointer";
		document.getElementById("span_next_page").style.cursor = "pointer";
		document.getElementById("span_last_page").style.color = "#5B5B5B";
		document.getElementById("span_next_page").style.color = "#5B5B5B";
	}
}

function DealPageDown() {
	try {
		if (nNowPageNum != null) {
			nCurPage = nNowPageNum;
		}
	} catch (e) {
	}
	var objPageDown = document.getElementById("CMS_TX_PageDown");
	if (objPageDown != null) {
		var sShowToolbar = "" + "<span id=\"span_first_page\" style='font-size:12px;display:none' onclick=\"first_page()\" style=cursor:hand><font style='font-size:12px' class=firstPageInfo>第一页</font></span>&nbsp;&nbsp;"
				+ "<img src='/a_images/t1.jpg'><span id=\"span_pre_page\" onclick=\"pre_page()\" style=cursor:hand><font class=prevPageInfo>上一页</font></span>&nbsp;&nbsp;"
				+ "<img src='/a_images/t2.jpg'><span id=\"span_next_page\" onclick=\"next_page()\" style=cursor:hand><font class=nextPageInfo>下一页</font></span>&nbsp;&nbsp;"
				+ "<span id=\"span_last_page\" onclick=\"last_page()\" style=\"cursor:hand;display:none\"><font class=lastPageInfo>最后页</font></span>&nbsp;&nbsp;"
				+ "<span id=ShowChangeInfo style=\"color:#5B5B5B\">"
				+ "第"
				+ nCurPage
				+ "/"
				+ pageNumTotal
				+ "页"
				+ "</span><span style=\"color:#5B5B5B\">&nbsp;&nbsp;"
				+ "转到 第 <input name=\"selJumpToPage\" id=\"selJumpToPage\" type=\"text\" class=\"bd\" size=\"2\"> 页</span>"
				+ " <span style=cursor:hand style=\"color:#5B5B5B\" onclick=\"jump_to_page()\"><input type=\"button\" style=\"cursor:hand;background-color:#cccccc;color:#ffffff;height=17px\" value=\" GO \"></span>";
		objPageDown.innerHTML = sShowToolbar;
	}
	change_on_status();
}

function jump_to_page() {
	var nJumpToPage = document.getElementById("selJumpToPage").value;
	
	if (nCurPage == nJumpToPage) {
		return;
	}
	if (nJumpToPage > pageNumTotal) {
		return;
	}
	if (nJumpToPage == null || nJumpToPage == "") {
		return;
	}
	nCurPage = nJumpToPage;
	goToPage(nCurPage);
}

function first_page() {
	if (nCurPage == 1) {
		return;
	}
	nCurPage = 1;
	goToPage(nCurPage);
}

function last_page() {
	if (nCurPage == pageNumTotal) {
		return;
	}
	nCurPage = pageNumTotal;
	goToPage(nCurPage);
}

function next_page() {
	
	if (nCurPage >= pageNumTotal) {
		return;
	}
	nCurPage++;
	goToPage(nCurPage);
}

function pre_page() {
	if (nCurPage == 1) {
		return;
	}
	nCurPage--;
	goToPage(nCurPage);
}

function goToPage(nPage) {
	try {
		//判断列表页是不是生成了多页面翻页
		if (nNowPageNum != null) {
			if (nPage == 1) {
				window.location.href = sPageFloderAddr + sPageFileNameAddr + "." + sPageFileTypeAddr;
			} else {
				window.location.href=sPageFloderAddr+sPageFileNameAddr+"_"+nPage+"."+sPageFileTypeAddr;
			}
			return;
		}
	} catch (e) {
	}
	
	var obj = document.getElementById("ShowChangeInfo");
	for ( var i = 0; i < 1; i++) {
		obj.innerHTML = "第" + nCurPage + "/" + pageNumTotal + "页";
	}
	
	change_on_status();
	var contentPageDown = 0;
	if (typeof (nPageDown) == "undefined ") {
	} else {
		contentPageDown = nPageDown;
	}
	if (contentPageDown == 2) {
		var url = window.location.href;
		if (contentPageDown > 1) {
			url = url.replace("_" + nNowPage + ".", ".");
		}
		var url1 = url.substring(0, url.lastIndexOf("."));
		var url2 = url.substring(url.lastIndexOf("."), url.length);
		if (nPage == 1) {
			window.location.href = url1 + url2;
		} else {
			window.location.href = url1 + "_" + nPage + url2;
		}
	}
}

//记数器、预览视频
function countclick(newsid, fileId) {
if(fileId != null){
	var filetype = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var mediaType = "pc";
	if(filetype){
		mediaType = "ios";
	}
		sUrl = "http://" + txCMSIp + "/cms/cms/CMSWebAction!getReview.action?fileId="+fileId+"&mediaType="+mediaType+"&mediaPort="+mediaPort;
		if (filetype) {  
			try{document.getElementById("newsPic").style.display="none";}catch(e){}
			try {
				document.getElementById("TXCMS_playerframe_ios").src = sUrl;
				document.getElementById("TXCMS_playerframe_ios").style.display = "";
				document.getElementById("TXCMS_playerframe").style.display = "none";
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				
			} catch (e) {
			}
		} else {
			try{document.getElementById("newsPic").style.display="none";}catch(e){}
			try {
				document.getElementById("TXCMS_playerframe").src = sUrl;
				document.getElementById("TXCMS_playerframe").style.display = "";
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				document.getElementById("TXCMS_playerframe_ios").style.display = "none";
				
			} catch (e) {
			}
		}
	}
	if(newsid != null && txCMSRememberViewNumber == 1){
		var sUrl = "http://"+txCMSIp+"/cms/cms/CMSWebAction!setClickByNewsId.action?newsid="+newsid;
		document.getElementById("con").src = sUrl;
		//$("#con").attr("src",sUrl);
	}
	
}

//记数器、CK播放器点播
function countclickNew(newsid, fileId) {
if(fileId != null){
	var filetype = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var mediaType = "pc";
	sUrl = "http://" + txCMSIp + "/cms/cms/CMSWebAction!getReviewCb.action?fileId="+fileId+"&mediaType="+mediaType+"&mediaPort="+mediaPort;
	if(filetype){
		mediaType = "ios";
		sUrl = "http://" + txCMSIp + "/cms/cms/CMSWebAction!getReview.action?fileId="+fileId+"&mediaType="+mediaType+"&mediaPort="+mediaPort;
	}
	
		if (filetype) {  
			try{document.getElementById("newsPic").style.display="none";}catch(e){}
			try {
				document.getElementById("TXCMS_playerframe_ios").src = sUrl;
				document.getElementById("TXCMS_playerframe_ios").style.display = "";
				document.getElementById("TXCMS_playerframe").style.display = "none";
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				
			} catch (e) {
			}
		} else {
			try{document.getElementById("newsPic").style.display="none";}catch(e){}
			try {
				document.getElementById("TXCMS_playerframe").src = sUrl;
				document.getElementById("TXCMS_playerframe").style.display = "";
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				document.getElementById("TXCMS_playerframe_ios").style.display = "none";
				
			} catch (e) {
			}
		}
	}
	if(newsid != null && txCMSRememberViewNumber == 1){
		var sUrl = "http://"+txCMSIp+"/cms/cms/CMSWebAction!setClickByNewsId.action?newsid="+newsid;
		document.getElementById("con").src = sUrl;
	}
	
}

//记数器、CK播放器直播
function countLiveClickNew(newsid, newsArg1) {
	var filetype = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var isAndroid = (/android/gi).test(navigator.appVersion);
	if (filetype || isAndroid){
		sUrl = "http://" + txCMSIp + "/cms/web/cbplayer/ios_player_live.jsp?filePathName="+newsArg1;
	} else {
		sUrl = "http://" + txCMSIp + "/cms/web/cbplayer/pc_player_live.jsp?filePathName="+newsArg1;
	}
		try{document.getElementById("newsPic").style.display="none";}catch(e){}
		try {
				document.getElementById("TXCMS_playerframe").src = sUrl;
				document.getElementById("TXCMS_playerframe").style.display = "";
			
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				document.getElementById("TXCMS_playerframe_ios").style.display = "none";
				
			} catch (e) {
			}
}

//记数器、CK播放器直播
function countLiveAutoHidden(newsid, newsArg1) {
	var filetype = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var isAndroid = (/android/gi).test(navigator.appVersion);
	if (filetype || isAndroid){
		sUrl = "http://" + txCMSIp + "/cms/web/cbplayer/ios_player_live.jsp?filePathName="+newsArg1;
	} else {
		sUrl = "http://" + txCMSIp + "/cms/web/cbplayer/pc_player_live_hidden.jsp?filePathName="+newsArg1;
	}
		try{document.getElementById("newsPic").style.display="none";}catch(e){}
		try {
				document.getElementById("TXCMS_playerframe").src = sUrl;
				document.getElementById("TXCMS_playerframe").style.display = "";
			
				document.getElementById("TXCMS_mediaplayerP").style.display = "none";
				document.getElementById("TXCMS_playerframe_ios").style.display = "none";
				
			} catch (e) {
			}
}

//调用默认在线留言
function getOnlineLyJsp(newsNodeId){
	var sUrl = "http://"+txCMSIp+"/cms/web/onlineLy/onlineLy.jsp?onLineName=onlineLy&newsNodeId="+newsNodeId;
	document.getElementById("onlineLy").src = sUrl;
}

//调用公司在线留言
function getOnlineLyJsp_xjy(newsNodeId){
	var sUrl = "http://"+txCMSIp+"/cms/web/onlineLy/onlineLy_xjy.jsp?onLineName=onlineLy_xjy&newsNodeId="+newsNodeId;
	document.getElementById("onlineLy_xjy").src = sUrl;
}

//调用搜索
function getSearchJsp(searchKey){
	var sUrl = "http://"+txCMSIp+"/cms/peace/searchKey_"+searchKey+".shtml";
	document.getElementById("searchIframe").src = sUrl;
}

//调用评论页面
function getCommentJsp(newsId){
	var sUrl = "http://"+txCMSIp+"/cms/web/CMSWebCommentAction!getCommentJsp.action?newsId="+newsId+"&commentName=comment&viewName=view&siteId=1&auditState=2";
	document.getElementById("comment").src = sUrl;
}

//调用直播评论页面
function getCommentJsp_live(newsId){
	var sUrl = "http://"+txCMSIp+"/cms/web/CMSWebCommentAction!getCommentJspV.action?newsId="+newsId+"&commentName=comment&viewName=view&siteId=1&auditState=2";
	document.getElementById("comment").src = sUrl;
}

//调用直播评论列表页面
function getViewJsp_live(newsId){
	//var sUrl = "http://"+txCMSIp+"/cms/web/CMSWebCommentAction!getViewJspV.action?newsId="+newsId+"&commentName=comment&viewName=view&siteId=1&auditState=2";
	var sUrl = "http://"+txCMSIp+"/cms/webcomment_v/"+newsId+"/view/1/2.shtml"
	document.getElementById("view_live").src = sUrl;
}

//调用驾校评论打分页面
function getCommentStar(newsId){
	var sUrl = "http://"+txCMSIp+"/cms/web/CMSWebCommentAction!getCommentJsp.action?newsId="+newsId+"&commentName=comment_star&viewName=view_star&siteId=1&auditState=1";
	document.getElementById("comment_star").src = sUrl;
}

//调用学车咨询页面
function getCommentZx(newsId){
	var sUrl = "http://"+txCMSIp+"/cms/web/CMSWebCommentAction!getCommentJsp.action?newsId="+newsId+"&commentName=comment_zx&viewName=view_zx&siteId=1&auditState=1";
	document.getElementById("comment_zx").src = sUrl;
}

//调用学车报名页面
function getOnlineOrder(newsId){
	var sUrl = "http://"+txCMSIp+"/cms/web/order/online_order.jsp?newsNodeId=16&jiaxId="+newsId+"&onLineName=online_order";
	document.getElementById("onlineOrder").src = sUrl;
}

//调用内容页团购快捷报名
function getKjbm(newsNodeId, dateValue){
	var type = document.getElementById('titleId').innerHTML;
	var sUrl = "http://"+txCMSIp+"/cms/web/order/tuankj.jsp?newsNodeId="+newsNodeId+"&stopDate="+dateValue+"&carType="+encodeURI(encodeURI(type));
	document.getElementById("kjbmFrame").src = sUrl;
}

function getKjbm2(newsNodeId, dateValue){
	var sUrl = "http://"+txCMSIp+"/cms/web/order/tuankj2.jsp?newsNodeId="+newsNodeId+"&stopDate="+dateValue;
	document.getElementById("kjbmFrame").src = sUrl;
}

//调用内容页团购报名
function getTgbm(newsNodeId, dateValue){
	var type = document.getElementById('titleId').innerHTML;
	var sUrl = "http://"+txCMSIp+"/cms/web/order/tuan.jsp?newsNodeId="+newsNodeId+"&stopDate="+dateValue+"&carType="+encodeURI(encodeURI(type));
	document.getElementById("tgbmFrame").src = sUrl;
}

function getTgbm2(newsNodeId, dateValue){
	var sUrl = "http://"+txCMSIp+"/cms/web/order/tuan2.jsp?newsNodeId="+newsNodeId+"&stopDate="+dateValue;
	document.getElementById("tgbmFrame").src = sUrl;
}

//调用公用顶部登录页面
function getLoginHead(){
	var sUrl = "http://"+loginWebIp+"/cms/weblogin/loginHead.jsp";
	document.getElementById("loginHead").src = sUrl;
}

//调用注册顶部登录页面
function getLoginHeadRegister(){
	var sUrl = "http://"+loginWebIp+"/cms/weblogin/loginHeadRegister.jsp";
	document.getElementById("loginHead").src = sUrl;
}

//调用意见反馈页面
function getfeedback(){
	var sUrl = "http://"+txCMSIp+"/cms/web/feedback/feedback.jsp?newsNodeId=690&onLineName=feedback";
	document.getElementById("feedback").src = sUrl;
}

//加入收藏
function AddFavorite(FavURL, sTitle) 
	{
	FavURL = encodeURI(FavURL); 
	try
		{
			window.external.addFavorite(FavURL, sTitle);
		}catch(e) {   
            
			try
			{
				window.sidebar.addPanel(sTitle, FavURL, ""); 
			}catch (e) { 
			alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            }   
        }
    }

//设为首页
function SetHome(SHomeUrl)
	{
    if (document.all) 
		{
			document.body.style.behavior='SHomeUrl(#default#homepage)';
			document.body.setHomePage(SHomeUrl);
		}
		else
		{
			alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
		}
	}


//设为首页
function i_Homepage()
{
	if (document.all)
    {
        document.body.style.behavior='url(#default#homepage)';
	document.body.setHomePage(location.href);
    }
    else if (window.sidebar)
    {
    	if(window.netscape)
	    {
		    try
		   	{  
		        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
		    }  
		    catch (e)  
		    {  
		   		alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );  
		    }
	    } 
	    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
	    prefs.setCharPref('browser.startup.homepage',location.href);
 	}
}


//添加到收藏夹
function i_addFavorite()
{	
	if (document.all)
   {
      window.external.addFavorite(location.href,document.title);
   }
   else if (window.sidebar)
   {
      window.sidebar.addPanel(document.title, location.href,  "");
   }
   else
   {
	alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
    }
}

var layerIndex;
function closeLayerPage(){
	layer.close(layerIndex);
}

function showLayerPage(){
	layerIndex = $.layer({
			type : 2,
			title : false,
			border: [5, 0.5, '#000'],
			iframe : {
					src : 'http://'+txCMSIp+'/cms/web/comment/login.jsp',
					scrolling: 'no'
			},
			area : ['300px','340px']
	});
}

//获取稿件点击量
function getNewsClickNum(newsid) {
	$.ajax({
		type : "POST",
		url : 'http://' + txCMSIp + "/cms/cms/CMSWebAction!getClickNumById.action",
		dataType : 'jsonp',
		jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		data : "newsid="+newsid,
		success : function(data) {
			$('#TXCMS_newsClickNum').text(data[0].clickNum);
		}
	});
}