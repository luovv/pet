$().ready(function(){
    $('.information-page-switch button').click(function(){
        var data = $(this).attr('data')
        for(var i of $('.information-page-switch button')){
            var id = $(i).attr('id')
            if(id == 'information-page-switch-on'){
                $(i).attr('id', '')
            }else{
                $(i).attr('id', 'information-page-switch-on')
            }
        }
        var limit = $('#page-limit').val() == '' ? $('#page-limit').attr('placeholder') : $('#page-limit').val()
        $.get('/GetDynamic?module=information&type='+ data + '&limit=' + limit, function(data){
            var k = ''
            for(var i = 0; i < data.length; i ++){
                const f = data[i]
                k += '<div class="information-page-num"><span class="title">'+f.title+'</span><p class="text">'+f.body.slice(100)+'</p><div class="information-page-data"><span><i class="fa fa-clock-o"></i>'+f.time+'</span><span><i class="fa fa-eye"></i>'+f.eye+'</span><span><i class="fa fa-commenting"></i>'+f.commenting+'</span></div></div>'
                if(i == data.length - 1){
                    $('.information-page').html(k)
                }
            }
        })
    })
})