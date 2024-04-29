const mongoose = require('mongoose');

 mongoose.connect("mongodb+srv://user:user@cluster0.zc2d5ak.mongodb.net/customerfeedback?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
 }
).then(db=>console.log("Db is connected")).catch(err=>console.log(err));