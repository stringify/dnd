define("arale/dnd/1.0.0/dnd",["$","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events"],function(a,b,c){function d(a){switch(a.type){case"mousedown":1===a.which&&(e({target:a.target,pageX:a.pageX,pageY:a.pageY}),q===!0&&a.preventDefault());break;case"mousemove":q===!0&&f(),null!==r&&(g({pageX:a.pageX,pageY:a.pageY}),h(),a.preventDefault());break;case"mouseup":null!==r?(r.css("cursor","default"),r.focus(),r=null,i(),j(),v.trigger("dragend",v.get("element"),s),v=null,s=null):q===!0&&(v.get("proxy").remove(),q=!1,v=null);break;case"keydown":null!==r&&27===a.which&&(r.css("cursor","default"),r.focus(),r=null,j(!0),v.trigger("dragend",v.get("element"),s),v=null,s=null)}}function e(a){var b=null,c=null,d=null,e=m(a.target).parents().toArray();e.unshift(a.target),m.each(e,function(a,b){if(void 0!==m(b).data("dnd")){if(d=m(b).data("dnd"),d===!0)d=new l(b,m(b).data("config"));else{if(!(isNaN(parseInt(d))===!1&&parseInt(d)>0))return!0;d=p[parseInt(d)]}return!1}}),null!==d&&d.get("disabled")!==!0&&(v=d,b=v.get("element"),c=v.get("proxy"),c.css({position:"absolute",margin:0,left:0,top:0,visibility:"hidden"}),c.appendTo(b.parent()),c.data("originx",c.offset().left),c.data("originy",c.offset().top),c.css({left:b.offset().left-c.data("originx"),top:b.offset().top-c.data("originy")}),t=a.pageX-b.offset().left,u=a.pageY-b.offset().top,q=!0)}function f(){var a=v.get("element"),b=v.get("proxy"),c=v.get("visible"),d=v.get("dragCursor"),e=v.get("zIndex");c!==!0&&a.css("visibility","hidden"),b.css({"z-index":e,visibility:"visible",cursor:d}),b.focus(),w={},q=!1,r=b,v.trigger("dragstart",w,r,s)}function g(a){var b=v.get("containment"),c=v.get("axis"),d=a.pageX-t,e=a.pageY-u,f=r.data("originx");originy=r.data("originy"),offset=b.offset(),null===offset&&(offset={left:0,top:0}),"y"!==c&&(d>=offset.left&&d+r.outerWidth()<=offset.left+b.outerWidth()?r.css("left",d-f):d<=offset.left?r.css("left",offset.left-f):r.css("left",offset.left+b.outerWidth()-r.outerWidth()-f)),"x"!==c&&(e>=offset.top&&e+r.outerHeight()<=offset.top+b.outerHeight()?r.css("top",e-originy):e<=offset.top?r.css("top",offset.top-originy):r.css("top",offset.top+b.outerHeight()-r.outerHeight()-originy)),v.trigger("drag",r,s)}function h(){var a=(v.get("element"),v.get("drop")),b=v.get("dragCursor"),c=v.get("dropCursor"),d=r.offset().left+t,e=r.offset().top+u;null!==a&&(null===s?m.each(a,function(a,b){return k(b,d,e)===!0?(r.css("cursor",c),r.focus(),s=m(b),v.trigger("dragenter",r,s),!1):void 0}):k(s,d,e)===!1?(r.css("cursor",b),r.focus(),v.trigger("dragleave",r,s),s=null):v.trigger("dragover",r,s))}function i(){var a=v.get("element"),b=v.get("proxy"),c=v.get("revert"),d=b.data("originx");originy-b.data("originy"),null!==s&&(k(s,b)===!1&&c===!1&&(b.css("left",s.offset().left+(s.outerWidth()-b.outerWidth())/2-d),b.css("top",s.offset().top+(s.outerHeight()-b.outerHeight())/2-originy)),v.trigger("drop",w,a,s))}function j(a){var b=v.get("element"),c=v.get("proxy"),d=v.get("drop"),e=v.get("revert"),f=v.get("revertDuration"),g=v.get("visible"),h=c.offset().left-b.offset().left,i=c.offset().top-b.offset().top,j=c.data("originx");originy-c.data("originy"),e===!0||a===!0||null===s&&null!==d?(b.attr("style",b.data("style")),g===!1&&b.css("visibility","hidden"),c.animate({left:b.offset().left-j,top:b.offset().top-originy},f,function(){b.css("visibility",""),c.remove()})):("relative"===b.css("position")?(h=(isNaN(parseInt(b.css("left")))?0:parseInt(b.css("left")))+h,i=(isNaN(parseInt(b.css("top")))?0:parseInt(b.css("top")))+i):"absolute"===b.css("position")?(h=c.offset().left,i=c.offset().top):b.css("position","relative"),g===!1?(b.css({left:h,top:i,visibility:""}),c.remove()):b.animate({left:h,top:i},f,function(){c.remove()}))}function k(a,b,c){var d=m(a).offset();return null===d&&(d={left:0,top:0}),2===arguments.length?d.left<=m(b).offset().left&&d.left+m(a).outerWidth()>=m(b).offset().left+m(b).outerWidth()&&d.top<=m(b).offset().top&&d.top+m(a).outerHeight()>=m(b).offset().top+m(b).outerHeight():3===arguments.length?d.left<=b&&d.left+m(a).outerWidth()>=b&&d.top<=c&&d.top+m(a).outerHeight()>=c:void 0}var l=null,m=a("$"),n=a("arale/base/1.1.1/base"),o=0,p=[],q=!1,r=null,s=null,t=0,u=0,v=null,w={};l=n.extend({attrs:{element:{value:null,readOnly:!0,getter:function(a){return m(a).eq(0)}},containment:{value:document,getter:function(a){return m(a).eq(0)}},proxy:{value:null,getter:function(a){return null===a?null:m(a).eq(0)},setter:function(a){return null===a?this.get("element").clone():a}},drop:{value:null,getter:function(a){return null===a?null:m(a).eq(0)}},disabled:!1,visible:!1,axis:!1,revert:!1,revertDuration:500,dragCursor:"move",dropCursor:"copy",zIndex:9999},initialize:function(a,b){var c=null;(0===m(a).length||1!==m(a).get(0).nodeType)&&m.error("element error!"),b=m.extend({element:a},b),l.superclass.initialize.call(this,b),c=this.get("element"),null===this.get("proxy")&&this.set("proxy",c.clone()),void 0===c.data("style")&&(void 0===c.attr("style")?c.data("style",""):c.data("style",c.attr("style"))),c.data("dnd",++o),p[o]=this}}),l.open=function(){m(document).on("mousedown mousemove mouseup keydown",d)},l.close=function(){m(document).off("mousedown mousemove mouseup keydown",d)},l.open(),c.exports=l});
