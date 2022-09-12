const line_color = document.getElementsByClassName("line-color")[0];
const border_img = document.getElementsByClassName("border-img-container")[0];
const display_box = document.getElementsByClassName("display-box");
const display_span = document.getElementsByClassName("light-box");
const display_box_inner = document.getElementsByClassName("display-box-inner");
const selector = document.getElementsByClassName("selector");

const footer = document.getElementsByClassName("container-flex-p")[0];
const footer_border_top = document.getElementById("light-header-top");
const footer_border_left = document.getElementById("light-header-left");
const footer_border_right = document.getElementById("light-header-right");
const footer_border_bot = document.getElementById("light-header-bottom");
const footer_border = document.getElementsByClassName("light-footer");
const box_progress = document.getElementsByClassName("box-footer");
const progress = document.getElementsByClassName("progress");
const progress_number = document.getElementsByClassName("number");
var displayed = false;

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
            display_box.item(i).style.transition = "all 600ms";
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
    if (index%2 == 0) {
        display_box.item(index).style.transform = "translateY(50%)";
        display_span.item(index).style.marginLeft = "50%";
    } else {
        display_box.item(index).style.transform = "translateY(50%)";
        display_span.item(index).style.marginLeft = "50%";
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
    if (index%2 == 0) {
        display_span.item(index).style.marginLeft = "25%";
        display_span.item(index).style.width = "25%";
        display_box.item(index).style.transform = "translateY(0%)";
    } else {
        display_span.item(index).style.marginLeft = "50%";
        display_span.item(index).style.width = "25%";
        display_box.item(index).style.transform = "translateY(0%)";
    }
    display_box.item(index).style.opacity = "1";
    selector.item(index).style.opacity = "1";
    if (screenWidth > responsive) {
        display_span.item(index).style.opacity = "1";
    }
    index += 1;
}

function display_line(position_scroll) {
    if (position_scroll >= 0 || position_scroll < footer_border_top.getBoundingClientRect().top) {
        let string_pos = position_scroll;
        line_color.style.height = string_pos+"px";
        line_color.style.borderWidth = "2px";
        lineY = line_color.getBoundingClientRect().bottom
    }
    else {
        let string_pos = footer_border_top.getBoundingClientRect().top;
        line_color.style.height = string_pos+"px";
    }
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

function displayFooter() {
    turnOpacityBox(true);
    footer.style.opacity = "1";
    footer_border_top.style.width = "90%";
    footer_border_top.style.marginLeft = "0%";
    setTimeout(displayBorderFooter, 800);
}

function displayBorderFooter() {
    footer_border_left.style.height = "96.5%";
    footer_border_right.style.height = "96.5%";
    setTimeout(displayBottomrFooter, 800);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
   
function displayBottomrFooter() {
    footer_border_bot.style.width = "90%";
    setTimeout(displayBoxProgress(0), 200);
}
var progressTab = [88,72,65,95,90]
async function displayBoxProgress(i) {
    let index = i;
    if (index < box_progress.length) {
        box_progress.item(index).style.opacity = "1";
        progress.item(index).style.width = progressTab[index]+"%";
        progress_number.item(index).innerHTML =  progress.item(index).style.width;

        index++;
        await sleep(800);
        displayBoxProgress(index);
    }
}

function turnOpacityBox(state) {
    if (!state) {
    } else {
        footer_border_top.style.opacity = "1";
        footer_border_left.style.opacity = "1";
        footer_border_right.style.opacity = "1";
        footer_border_bot.style.opacity = "1";
    }
}

function removeFooter() {
    footer.style.opacity = "0";
    footer_border_left.style.height = "0%";
    footer_border_right.style.height = "0";
    footer_border_bot.style.width = "0%";
    footer_border_left.style.opacity = "0";
    footer_border_right.style.opacity = "0";
    footer_border_bot.style.opacity = "0";
    for (let index = 0; index < box_progress.length; index++) {
        box_progress.item(index).style.opacity = "0";
        progress.item(index).style.width = "0%";
        progress_number.item(index).innerHTML =  progress.item(index).style.width;
        
    }
    setTimeout(removeFooterTop,800);
}

function removeFooterTop() {
    footer_border_top.style.width = "0%";
    footer_border_top.style.marginLeft = "44.7%";

}

window.addEventListener('scroll', function(e) {
  posY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            ticking = false;
            if (lineY <= footer_border_top.getBoundingClientRect().bottom) {
                display_line(posY);
                if (displayed) {
                    removeFooter();
                    displayed = false;
                }
            } else {
                if (!displayed) {
                    displayFooter();
                    displayed = true;
                }
            }
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

init_pos_box()