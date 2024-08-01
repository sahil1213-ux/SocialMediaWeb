import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "./config";
import { URL } from "url";
import { INewPost, IUpdatePost, IUpdateUser } from "@/types";
import storageServices from "./StorageServices";


class DatabaseServices {
  //   databases;
  //   bucket;
  //   // avatar;
  //   constructor() {

  //     databases = new Databases(client);
  //     console.log('Databases initialized:', databases); // Debugging log

  //     bucket = new Storage(client);
  //     console.log('Storage initialized:', bucket); // Debugging log
  // }

    async saveUserToDB(user: {
        accountID: string;
        username: string;
        email: string;
        imageUrl: URL;
        name: string;
    }) {
        try {
            const newUser = await databases.createDocument(appwriteConfig.databaseID, appwriteConfig.usersCollectionID,ID.unique(), user);
            return newUser;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getCurrentUser(currentAccount) {
     return await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.usersCollectionID,
        [Query.equal("accountID", currentAccount.$id)]
      );
    }

// ============================== CREATE POST
    async createPost(post: INewPost) {
        try {
          // Upload file to appwrite storage
          const uploadedFile = await storageServices.uploadFile(post.file[0]);
      
          if (!uploadedFile) throw Error;
      
          // Get file url
          const fileUrl = storageServices.getFilePreview(uploadedFile.$id);
          if (!fileUrl) {
            await storageServices.deleteFile(uploadedFile.$id);
            throw Error;
          }
      
          // Convert tags into array
          const tags = post.tags?.replace(/ /g, "").split(",") || [];
      
          // Create post
          const newPost = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            ID.unique(),
            {
              creator: post.userId,
              caption: post.caption,
              imageUrl: fileUrl,
              location: post.location,
              tags: tags,
              imageID: uploadedFile.$id,
            }
          );
      
          if (!newPost) {
            await storageServices.deleteFile(uploadedFile.$id);
            throw Error;
          }
      
          return newPost;
        } catch (error) {
          console.log(error);
        }
      }

      // ============================== GET POSTS
       async searchPosts(searchTerm: string) {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            [Query.search("caption", searchTerm)]
          );
      
          if (!posts) throw Error;
      
          return posts;
        } catch (error) {
          console.log(error);
        }
      }

// ============================== GET INFINITE POSTS
        async getInfinitePosts({pageParam}: {pageParam: number}) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];
           
            if (pageParam) {
                queries.push(Query.cursorAfter(pageParam.toString()));
              }

              try {
                const posts = await databases.listDocuments(
                  appwriteConfig.databaseID,
                  appwriteConfig.postsCollectionID,
                  queries
                );
            
                if (!posts) throw Error;
            
                return posts;
              } catch (error) {
                console.log(error);
              }
  }
      
          // ============================== GET POST BY ID
 async getPostById(postId?: string) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      postId
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE POST

// ============================== UPDATE POST
 async updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await storageServices.uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = storageServices.getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await storageServices.deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //  Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await storageServices.deleteFile(image.imageId);
      }

      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await storageServices.deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE POST
 async deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) return;

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      postId
    );

    if (!statusCode) throw Error;

    await storageServices.deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== LIKE / UNLIKE POST
 async likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SAVE POST
 async savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.savesCollectionID,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    
    
    if (!updatedPost) throw Error;
    console.log("Saved Post", );
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE SAVED POST
 async deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseID,
      appwriteConfig.savesCollectionID,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER'S POST
 async getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
 async getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.postsCollectionID,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}


// ============================== GET USERS
 async getUsers(limit?: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseID,
      appwriteConfig.usersCollectionID,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
 async getUserById(userId?: string) {
  if (!userId) return;

  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseID,
      appwriteConfig.usersCollectionID,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
    }
  }

// ============================== UPDATE USER
 async updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await storageServices.uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = storageServices.getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await storageServices.deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseID,
      appwriteConfig.usersCollectionID,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await storageServices.deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await storageServices.deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
}

const databaseServices = new DatabaseServices();
async function logRecentPosts() {
  try {
      const recentPosts = await databaseServices.getRecentPosts();
      console.log("getRecentPosts", recentPosts);
  } catch (error) {
      console.error("Error fetching recent posts:", error);
  }
}

logRecentPosts();

export default databaseServices;



/**
 *     async searchPosts(searchTerm: string) {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.postsCollectionID,
            [
              Query.or([
                Query.search("caption", searchTerm),
                Query.search("creator", searchTerm)
              ])
            ]
          );
      
          if (!posts) throw Error;
      
          return posts;
        } catch (error) {
          console.log(error);
        }
      }
 */