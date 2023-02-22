const mongoose  = require('mongoose')

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
.then(()=>console.log("DB connection successfull!"))
.catch(err=>console.log(err))


