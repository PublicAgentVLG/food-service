var express= require('express');
var app= express();
app.use(express.static(__dirname));

    // configurring the app
//app.configure(function(){
//    app.use(express.logger('dev'));     /*   'default','short','tiny','dev'   */
//    app.use(express.bodyParser())
//});

    //for any get request with url */SevenWonders , following function will execute

    /**
     * @params: req: request object, you can pass and read the parammeters
     *          res: response object, you can send objects in response
     */

app.get('/SevenWonders',function(req,res){
    var aItems=[
        {name:"Giza Necropl", location:"Giza,Egypt"},
        {name:"Great Wall of Chine", location:"Chine"}
    ];
    res.send(aItems);
});

app.post('/login',function(req,res){
    var oData=req;
    res.send(oData);
});

// specifying the port for the project. we can access  it now at localhost//4000
app.listen(4000);
console.log('Listening on port 4000');