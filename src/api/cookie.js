export const setCookie = function(name, value, exp = 7) {					
	const date = new Date();				
	date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';	
};				
export const getCookie = function(name) {					
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;					
};					
					
export const deleteCookie = function(name) {
	const todayDate = new Date();				
  document.cookie = name + "=; path=/; expires=" + todayDate.toGMTString() + ";"					
};					