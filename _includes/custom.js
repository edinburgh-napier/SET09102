
// Add this to the page before the content to be presented:
//
// ##### <span class="material-symbols-rounded">present_to_all</span> {#slide1 .slide}
//
// The id (#slide1) must be unique on the page. It is used to find the next element which supplies the content for the slide

(function() {
    const slideOverlay = document.createElement("div");
    slideOverlay.id = "slide-overlay";
    slideOverlay.className = "slide-outer";
    slideOverlay.onclick = function() {
        this.classList.toggle("show");
    }

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

    function prepare_ul(element) {
        console.log(element);
        var processed_content = "";
        for (var j=0; j<element.children.length; j++) {
            var content = element.children[j].children[0].innerText;
            processed_content += wrap(content.split(":")[0], "li");
            console.log(j, content.split(":")[0]);
        }
        // console.log(element.innerHTML);
        return wrap(processed_content, "ul");
    }

    function slide_content(element, tagName) {
        switch(tagName) {
            case "ul": return prepare_ul(element); break;
            default: return element.innerHTML;
        }
    }

    var elements = document.getElementsByClassName('slide');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = function() {
            var targetClass = getTargetClass(el);
            var targetElement = next(el, targetClass);
            console.log(targetElement);

            var titleText = el.dataset.title;
            // if (titleText == null)
            //     titleText = document.querySelector('#' + this.id + '-caption');
            console.log(titleText);

            var slideOverlay = document.getElementById("slide-overlay");
            var slideTitle = document.getElementById("slide-title");
            var slideContent = document.getElementById("slide-content");

            slideContent.innerHTML = slide_content(targetElement, targetClass);
            if (titleText)
                slideTitle.innerHTML = titleText;
            slideOverlay.classList.toggle("show");
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
