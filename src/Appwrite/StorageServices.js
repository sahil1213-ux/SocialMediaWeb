import { ID, ImageGravity } from "appwrite";
import { appwriteConfig, storage } from "./config";
class StorageServices {
    // bucket;
    // constructor() {
    //     this.bucket = new Storage(client);
    // }
    // ============================== UPLOAD FILE
    async uploadFile(file) {
        try {
            const uploadedFile = await storage.createFile(appwriteConfig.storageID, ID.unique(), file);
            return uploadedFile;
        }
        catch (error) {
            console.log(error);
        }
    }
    // ============================== GET FILE URL
    getFilePreview(fileId) {
        try {
            const fileUrl = storage.getFilePreview(appwriteConfig.storageID, fileId, 2000, 2000, ImageGravity.Top, 100);
            if (!fileUrl)
                throw Error;
            return fileUrl;
        }
        catch (error) {
            console.log(error);
        }
    }
    // ============================== DELETE FILE
    async deleteFile(fileId) {
        try {
            await storage.deleteFile(appwriteConfig.storageID, fileId);
            return { status: "ok" };
        }
        catch (error) {
            console.log(error);
        }
    }
}
const storageServices = new StorageServices();
export default storageServices;
