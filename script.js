var today = new Date();
var expiry = new Date(today.getTime() + 180 * 24 * 3600 * 1000); // plus 180 days

function setCookie(name, value)
{
  console.log('LOG: set Cookie:'+name+' val:'+value);
  document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function getCookie(name)
{
  console.log('LOG: get Cookie:'+name);
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  console.log('LOG: got Cookie:'+name+' val:'+value);
  return (value != null) ? unescape(value[1]) : null;
}



function getEpisodeList(Sender) {
  console.log("LOG: getEpisodeLis");
    var Season = $(Sender).attr('value');
    var EpisodeList = $('#SeasonSelection > option[value=' + Season + ']').attr('rel');
    var Episodes = EpisodeList.split(",");
    $('#EpisodeSelection > option').remove();
    for (Episode in Episodes) {
        $('#EpisodeSelection').append('<option value="' + Episodes[Episode] + '">Episode ' + Episodes[Episode] + '</option>');
    }
    $('#AjaxStream').html('');
    $('#MirrorArea').html('');
    getMirrorsByEpisode($('#EpisodeSelection'));
    console.log("getEpisodeList: S"+Season+"E"+  $('#EpisodeSelection')+"  ");
}

function getPlayerByMirror(Sender, AutoHideMirr) {

  var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];//GEt TV SHow by html file
  var getReq = $(Sender).attr('rel');
  setCookie(TvShow, getReq);//CANT STORE OBJECTS

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
        console.log('LOG: Reading Episode: '+  $(Sender).val()+$(Sender).attr('rel'));//Debug
}

function getPlayerByMirror1ACCESSKEY(Sender, AutoHideMirr) {
console.log('LOG: getPlayerByMirrorACCESSKEY'+$(Sender).attr('rel'));

var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];//GEt TV SHow by html file
var getReq = $(Sender).attr('rel');
setCookie(TvShow, getReq);//CANT STORE OBJECTS

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



function toogleHosterList() {
  console.log('LOG: toogleHosterList');
    $('#ClickHelper').toggleClass('DowntoUp');
    if ($('#HosterList:visible').length == 0) {
        $('#HosterList').slideDown('fast');
        $('#MirHeadline').html($('#MirHeadline').attr('rel'));
    } else {
        $('#HosterList').slideUp('fast');
    }
    window.clearTimeout(TrashTimer);
}





window.onload = function() {
  console.log('LOG: ONLOADED');
  var TvShow = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split('.html')[0];

  var ShowCookie = getCookie(TvShow); //0A_Gifted_Man-1&Hoster=70&Mirror=2&Season=1&Episode=7

  console.log('Loaded: SeriesString: '+ShowCookie);
  var resultS = ShowCookie.split('Season=')[1].split('&Episode=')[0];
  var resultE = ShowCookie.split('Episode=')[1];

  SelectElement('SeasonSelection',resultS);
  SelectElement('EpisodeSelection',resultE);


      console.log("SETtING: "+TvShow+": "+resultS+'|'+resultE);


};

 function SelectElement(elemId,valueToSelect)
 {
     var element = document.getElementById(elemId);
     element.value = valueToSelect;
 }
// <select id="leaveCode" name="leaveCode">
//   <option value="10">Annual Leave</option>
//   <option value="11">Medical Leave</option>
//   <option value="14">Long Service</option>
//   <option value="17">Leave Without Pay</option>
// </select>
