import {Avatars, ID } from "appwrite";
import { account, client } from "./config";
import { INewUser } from "../types";
import databaseServices from "./DatabaseServices";

class AuthServices {
    avatar;

    constructor(){
        this.avatar = new Avatars(client);
    }
    
     async  createUserAccount(user: INewUser) {
        try {
          const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
          );
      
          if (!newAccount) throw Error;
      
          const avatarUrl = this.avatar.getInitials(user.name);
      
          const newUser = await databaseServices.saveUserToDB({
            accountID: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
          });
      
          return newUser;
        } catch (error) {
          console.log(error);
          return error;
        }
      }

// ============================== SIGN IN
 async  signInAccount(user: { email: string; password: string }) {
    try {
      const session = await account.createEmailPasswordSession(user.email, user.password);
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }


   async getCurrentUser() {
    
    
    try {
      const currentAccount = await account.get();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databaseServices.getCurrentUser(account);
  
      if (!currentUser) throw Error;
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  

    async logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log("error occurred in logout",error);
        }
    }
}

const authService = new AuthServices();

export default authService;
// 12345678
// sahila@gmail.com

/**
 *     async createAccount(user: INewUser) {
        try {
         const userAccount =  await this.account.create(ID.unique(), user.email, user.password, user.name);
        if(!userAccount) throw Error("User account not created");

         const avatarUrl = this.avatar.getInitials(user.name);
                 // Store session in local storage
        localStorage.setItem("cookieFallback", JSON.stringify(userAccount));

            if(!avatarUrl) throw Error("Avatar not created");
            databaseServices.saveUserToDB({
                accountID: userAccount.$id,
                username: user.username,
                email: user.email,
                imageUrl: avatarUrl,
                name: user.name,
                password: user.password
            })
            return userAccount;
        } catch (e) {
           console.log("error occurred in create account",e);
           return e;
        }
    }



          async getCurrentUser() {
        try {
          
            const currentAccount = await account.get();
            if (!currentAccount) throw new Error("User not found");
    
            const user = await databaseServices.databases.listDocuments(
                appwriteConfig.databaseID,
                appwriteConfig.usersCollectionID,
                [Query.equal("accountID", currentAccount.$id)]
            );
    
            if (!user || user.documents.length === 0) throw new Error("User not found");
            return user.documents[0];
    
        } catch (error) {
            if (error instanceof AppwriteException && error.code === 401) {
                console.log("Unauthorized: The current user is not authorized to perform the requested action.");
            } else {
                console.log("An error occurred:", error);
            }
        }
    }
 */
