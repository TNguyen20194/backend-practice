import supabase from "../client/client.js";
import bcrypt from "bcrypt";

const userController = {
   async signIn(email, password) {
       
       const {data: existingUsers, error} = await supabase
       .from("users")
       .select()
       .eq("email", email);

       console.log(existingUsers)
       
       const userPasswordMatch = await bcrypt.compare(password, existingUsers[0].password);

       console.log(userPasswordMatch)

        // console.log(existingUsers, error)

        return {existingUsers, error};
    },

    async signUp(first_name, last_name, email, password) {

        const { data: existingUsers, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
    
        console.log("validate data:", existingUsers);

        if(existingUsers.length > 0) {
            return {data: existingUsers, insertError: "User already exists!"}
        };

        const hashedPassword = await bcrypt.hash(password, 10);

         const {data, error: insertError } = await supabase
        .from("users")
        .insert({
            first_name, last_name, email, password: hashedPassword
        })
        .select();

        console.log(data)

        return { data, insertError };
        }
};

export default userController;