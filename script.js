//AutoHideMirr = 'FIXED';

function getPlayerByMirror(Sender, AutoHideMirr) {
    //console.log('doing sth');//Debug
    AutoHideMirr = 'Fixed';//CHANGED hätt man wohl auf der Seite iwo einstellen können? ¯\_(ツ)_/¯
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
    console.log('sgeht')
    AutoHideMirr == 'Fixed';
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
            $('#MirHeadline').html('Kinox.to speichert <u>keine</u> Filme selber! Dieser Stream wird gehostet bei: <span class="grayed"><a target="_blank" rel="nofollow" href="' + Response.HosterHome + '"><span class="grayed">' + Response.HosterName + '</span></a></span>');
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
}
