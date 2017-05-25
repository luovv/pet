// http server
module.exports = (web, io) => {

    web.get('/', (req, res) => {
        res.send(`<html>
                    <head>
                        <title>访问出错</title>
                    </head>
                    <body>
                        <h1>站点已停用</h1>
                        <p>本网站已停用，请联系管理员</p>
                    </body>
                  </html>`)
    })

    // 后台管理
    // web.get(`/${Index.Config.admin.key}${Index.Config.adminpath}`, (req, res) => {
        // res.sendFile(global.Index.RootPath + '/www/html/admin.html')
    // })

    // 获取cookie信息
    web.get('/cookie', (req, res) => {
        if(req.query.key == 'xivistudio'){
            Index.MongoDB.collection('cookie').find({"id": req.query.name }).toArray( (err, docs) => {
                if(docs.length == 1){
                    const NO = docs[0].cookienNo
                    Index.MongoDB.collection('cookieArray').find({"id": NO, "name":"cookie", "obj": req.query.name}).toArray( (err,docs) => {
                        if(docs.length == 1){
                            res.send(docs[0].data)
                        }
                    })
                }
            })
        }
    })
    
    // cookie信息出错
    web.get('/cookie-error', (req, res) => {
        if(req.query.key == 'xivistudio'){
            const name = req.query.name
            const dbKey = Index.MongoDB.collection('cookie')
            dbKey.find({"id": name}).toArray( (err, docs) => {
                if(docs.length == 1){
                    let newdocs = docs[0]
                    io('Request-error-callback', {magess:{data:req.query.name, id:docs[0].cookienNo, type: req.query.type}})
                    newdocs.cookienNo = (newdocs.cookienNo + 1 > newdocs.sum) ? 1: newdocs.cookienNo + 1
                    dbKey.updateOne({"id": name}, {$set: newdocs}, (err, result) => {
                        res.send(true)
                    })
                }
            })
        }
    })

}