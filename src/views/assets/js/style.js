function imgError(e){e.src="../img/undefined_avatar.png"}function backImgError(e){e.src="../img/undefined_back.png"}!function(e){"use strict";e(".js-fullheight").css("height",e(window).height()),e(window).resize(function(){e(".js-fullheight").css("height",e(window).height())}),e("#sidebarCollapse").on("click",function(){e("#sidebar").toggleClass("active")})}(jQuery),$(document).on("click",".dropdown-menu",function(e){e.stopPropagation()}),console.log("vCodes: Online - Coded by: Claudette#0241 & Void Development"),$(document).ready(function(){$("#analytics_referring").DataTable({dom:"<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>><'table-responsive'tr><'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",oLanguage:{oPaginate:{sPrevious:'<i class="fal fa-arrow-left"></i>',sNext:'<i class="fal fa-arrow-right"></i>'},sInfo:" ",sSearch:" ",sSearchPlaceholder:" ",sLengthMenu:" "},stripeClasses:[],lengthMenu:5,pageLength:5,aaSorting:[],drawCallback:function(){$(".dataTables_paginate > .pagination").addClass(" pagination-style-13 pagination-bordered")}}),$("#analytics_country").DataTable({dom:"<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>><'table-responsive'tr><'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",oLanguage:{oPaginate:{sPrevious:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',sNext:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'},sInfo:" ",sSearch:" ",sSearchPlaceholder:" ",sLengthMenu:" "},stripeClasses:[],lengthMenu:5,pageLength:5,aaSorting:[],drawCallback:function(){$(".dataTables_paginate > .pagination").addClass(" pagination-style-13 pagination-bordered")}})}),$('.dropdown-menu .submenu > a:not(a[href="#"])').on("click",function(){self.location=$(this).attr("href")}),$(document).ready(function(){$.fn.dataTable.ext.classes.sPageButton="btn btn-vcodes m-1 pt-1",$("#tableData").DataTable({language:{oPaginate:{sPrevious:'<i class="fal fa-arrow-left"></i>',sNext:'<i class="fal fa-arrow-right"></i>'},sInfo:"Page: _PAGE_/_PAGES_",sSearch:"",sSearchPlaceholder:"",sLengthMenu:""},stripeClasses:[],lengthMenu:10,pageLength:10})}),$(window).width()<992&&$(".dropdown-menu a").click(function(e){e.preventDefault(),$(this).next(".submenu").length&&$(this).next(".submenu").toggle(),$(".dropdown").on("hide.bs.dropdown",function(){$(this).find(".submenu").hide()})}),$(function(){$(".dropdown").hover(function(){$(this).addClass("open")},function(){$(this).removeClass("open")})}),$(document).ready(function(){var e=$("select[multiple]"),t=e.find("option"),n=$("<div />").addClass("selectMultiple"),o=$("<div />"),s=$("<ul />"),a=e.data("placeholder"),i=$("<span />").text(a).appendTo(o);t.each(function(){var e=$(this).text();$(this).is(":selected")?(o.append($("<a />").html("<em>"+e+"</em><i></i>")),i.addClass("hide")):s.append($("<li />").html(e))}),o.append($("<div />").addClass("arrow")),n.append(o).append(s),e.wrap(n),$(document).on("click",".selectMultiple ul li",function(e){var t=$(this).parent().parent(),n=$(this);if(!t.hasClass("clicked")){t.addClass("clicked"),n.prev().addClass("beforeRemove"),n.next().addClass("afterRemove"),n.addClass("remove");var o=$("<a />").addClass("notShown").html("<em>"+n.text()+"</em><i></i>").hide().appendTo(t.children("div"));o.slideDown(400,function(){setTimeout(function(){o.addClass("shown"),t.children("div").children("span").addClass("hide"),t.find("option:contains("+n.text()+")").prop("selected",!0)},500)}),setTimeout(function(){n.prev().is(":last-child")&&n.prev().removeClass("beforeRemove"),n.next().is(":first-child")&&n.next().removeClass("afterRemove"),setTimeout(function(){n.prev().removeClass("beforeRemove"),n.next().removeClass("afterRemove")},200),n.slideUp(400,function(){n.remove(),t.removeClass("clicked")})},600)}}),$(document).on("click",".selectMultiple > div a",function(e){var t=$(this).parent().parent(),n=$(this);n.removeClass().addClass("remove"),t.addClass("open"),setTimeout(function(){n.addClass("disappear"),setTimeout(function(){n.animate({width:0,height:0,padding:0,margin:0},300,function(){var e=$("<li />").text(n.children("em").text()).addClass("notShown").appendTo(t.find("ul"));e.slideDown(400,function(){e.addClass("show"),setTimeout(function(){t.find("option:contains("+n.children("em").text()+")").prop("selected",!1),t.find("option:selected").length||t.children("div").children("span").removeClass("hide"),e.removeClass()},400)}),n.remove()})},300)},400)}),$(document).on("click",".selectMultiple > div .arrow, .selectMultiple > div span",function(e){$(this).parent().parent().toggleClass("open")})});var $info=$(".tooltip");$info.each(function(){var e=$(this).data("tooltip");$(this).append('<span class="inner" >'+e+"</span>")});const mobileScreenn=window.matchMedia("(max-width: 990px )");$(document).ready(function(){$(".dashboard-nav-dropdown-toggle").click(function(){$(this).closest(".dashboard-nav-dropdown").toggleClass("show").find(".dashboard-nav-dropdown").removeClass("show"),$(this).parent().siblings().removeClass("show")}),$(".menu-toggle").click(function(){mobileScreenn.matches?$(".dashboard-nav").toggleClass("mobile-show"):$(".dashboard").toggleClass("dashboard-compact")})});
#particles-js {
    position: absolute;
    width: 100%;
    height: 65vh;
    z-index: -1;
    background-color: #2C2F33;
    background-image: none;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}
let isMobile;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|NetCast|SMART-TV|SmartTV/i.test(navigator.userAgent)) {
    
    isMobile = true;
} else {
    isMobile = false;
}

if (isMobile == true) moveToMobile();

/*function moveToMobile() {
  //replace this with the block i guess
    let nav = document.getElementById('nav');
    let navdiv = document.getElementById('navtext-div');
    let navtext = document.getElementById('navtext');
    let closebutton = document.getElementById('closeButton');
    let hamburguer = document.getElementById('hamburguer');
    let logomain = document.getElementById('logo-main-1');
    let author = document.getElementById('creper92yt')
    let mainbuttons = document.getElementById('main-buttons');
    let mainbuttons2 = document.getElementById('main-buttons-2');
    let mainbutton2 = document.getElementById('main-button-2')
    let mainbutton3 = document.getElementById('main-button-4')
    let info = document.getElementById('main-info-1');
    let info2 = document.getElementById('main-info-2');

    nav.style.padding = "50px 0 50px";
    navdiv.style.justifyContent = "none";
    navdiv.style.display = "grid";
    navdiv.style.textAlign = "center"
    navdiv.style.margin = "5px 0";

    
    let logomainheight = innerHeight/4

    logomainheight = Math.round(logomainheight)

    logomain.style.height = logomainheight + "px"

    mainbuttons.style.display = "grid";
    mainbuttons2.style.display = "grid";
    mainbutton2.style.marginTop = "20px";
    mainbutton3.style.marginTop = "20px";
    
    info.style.textAlign = "unset";
    info.style.maxWidth = "100%";
    info.style.maxWidth = "100%";


    info2.style.float = "unset";
    info2.style.maxWidth = "100%";



}
