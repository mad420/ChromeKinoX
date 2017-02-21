var today = new Date();
var expiry = new Date(8640000000000000);//new Date(today.getTime() + 10*365 * 24 * 3600 * 1000); // plus 10 years watch out 2038

function setCookie(name, value)
{
  console.log('LOG: set Cookie:'+name+' val:'+value);
  document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  console.log('LOG: got Cookie:'+name+' val:'+value);
  return (value != null) ? unescape(value[1]) : null;
}

function getPlayerByMirror(Sender, AutoHideMirr) {

  var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];//Get TV SHow by html file
  var getReq = $(Sender).attr('rel');
  setCookie(TvShow, getReq);

    window.clearTimeout(TrashTimer);
    if (MirrorTimer != false) return;
    $('.MirBtnActive').removeClass('MirBtnActive');
    $(Sender).addClass('MirBtnActive');
    $.ajax({
        type: "GET",
        cacheBoolean: false,
        url: '/aGET/Mirror/' + $(Sender).attr('rel'),
        dataType: "json",
        beforeSend: function() {
            $('#AjaxStream').html('<br /><center><img src="' + data_base + '/gr/sys/ani/103.gif" width="160" height="24" alt="" border="0" /></center><br />');
            //$('#AjaxStream').slideDown(PopupAnimationSpeed);
        },
        success: function(Response) {
            $('#AjaxStream').html(Response.Stream);
            $('#MirHeadline').html('Kinox.to speichert <u>alle</u> Filme selber! Dieser Stream wird gehorstet bei: <span class="grayed"><a target="_blank" rel="nofollow" href="' + Response.HosterHome + '"><span class="grayed">' + Response.HosterName + '</span></a></span>');
            if (Response.Replacement != undefined && Response.Replacement != false) {
                Response.Replacement = '<li onclick="getPlayerByMirror(this, \'' + AutoHideMirr + '\');" ' + Response.Replacement.substr(2);
                $(Sender).replaceWith(Response.Replacement);
            }

            $('.Partime').one('click', function() {
                getPlayerByMirror(this, AutoHideMirr);
            });
        },
        error: function() {
            $('#AjaxStream').html('<img src="' + data_base + '/gr/sys/player/default.divx.na.png" style="margin-bottom: -2px" width="752" border="0" />');
        }
    });
}

function getPlayerByMirror1ACCESSKEY(Sender, AutoHideMirr) {
var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];//Get TV SHow by html file
var getReq = $(Sender).attr('rel');
setCookie(TvShow, getReq);

    window.clearTimeout(TrashTimer);
    if (MirrorTimer != false) return;
    $('.MirBtnActive').removeClass('MirBtnActive');
    $(Sender).addClass('MirBtnActive');
    $.ajax({
        type: "GET",
        cacheBoolean: false,
        url: '/aGET/Mirror/' + $(Sender).attr('rel'),
        dataType: "json",
        beforeSend: function() {
            $('#AjaxStream').html('<br /><center><img src="' + data_base + '/gr/sys/ani/103.gif" width="160" height="24" alt="" border="0" /></center><br />');
            $('#AjaxStream').slideDown(PopupAnimationSpeed);
        },
        success: function(Response) {
            $('#AjaxStream').html(Response.Stream);
            $('#MirHeadline').html('Kinox.to speichert <u>alle</u> Filme selber! Dieser Stream wird gehorstet bei: <span class="grayed"><a target="_blank" rel="nofollow" href="' + Response.HosterHome + '"><span class="grayed">' + Response.HosterName + '</span></a></span>');
            if (Response.Replacement != undefined && Response.Replacement != false) {
                Response.Replacement = '<li onclick="getPlayerByMirrorAccessKey(this, \'' + AutoHideMirr + '\');" ' + Response.Replacement.substr(2);
                $(Sender).replaceWith(Response.Replacement);
            }
            $('.Partime').one('click', function() {
                getPlayerByMirrorAccessKey(this, AutoHideMirr);
            });
        },
        error: function() {
            $('#AjaxStream').html('<img src="' + data_base + '/gr/sys/player/default.divx.na.png" style="margin-bottom: -2px" width="752" border="0" />');
        }
    });
    console.log('LOG: getPlayerByMirror1ACCESSKEY: '+ Response.Replacement)
}



window.onload = function() {
  console.log('LOG: ONLOADED');
  var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];//Get TvShow by html filename
  var ShowCookie = getCookie(TvShow);//Get cookie by TVShowName

  console.log('Loaded: SeriesString: '+ShowCookie);
  var resultS = ShowCookie.split('Season=')[1].split('&Episode=')[0];//Get Season and Episode from Cookie
  var resultE = ShowCookie.split('Episode=')[1];
  SelectElement('SeasonSelection',resultS);//Set Selection
  var element = document.getElementById('SeasonSelection');
  SelectElement('EpisodeSelection',resultE);
  var element = document.getElementById('EpisodeSelection');
  element.onchange('getPlayerByMirror');//call Player to Activate it!!!!


  console.log("SETtING: "+TvShow+": S"+resultS+' E'+resultE);
};

 function SelectElement(elemId,valueToSelect)
 {
     var element = document.getElementById(elemId);
     element.value = valueToSelect;
     element.click();
 }
