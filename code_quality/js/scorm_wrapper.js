/* Simple SCORM 1.2 Wrapper */
var ScormProcess = {
    api: null,

    init: function() {
        // Look for the API in the current window or parents
        this.api = this.findAPI(window);
        if (!this.api && window.opener) this.api = this.findAPI(window.opener);

        if (this.api) {
            this.api.LMSInitialize("");
            console.log("SCORM: Connection Initialized");
        } else {
            console.error("SCORM: Could not find API adapter.");
        }
    },

    findAPI: function(win) {
        let findAttempts = 0;
        while (!win.API && win.parent && win.parent !== win && findAttempts < 10) {
            win = win.parent;
            findAttempts++;
        }
        return win.API;
    },

    setScore: function(score) {
        if (this.api) {
            this.api.LMSSetValue("cmi.core.score.raw", score.toString());
            this.api.LMSSetValue("cmi.core.lesson_status", score >= 80 ? "passed" : "completed");
            this.api.LMSCommit("");
        }
    },

    finish: function() {
        if (this.api) {
            this.api.LMSFinish("");
        }
    }
};
