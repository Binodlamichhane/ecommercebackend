import nodemailer from 'nodemailer';
const sendEmail=async(options)=>{
    try{
        console.log('binod inside nodemailer');
    const transporter = nodemailer.createTransport({
        host:"sandbox.smtp.mailtrap.io",
        port:2525,
        auth:{
            user:'bfafb6dfbba489',
            pass:'8020a2730b7ad5'
        }
    });
    console.log('options data',options);
     await transporter.sendMail({
        from:'binodlamichhane9866@gmail.com',
        to:options.email,
        subject:options.subject,
        text:options.message

    })
}catch(error){
    console.log("error in sandbox",error);
    return error;
}

}
export default sendEmail;