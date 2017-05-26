$().ready(function(){
    function InfoViewModel(){
        self = this;
        this.data = ko.observable();
        this.title = ko.observable("");
        this.location = ko.observable("");
        this.eventDate = ko.observable("");
        this.species = ko.observable("");
        this.description = ko.observable("");
        this.image = "";

        this.submitLost = function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    title: this.title(),
                    location: this.location(),
                    eventDate: this.eventDate(),
                    species: this.species(),
                    description: this.description(),
                    image: this.image
                }),
                url: "/information/submitLost",
                contentType:'application/json',
                success: function(result) {
                    alert(result);
                },
                error: function(result) {
                    alert("connection error");
                }
            });
        };
        this.submitFound = function () {
            $.ajax({
                type: "POST",
                data: JSON.stringify({
                    title: this.title(),
                    location: this.location(),
                    eventDate: this.eventDate(),
                    species: this.species(),
                    description: this.description(),
                    image: this.image
                }),
                url: "/information/submitFound",
                contentType:'application/json',
                success: function(result) {
                    alert(result);
                },
                error: function(result) {
                    alert("connection error");
                }
            });
        };

        this.loadLost = function () {
            $.ajax({
                type: "GET",
                url: "/information/lost",
                contentType:'application/json',
                success: function(result) {
                    self.data(result);

                },
                error: function(result) {
                    self.signupErrorMsg("connection error");
                }
            });
        };
        this.loadFound = function () {
            $.ajax({
                type: "GET",
                url: "/information/found",
                contentType:'application/json',
                success: function(result) {
                    self.data(result);
                },
                error: function(result) {
                    self.signupErrorMsg("connection error");
                }
            });
        };
        $.ajax({
            type: "GET",
            url: "/information/lost",
            contentType:'application/json',
            success: function(result) {
                self.data(result);
            },
            error: function(result) {
                self.signupErrorMsg("connection error");
            }
        });
        if(document.getElementById('upinfo-body-upimg')) {
            document.getElementById('upinfo-body-upimg').onchange = function () {
                var file = document.getElementById('upinfo-body-upimg').files[0];
                if (file) {
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData(document.getElementById('upinfo-body-upimg-form'));
                    xhr.addEventListener("load", function () {
                        $('.upinfo-body-upimg').css('background-image', 'url(/image/' + file.name + ')');
                        self.image = '/image/' + file.name;
                    }, false);
                    xhr.open("POST", "/information/upImage");
                    xhr.send(fd);
                }
            };
        }
    }

    ko.applyBindings(new InfoViewModel());

    // var SetDOM = function(data, set){
    //     for(var i = 0, k = ''; i < data.length; i ++){
    //         var f = data[i]
    //         k += '<div class="information-page-num"><span class="title">'+f.title+'</span><p class="text">'+f.body.slice(100)+'</p><div class="information-page-data"><span><i class="fa fa-clock-o"></i>'+f.time+'</span><span><i class="fa fa-eye"></i>'+f.eye+'</span><span><i class="fa fa-commenting"></i>'+f.commenting+'</span></div></div>'
    //         if(i == data.length - 1){
    //             if(set == true){
    //                 var page = $('.information-page').html()
    //                 $('.information-page').html(page + k)
    //             }else{
    //                 $('.information-page').html(k)
    //             }
    //             $('.information-page').unbind()
    //             $('.information-page-num').click(function(){
    //                 location.href = 'http://' + location.host + '/DynamicDetails?DynamicId=' + $(this).attr('data-id')
    //             })
    //         }
    //     }
    // }
    // $('.information-page-switch button').click(function(){
    //     var data = $(this).attr('data')
    //     for(var i of $('.information-page-switch button')){
    //         var id = $(i).attr('id')
    //         if(id == 'information-page-switch-on'){
    //             $(i).attr('id', '')
    //         }else{
    //             $(i).attr('id', 'information-page-switch-on')
    //         }
    //     }
    //     var limit = $('#page-limit').val() == '' ? $('#page-limit').attr('placeholder') : $('#page-limit').val()
    //     $.get('/GetDynamic?module=information&type='+ data + '&limit=' + limit, function(data){
    //         SetDOM(data)
    //     })
    // })
    // $('.information-page-num').click(function(){
    //     location.href = 'http://' + location.host + '/DynamicDetails?DynamicId=' + $(this).attr('data-id')
    // })
    // $('#page-limit-next').click(function(){
    //     var limit = $('#page-limit').attr('placeholder') - ''
    //     $.get('/GetDynamic?module=information&type='+ $('.information-page-switch button').attr('data') + '&limit=' + limit, function(data){
    //         SetDOM(data)
    //         $('#page-limit').attr('placeholder', limit + 1)
    //         $('#page-limit').val(limit + 1)
    //     })
    // })
    // $('#page-limit').focus(function(){
    //     $(this).keyup(function(event){
    //         if (event.which == 13) {
    //             var limit = $('#page-limit').val()
    //             $.get('/GetDynamic?module=information&type='+ $('.information-page-switch button').attr('data') + '&limit=' + limit, function(data){
    //                 SetDOM(data)
    //                 $('#page-limit').attr('placeholder', limit)
    //                 $('#page-limit').val(limit)
    //             })
    //         }
    //     })
    // })

    // $('.upinfo-emit button').click(function(){
    //     var file = document.getElementById('upinfo-body-upimg').files[0]
    //     var type = $('.newmain-title').attr('data')
    //     var title = $('.upinfo-body-title').val()
    //     var body = $('.upinfo-body-note textarea').val()
    //     var time = Tools.GetTime()
    //     var img = '/updata/' + file.name
    //     $.post('/NewInformation', {
    //         type:type,
    //         title:title,
    //         body:body,
    //         time:time,
    //         img:img
    //     }, function(data){
    //         if(data != false){
    //             $.get('/GetDynamic?module=information&type='+ data + '&limit=1', function(data){
    //                 SetDOM(data)
    //             })
    //         }
    //     })
    // })

});