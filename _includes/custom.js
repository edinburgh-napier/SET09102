
// Add this to the page before the content to be presented:
//
// {::nomarkdown}
// <span class="material-symbols-rounded slide slide-XXX" data-title="TITLE">present_to_all</span>
// {:/}
//
// Replace XXX with the tagName to be turned into a slide. The script selects the next tag of this type which must
// be a sibling of the sapn element.
//
// Replace TITLE with the required slide title

(function() {
    const slideOverlay = document.createElement("div");
    slideOverlay.id = "slide-overlay";
    slideOverlay.className = "slide-outer";

    const slideTitle = document.createElement("div");
    slideTitle.id = "slide-title";
    slideOverlay.appendChild(slideTitle);

    const slideContent = document.createElement("div");
    slideContent.id = "slide-content";
    slideContent.className = "slide-inner";
    slideOverlay.appendChild(slideContent);
    document.body.appendChild(slideOverlay);

    /* Prevent click event on a figure caption propagating to the parent */
    var elements = document.getElementsByTagName('figcaption');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = function(e) {
            console.log("STOP");
            e.stopPropagation();
        }
    }

    function getTargetClass(element) {
        if (element.tagName == "FIGURE") {
            return "figure";
        }
        else if (element.tagName == "CODE") {
            return "mermaid";
        }
        else {
            for (var i=0; i < element.classList.length; i++) {
                if (element.classList[i].startsWith("slide-")) {
                    return element.classList[i].substr(6);
                }
            }
        }
    }

    function next(element, tagName) {
        while (element.nextSibling) {
            if (element.nextSibling.tagName == tagName.toUpperCase()) {
                return element.nextSibling;
            }
            element = element.nextSibling;
        }
        return null;
    }

    function wrap(text, tag) {
        var openTag = "<" + tag + ">";
        var closeTag = "</" + tag + ">";
        return openTag + text + closeTag;
    }

    function prepareUl(element) {
        slideContent.style.width = "auto";
        slideContent.style.height = "auto";
        var processed_content = "";
        for (var j=0; j<element.children.length; j++) {
            var content = element.children[j].children[0].innerText;
            processed_content += wrap(content.split(":")[0], "li");
        }
        return wrap(processed_content, "ul");
    }

    function removeChildByType(element, tagName) {
        for (var i=0; i<element.children.length; i++) {
            if (element.children[i].tagName == tagName.toUpperCase()) {
                element.removeChild(element.children[i])
            }
        }
        return element;
    }

    function extractChildByTagName(element, tagName) {
        for (var i=0; i<element.children.length; i++) {
            if (element.children[i].tagName.toUpperCase() == tagName.toUpperCase()) {
                return element.children[i];
            }
        }
        return element;
    }

    function prepareDiv(element) {
        return removeChildByType(element, "button").outerHTML;
    }

    function wide(width, height) {
        if (width / (window.innerWidth * 0.9) > height / (window.innerHeight * 0.75)) {
            return true;
        }
        return false;
    }

    function prepareFigure(element, imageType) {
        const slideContent = document.getElementById("slide-content");
        var extractedImage = extractChildByTagName(element, imageType);
        var scaleWidth = false;
        if (imageType == "img") {
            scaleWidth = wide(extractedImage.width, extractedImage.height);
        }
        else if (imageType == "svg") {
            var viewBox = extractedImage.getAttribute("viewBox").split(" ");
            scaleWidth = wide(viewBox[2], viewBox[3]);
        }
        if(scaleWidth) {
            slideContent.style.width = (window.innerWidth * 0.9).toString() + "vw";
            extractedImage.classList.add("slide-img-wide");
        }
        else {
            slideContent.style.height = (window.innerHeight * 0.75).toString() + "vh";
            extractedImage.classList.add("slide-img-high");
        }
        return extractedImage.outerHTML;
    }

    function CreateSlideContent(element, tagName) {
        slideContent.style.width = "auto";
        slideContent.style.height = "auto";
        switch(tagName) {
            case "ul": return prepareUl(element); break;
            case "div": return prepareDiv(element); break;
            case "figure": return prepareFigure(element, "img"); break;
            case "mermaid": return prepareFigure(element, "svg"); break;
            default: return element.innerHTML;
        }
    }

    function enableSlide() {
        var targetClass = getTargetClass(this);
        var targetElement = null;
        var titleText = null;

        if (targetClass == "figure") {
            targetElement = this;
            titleText = extractChildByTagName(this, "img").dataset.title;
        }
        else if (targetClass == 'mermaid') {
            targetElement = this;
            // titleText = extractChildByTagName(extractChildByTagName(this, 'svg'), "text").innerHTML;
            titleText = this.parentElement.dataset.title;
        }
        else {
            targetElement = next(this, targetClass);
            titleText = this.dataset.title;
        }

        var slideOverlay = document.getElementById("slide-overlay");
        var slideTitle = document.getElementById("slide-title");
        var slideContent = document.getElementById("slide-content");

        slideContent.innerHTML = CreateSlideContent(targetElement, targetClass);
        if (titleText) {
            slideTitle.innerHTML = titleText;
        }
        else {
            slideTitle.innerHTML = extractChildByTagName(this, "figCaption").innerHTML;
        }
        slideOverlay.classList.toggle("show");
        document.onkeydown = function (e) {
            e = e || window.event;
            var slideOverlay = document.getElementById("slide-overlay");
            slideOverlay.classList.toggle("show");
            document.onkeydown = null;
        };
    }


    var elements = document.getElementsByClassName('slide');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = enableSlide;
    }

    var elements = document.getElementsByTagName('figure');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = enableSlide;
    }

    var elements = document.getElementsByClassName('language-mermaid');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = enableSlide;
    }
})();
