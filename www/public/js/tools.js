if(typeof Tools === 'object'){

    console.error('内部函数错误！！！ => [object : Tools]')

}else{

    const Tools = function(){
        this.GetTime = () => {
            const myDate = new Date()
            `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`
        }
        this.TypeTime = (time) => {
            const myDate = new Date()
            const dataT = time.split('-')
            if(Number(dataT[0]) > myDate.getFullYear()){
                return true
            }else{
                if(Number(dataT[1]) > myDate.getMonth() + 1){
                    return true
                }else{
                    if(Number(dataT[2]) > myDate.getDate()){
                        return true
                    }else{
                        return false
                    }
                }
            }
        }
        this.disableStylesheet = (name, type) => {
            if(typeof name === "number"){
                document.styleSheets[name].disabled = type
            }else{
                const sheets = document.querySelectorAll(name)
                for(var i = 0; i < sheets.length; i++){
                    sheets[i].disabled = type
                }
            }
        }
        this.loadjscssfile = function(arr) {
            for(let i = 0; i < arr.length; i++){
                let name = arr[i].split('.')
                let filetype = name[(name.length - 1 == 0) ? 0 : name.length - 1]
                if(filetype == 'js'){
                    let fileref = document.createElement('script')
                    fileref.setAttribute('type', 'text/javascript')
                    fileref.setAttribute('src', arr[i])
                }else
                if(filetype == 'css'){
                    let fileref = document.createElement('link')
                    fileref.setAttribute('rel', 'stylesheet')
                    fileref.setAttribute('type', 'text/css')
                    fileref.setAttribute('href', arr[i])
                }
                if(typeof fileref != 'undefined'){
                    document.getElementsByTagName('head')[0].appendChild(fileref)
                }
            }
        }
        this.Notification = function(){
            const Index = this
            this.config = new Object()
            this.Module = (type) => {
                this.config.error = type.error
                this.config.log = type.log
                this.config.info = type.info
                this.config.icon = type.icon
                Notification && Notification.requestPermission()
            }
            this.To = (name, type, body) => {
                if(Notification){
                    const icon = (Index.config[type] != undefined) ? Index.config[type] : Index.config.icon
                    const age = {"icon": icon,"body": body}
                    if(Notification.permission === "granted"){
                        new Notification(name,age)
                    }else 
                    if(Notification.permission !== 'denied'){
                        Notification.requestPermission((permission) => {
                            if(permission === "granted"){
                                new Notification(name,age)
                            }
                        })
                    }
                }else{
                    alert(type + ' => ' + name + ' : [ ' + body + ' ]')
                }
            }
            return this
        }
        // 抛出所有方法
        return this
    }

}
