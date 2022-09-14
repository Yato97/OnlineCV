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
const selector_footer = document.getElementsByClassName("selector-footer")[0];

const endLine = document.getElementById("ref");
const links = document.getElementsByClassName("link");
const container_link = document.getElementsByClassName("container-link")[0];
const inner_links = document.getElementsByClassName("inner-link");
const linktop = document.getElementById("light-link-top");
const linkleft = document.getElementById("light-link-left");
const linkright = document.getElementById("light-link-right");
const lienTitle = document.getElementById("liens");

var displayed = false;
var displayedLink = false;

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
    footer_border_top.style.marginLeft = footer.getBoundingClientRect().width/2+"px";
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

function displayFooter() {
    footer_border_right.style.marginLeft = footer.getBoundingClientRect().width-2+"px";
    footer_border_bot.style.marginTop = footer.getBoundingClientRect().height-2+"px";
    selector_footer.style.opacity = "1";
    footer_border_top.style.opacity = "1";
    footer.style.opacity = "1";
    footer_border_top.style.width = footer.getBoundingClientRect().width-2+"px";
    footer_border_top.style.marginLeft = "0px";

    setTimeout(displayBorderFooter, 800);
}

function displayBorderFooter() {
    footer_border_left.style.opacity = "1";
    footer_border_right.style.opacity = "1";
    footer_border_left.style.height = footer.getBoundingClientRect().height-2+"px";
    footer_border_right.style.height = footer.getBoundingClientRect().height-2+"px";
    setTimeout(displayBottomrFooter, 800);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
   
function displayBottomrFooter() {
    footer_border_bot.style.opacity = "1";
    footer_border_bot.style.width = footer.getBoundingClientRect().width-2+"px";
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

function removeFooter() {
    selector_footer.style.opacity = "0";
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
    footer_border_top.style.marginLeft = footer.getBoundingClientRect().width/2+"px";

}


function displayLinkTop() {
    endLine.style.opacity = "1";
    container_link.style.opacity = "1";
    linktop.style.opacity = "1";
    lienTitle.style.opacity = "1";
    linktop.style.width = "50%";
    linktop.style.transform = "translateX(-50%)";
    setTimeout(displayLinkBorder, 800);
}

function displayLinkBorder() {
    linkleft.style.left = linktop.getBoundingClientRect().x+"px";
    linkright.style.left = linktop.getBoundingClientRect().width+linktop.getBoundingClientRect().x-2+"px";
    linkleft.style.opacity = "1";
    linkright.style.opacity = "1";
    linkleft.style.height = "5.5em";
    linkright.style.height = "5.5em";
    setTimeout(displayLink, 800);
}

function displayLink() {
    for (let index = 0; index < links.length; index++) {
        links.item(index).style.opacity = "1";
        inner_links.item(index).transform = "rotateY(180deg)";
    }
}

function reserLinks() {
    linkleft.style.opacity = "0";
    linkright.style.opacity = "0";
    linkleft.style.height = "0em";
    linkright.style.height = "0em";
    endLine.style.opacity = "0";
    linktop.style.opacity = "0";
    lienTitle.style.opacity = "0";
    linktop.style.width = "0%";
    container_link.style.opacity = "0";
    for (let index = 0; index < links.length; index++) {
        links.item(index).style.opacity = "0";
    }
}

window.addEventListener('scroll', function(e) {
  posY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            ticking = false;
            if (lineY >= endLine.getBoundingClientRect().top) {
                if (!displayedLink) {
                    displayLinkTop();
                    displayedLink = true;
                    line_color.style.opacity = "0";
                }
            } else {
                if (displayedLink) {
                    reserLinks();
                    displayedLink = false;
                    line_color.style.opacity = "1";
                }
            }
            if (lineY <= footer_border_top.getBoundingClientRect().bottom) {
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

function resize() {
    linkleft.style.left = linktop.getBoundingClientRect().x+"px";
    linkright.style.left = linktop.getBoundingClientRect().width+linktop.getBoundingClientRect().x-2+"px";
    footer_border_top.style.width = footer.getBoundingClientRect().width-2+"px";  
    footer_border_bot.style.width = footer.getBoundingClientRect().width-2+"px";  
    footer_border_right.style.marginLeft = footer.getBoundingClientRect().width-2+"px";  
}
  
window.onresize = resize;

init_pos_box()