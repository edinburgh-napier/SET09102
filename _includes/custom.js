// Add this to the page before the content to be presented:
//
// ##### <span class="material-symbols-rounded">present_to_all</span> {#slide1 .slide}
//
// The id (#slide1) must be unique on the page. It is used to find the next element which supplies the content for the slide

window.onload = function() {
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

    var elements = document.getElementsByClassName('slide');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = function() {
            var content = document.querySelector('#' + this.id + ' + blockquote');
            if (content == null)
                var content = document.querySelector('#' + this.id + ' + ul');
            if (content == null)
                var content = document.querySelector('#' + this.id + ' + ol');
            if (content == null)
                var content = document.querySelector('#' + this.id + ' + table');
            if (content == null)
                content = document.querySelector('#' + this.id + ' + div');

            console.log('#' + this.id + ' + blockquote, #' + this.id + ' + ul, #' + this.id + ' + ol, #' + this.id + ' + div');
            console.log(content);
            var titleText = document.querySelector('#' + this.id + ' > .slide-title-text');
            if (titleText == null)
                titleText = document.querySelector('#' + this.id + '-caption');
            console.log(titleText);
            var slideOverlay = document.getElementById("slide-overlay");
            var slideTitle = document.getElementById("slide-title");
            var slideContent = document.getElementById("slide-content");
            slideContent.innerHTML = content.outerHTML;
            if (titleText)
                slideTitle.innerHTML = titleText.innerHTML;
            slideOverlay.classList.toggle("show");
        }
    }

    var elements = document.getElementsByTagName('figure');
    for(var i = 0; i < elements.length; i++) {
        var el = elements[i];
        el.onclick = function() {
            var slideOverlay = document.getElementById("slide-overlay");
            var slideContent = document.getElementById("slide-content");
            var img = null;
            var caption = null;
            var descendents = this.getElementsByTagName('*')
            for(var i=0; i<descendents.length;i++) {
                if(descendents[i].tagName === 'IMG') {
                    img = descendents[i];
                }
                if(descendents[i].tagName === 'FIGCAPTION') {
                    caption = descendents[i];
                    break;
                }
            }
            slideContent.innerHTML = img.outerHTML;
            slideTitle.innerHTML = caption.innerHTML;
            slideOverlay.classList.toggle("show");
        }
    }

}
