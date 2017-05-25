if(typeof Worker == 'undefined'){
    
    "use strict"

    const childProcess = require('child_process')
    const fs = require('fs')
    const events = require('events')
    const IndexEvent = new events.EventEmitter()
    let Worker = childProcess.fork('./main.js')
    let config = JSON.parse(fs.readFileSync('./config.json'))
    const Event = new Object()
    let Restart = true
    
    IndexEvent.on('OpenAgent', () => {
        const HTTP_SERVER = require('http').createServer((request, response) => {
            if(request.headers.key == config.admin.key){
                Restart = true
                IndexEvent.emit('fork')
                response.write('true')
            }else{
                response.write('false')
            }
        }).listen(7777)
        IndexEvent.on('OffAgent', () => HTTP_SERVER.close() )
    })
    IndexEvent.on('fork', () => { 
        IndexEvent.emit('OffAgent')
    })
    
    // 接收到子进程发送的消息
    Worker.on('message', (data) => IndexEvent.emit('WorkerData', data))
    // fork进程重启
    Worker.on('exit', (code) => {
        if(Restart == true){
            Worker = childProcess.fork('./main.js')
            config = JSON.parse(fs.readFileSync('./config.json'))
        }else
        if(Restart == false){
            IndexEvent.emit('OpenAgent')
        }
    })
    
    // 指令处理函数
    Event['Kill'] = () => {
        Restart = false
        Worker.kill()
    }
    Event['Restart'] = () => {
        Restart = true
        Worker.kill()
    }
    IndexEvent.on('WorkerData', (data) => {
        Event[data.Event] && Event[data.Event]()
    })
    
}