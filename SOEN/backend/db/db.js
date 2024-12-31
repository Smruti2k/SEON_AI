import mongoose from "mongoose";

console.log(process.env.MONGO_URI);

function connect() {
  mongoose.connect("mongodb+srv://smrutimallick979:" + process.env.MONGO_PASSWORD +"@cluster0.1jtmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((x)=>{
    console.log("connected to Mongo");
    
})
.catch((err) =>
{
    console.log("Error while connecting to mongo",err.message);
    
});
}

export default connect;
