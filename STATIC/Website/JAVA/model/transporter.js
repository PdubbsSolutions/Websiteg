let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'PDubbs Solutions | Zoom 1:1 Session Booking',
    text: 'Thank you ${name}! Your 1:1 Zoom Session with PDubbs Solutions has been scheduled for ${date} at ${time}.'
};
transporter.sendMail(mailOptions, (error, info) =>{
    if (error){
        return res.status(500).send('Error booking session');
    }
    res.send('Session Booked Successfully');
});
app.post('/request-partnership', ensureAuthenticated, (req, res) =>{
    const {companyName, email, message, date} = req.body;
    res. send('Thank you ${companyName}, your partnership request successfully sent to PDubbs Solutions!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}');
});