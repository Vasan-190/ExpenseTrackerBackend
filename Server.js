const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
const PORT=5555
app.use(express.json());
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://vasan:Sellakannu18@cluster0.7nglaqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Its connected")
})
.catch(()=>{
    console.log("Not connectes")
})
const studentSchema=new mongoose.Schema({
    title:{
        type:String,
    },  
    amount:{
        type:Number,
    }
})
const Student=mongoose.model("Student",studentSchema)
app.post("/add",async (req,res)=>{
try {
        const{title,amount}=req.body
    const newstudent=new Student({title,amount})
    await newstudent.save()
    res.json("Success")
} catch (error) {
    res.json({details:error.message})
}
 
})
app.get("/",async (req,res)=>{
 const students=await Student.find();
    res.json(students)

})
app.delete("/delete/:id",async(req,res)=>{
try {
        const{id}=req.params
    const students=await Student.findByIdAndDelete(id)
    const studentss=await Student.find();
     return res.json({message:"user deleted succesfully",studentss})
} catch (error) {
     res.json({details:error.message})
}
    
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
