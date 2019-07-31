$(function(){
	   $("#submitOrder").click(function(){
		   if($(".Email").val() == ""){
		   		alert('请填写邮件！');
				$('.Email').focus();
				 return false;
		   }else if (!$(".Email").val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)){
				alert("这不是一个正确的Email地址，请重新输入！");
				$(".Email").focus();
				return false;				
			}else if($(".topic").val() == ""){
				  alert('请填写主题！');
				  $('.topic').focus();
				 return false;
			}else{
				
				$('#myForm').submit();
				$(".Email").val("");
				$(".topic").val("");
				
			}
		 });
		 
	});
 

 


