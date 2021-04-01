import { Request, response, Response } from  'express';

class IndexController {

    public sendNotification (req:Request, _res: Response){

        const token = req.body.token;
        const transaction = req.body.transaction;
        const transaction_db = 10

        var code: Number = 0;
        var msg: String = "Error generico"

        //////////////////////////////////////////////////////////////////// 
         
        const request = require('request'); 
        var api = "http://localhost:3000/api/verify"; 
        var deviceInstance = {
           "token": token,
      }
        
       interface verify {
       verify: boolean;
       }
           
       request({
       url: api,
       method: "POST",
       headers: {"Accept": "application/json"},
       json: true,
       body: deviceInstance
       }, (err:Error, res: Response, body: verify) => {

           if (err) {
               return console.error('upload failed:', err);
           }

           if (res.statusCode !== 200){
               console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
               res.send('Error');
               return false;
           }

           if (body.verify) {
                if (transaction == transaction){

//////////////////////////////////////////////////////
                    var nodemailer = require('nodemailer');    
                    
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                        user: '-------@gmail.com',
                        pass: '------'
                        }
                    });
                    var mailOptions = {
                        from: '------@gmail.com',
                        to: '------@gmail.com',
                        subject: 'Aprovar transaccion',
                        text: 'Se solicita su permiso para efectuar el pago del cheque',
                        attachments: [{
                        'path': 'Test_Report/htmlReport.html',
                        }]
                    };
                    transporter.sendMail(mailOptions, (err: Error) => {
                        if (err) {
                        
                        return console.log(err);
                        }
                        //console.log('Mail sent: ' + info.response);
                        
                    });
                            

/////////////////////////////////////////////////



                    code = 20;
                    msg = "Se envio una notificacion al titular de la cuenta";
                }else{
                    code = 47;
                    msg = "Transaccion invalida";
                }
           }else{
               code = 53;
               msg = "Token invalido";
           }

           _res.writeHead(200, {"Content-Type": "application/json"});
           var json = JSON.stringify({
               value: true,
               msg: msg,
               code: code,
           });
           _res.end(json);
       });

    }

    

    public aproveTransaction (req:Request, _res: Response){
        
        const token = req.body.token;
        const answer = req.body.answer;

        var code: Number = 0;
        var msg: String = "Error generico"

        ////////////////////////////////////////////////////////////////////
         
         const request = require('request'); 
         var api = "http://localhost:3000/api/verify"; 
         var deviceInstance = {
            "token": token,
       }
         
        interface verify {
        verify: boolean;
        }
            
        request({
        url: api,
        method: "POST",
        headers: {"Accept": "application/json"},
        json: true,
        body: deviceInstance
        }, (err:Error, res: Response, body: verify) => {

            if (err) {
                return console.error('upload failed:', err);
            }

            if (res.statusCode !== 200){
                console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                res.send('Error');
                return false;
            }

            if (body.verify) {
                if (answer){
                    code = 20;
                    msg = "Se aprovo la transaccion";
                }else {
                    code = 48;
                    msg = "Se denego la transaccion";
                }
            }else{
                code = 53;
                msg = "Token invalido";
            }

            _res.writeHead(200, {"Content-Type": "application/json"});
            var json = JSON.stringify({
                value: true,
                msg: msg,
                code: code,
            });
            _res.end(json);
        });

    }
}

export const indexController = new IndexController();