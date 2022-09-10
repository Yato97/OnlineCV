const line_color = document.getElementsByClassName("line-color")[0];
const border_img = document.getElementsByClassName("border-img-container")[0];
const display_box = document.getElementsByClassName("display-box");
const display_span = document.getElementsByClassName("light-box");
const display_box_inner = document.getElementsByClassName("display-box-inner");
const selector = document.getElementsByClassName("selector");

var posY = 0;
var ticking = false;
var resizing = false;
var index = 0;
var len_display_box = display_box.length;
var lineY = 0;
var lastScroll = 0;
var scrollingDown = false;
var middle = line_color.getBoundingClientRect().x;
var screenWidth = window.innerWidth;
var responsive = 600;



function init_pos_box() {
    if (screenWidth < responsive) {
        for (let i = 0; i <= display_box.length; i++) {
            display_box.item(i).style.transition = "all 600ms"
            display_box.item(i).style.width = "100%";
            display_box.item(i).style.height = "0%";
        }
    }
    else {
        for (let i = 0; i < display_box.length; i++) {
            if (i%2 == 0) {
                display_box.item(i).style.transform = "translateY(50%)";
                display_span.item(i).style.marginLeft = "50%";
            } else {
                display_box.item(i).style.transform = "translateY(50%)";
                display_span.item(i).style.marginLeft = "50%";
            }
        }
    }
}

function reset_pos_box() {
    if (screenWidth < responsive) {
        display_box.item(index).style.width = "100%";
    }
    else {
        if (index%2 == 0) {
            display_box.item(index).style.transform = "translateY(50%)";
            display_span.item(index).style.marginLeft = "50%";
        } else {
            display_box.item(index).style.transform = "translateY(50%)";
            display_span.item(index).style.marginLeft = "50%";
        }
    }
    display_box.item(index).style.opacity = "0";
    display_span.item(index).style.opacity = "0";
    selector.item(index).style.opacity = "0";
    display_span.item(index).style.width = "0px";
    if (!index <= 0) {
        index-=1;
    }
}

function display_box_pos() {
    if (screenWidth < responsive) {
        display_box.item(index).style.width = "100%";
    }
    else {
        if (index%2 == 0) {
            display_span.item(index).style.marginLeft = "25%";
            display_span.item(index).style.width = "25%";
            display_box.item(index).style.transform = "translateY(0%)";
        } else {
            display_span.item(index).style.marginLeft = "50%";
            display_span.item(index).style.width = "25%";
            display_box.item(index).style.transform = "translateY(0%)";
        }
    }
    display_box.item(index).style.opacity = "1";
    selector.item(index).style.opacity = "1";
    if (screenWidth > responsive) {
        display_span.item(index).style.opacity = "1";
    }
    index += 1;
}

function display_line(position_scroll) {
    let string_pos = position_scroll;
    line_color.style.height = string_pos+"px";
    line_color.style.borderWidth = "2px";
    lineY = line_color.getBoundingClientRect().bottom
}

function display_scroll_box() {
    if (index >= 0 && index < len_display_box) {
        let display = display_span[index].getBoundingClientRect().top;
        let childBox = display_box_inner[index].children.item(0);
        let displayPosResponsive = childBox.getBoundingClientRect().top;
        let displayPos = 0;
        if (screenWidth < responsive) {
            displayPos = displayPosResponsive;
        }
        else {
            displayPos = display;
        }
        if (scrollingDown) {
            if (lineY >= displayPos) {
                display_box_pos();
            }
        } 
        else {
            if (lineY <= displayPos) {
                reset_pos_box();
            }
        }
    }
    else {
        index-=1;
    }
}

function reset_resize() {
    
}

window.addEventListener('scroll', function(e) {
  posY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            ticking = false;
            display_line(posY);
            display_scroll_box();   

            if (posY <= 1) {
                line_color.style.height = "0px";
                line_color.style.borderWidth = "0px"
            }
        });
            
    }

    if (lastScroll > posY) {
        scrollingDown = false;
    } else {
        scrollingDown = true;
    }
    lastScroll = posY;
    ticking = true;
});  

function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,200,event);
    };
}
window.addEventListener("resize",debounce(function(e){
    screenWidth = window.innerWidth;
    location.reload()
}));

init_pos_box()