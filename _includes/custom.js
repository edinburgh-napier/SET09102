
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
        var classList = element.className.split(" ");
        for (var i=0; i < classList.length; i++) {
            if (classList[i].startsWith("slide-")) {
                return classList[i].substr(6);
            }
        }
        return null;
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
            console.log(element.children[i].tagName, tagName.toUpperCase());
            if (element.children[i].tagName == tagName.toUpperCase()) {
                element.removeChild(element.children[i])
            }
        }
        return element;
    }

    function extractChildByType(element, tagName) {
        for (var i=0; i<element.children.length; i++) {
            if (element.children[i].tagName == tagName.toUpperCase()) {
                return element.children[i];
            }
        }
        return element;
    }

    function prepareDiv(element) {
        return removeChildByType(element, "button").outerHTML;
    }

    function prepareFigure(element) {
        var extractedImage = extractChildByType(element, "img");
        var imageWidth = extractedImage.style.width;
        var imageHeight = extractedImage.style.height;
        if((imageWidth / window.innerWidth) > (imageHeight / (window.innerHeight * 0.8))) {
            slideContent.style.height = imageWidth / window.innerHeight * 0.8;
            extractedImage.classList.add("slide-img-high");
        }
        else {
            slideContent.style.width = window.innerWidth;
            extractedImage.classList.add("slide-img-wide");
        }
        return extractChildByType(element, "img").outerHTML;
    }

    function fitImg(element) {
        var imageWidth = element.style.width;
        var imageHeight = element.style.height;
        if((imageWidth / window.innerWidth) > (imageHeight / (window.innerHeight * 0.8))) {
            element.style.height = imageWidth / window.innerHeight * 0.8;
        }
        else {
            element.style.width = window.innerWidth;
        }
        return element;
    }

    function CreateSlideContent(element, tagName) {
        slideContent.style.width = "auto";
        slideContent.style.height = "auto";
        switch(tagName) {
            case "ul": return prepareUl(element); break;
            case "div": return prepareDiv(element); break;
            case "figure": return prepareFigure(element); break;
            default: return element.innerHTML;
        }
    }

    var elements = document.getElementsByClassName('slide');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = function() {
            var targetClass = getTargetClass(this);
            var targetElement = next(this, targetClass);
            console.log(targetElement);

            var titleText = el.dataset.title;
            // if (titleText == null)
            //     titleText = document.querySelector('#' + this.id + '-caption');
            console.log(titleText);

            var slideOverlay = document.getElementById("slide-overlay");
            var slideTitle = document.getElementById("slide-title");
            var slideContent = document.getElementById("slide-content");

            slideContent.innerHTML = CreateSlideContent(targetElement, targetClass);
            if (titleText)
                slideTitle.innerHTML = titleText;
            slideOverlay.classList.toggle("show");
            document.onkeydown = function (e) {
                e = e || window.event;
                var slideOverlay = document.getElementById("slide-overlay");
                slideOverlay.classList.toggle("show");
                document.onkeydown = null;
            };
        }
    }

    // var elements = document.getElementsByTagName('figure');
    // for(var i = 0; i < elements.length; i++) {
    //     var el = elements[i];
    //     el.onclick = function() {
    //         var slideOverlay = document.getElementById("slide-overlay");
    //         var slideContent = document.getElementById("slide-content");
    //         var img = null;
    //         var caption = null;
    //         var descendents = this.getElementsByTagName('*')
    //         for(var i=0; i<descendents.length;i++) {
    //             if(descendents[i].tagName === 'IMG') {
    //                 img = descendents[i];
    //             }
    //             if(descendents[i].tagName === 'FIGCAPTION') {
    //                 caption = descendents[i];
    //                 break;
    //             }
    //         }
    //         slideContent.innerHTML = img.outerHTML;
    //         slideTitle.innerHTML = caption.innerHTML;
    //         slideOverlay.classList.toggle("show");
    //     }
    // }
})();
