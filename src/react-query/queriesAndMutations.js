import authService from '@/Appwrite/AuthServices';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import databaseServices from '@/Appwrite/DatabaseServices';
// *3 Steps to use react-query, Step 1 is to create a query or mutation 
// why we made these functions ?
// 1. We can use these functions in any component
export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user) => authService.createUserAccount(user),
    });
};
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user) => authService.signInAccount(user),
    });
};
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: () => authService.logout(),
    });
};
// ============================================================
// POST QUERIES
// ============================================================
export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryFn: databaseServices.getInfinitePosts,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getNextPageParam: (lastPage) => {
            // If there's no data, there are no more pages.
            if (lastPage && lastPage.documents.length === 0) {
                return null;
            }
            // Use the $id of the last document as the cursor.
            const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
            return lastId;
        },
        initialPageParam: undefined,
    });
};
export const useGetUserPosts = (userId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
        queryFn: () => databaseServices.getUserPosts(userId),
        enabled: !!userId,
    });
};
export const useSearchPosts = (searchTerm) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => databaseServices.searchPosts(searchTerm),
        enabled: !!searchTerm,
    });
};
export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: databaseServices.getRecentPosts,
    });
};
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post) => databaseServices.createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
    });
};
export const useGetPostById = (postId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => databaseServices.getPostById(postId),
        enabled: !!postId,
    });
};
export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post) => databaseServices.updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
        },
    });
};
export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, imageId }) => databaseServices.deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        },
    });
};
export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, likesArray, }) => databaseServices.likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};
export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, postId }) => databaseServices.savePost(userId, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (savedRecordId) => databaseServices.deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
        },
    });
};
// ============================================================
// USER QUERIES
// ============================================================
export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: authService.getCurrentUser,
    });
};
export const useGetUsers = (limit) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => databaseServices.getUsers(limit),
    });
};
export const useGetUserById = (userId) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
        queryFn: () => databaseServices.getUserById(userId),
        enabled: !!userId,
    });
};
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => databaseServices.updateUser(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
            });
        },
    });
};
/**
 * export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: async () => {
      // Replace this with your actual query function
      const result = await databaseServices.getInfinitePosts({ pageParam: 9 });
      return result as { documents: { $id: string }[] };
    },
    getNextPageParam: (lastPage: { documents: { $id: string }[] }) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage.documents.length === 0) {
        return null;
      }

      // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
      return lastId;
    },
    initialPageParam: undefined,
  });
};
 */ 
