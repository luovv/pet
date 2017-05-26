$().ready(function(){
    function DetailViewModel(){
        self = this;
        this.myemail = ko.observable();
        this.message = ko.observable();
        this.commentContent = ko.observable();
        this.submitEmail = function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    myemail: this.myemail(),
                    message: this.message(),
                    email: document.getElementById('detail-email').value
                }),
                url: "/information/sendEmail",
                contentType:'application/json',
                success: function(result) {
                    alert("Your message has been sent");
                },
                error: function(result) {
                    alert("connection error");
                }
            });
        };
        this.submitComment = function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    content: this.commentContent(),
                    rid: document.getElementById('comment-rid').value
                }),
                url: "/information/submitComment",
                contentType:'application/json',
                success: function(result) {
                    alert("success");
                },
                error: function(result) {
                    alert("connection error");
                }
            });
        };
        this.updateStatus = function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    uid: document.getElementById('comment-uid').value,
                    rid: document.getElementById('comment-rid').value
                }),
                url: "/information/updateStatus",
                contentType:'application/json',
                success: function(result) {
                    alert("success");
                },
                error: function(result) {
                    alert("connection error");
                }
            });
        };
    }
    ko.applyBindings(new DetailViewModel());

});