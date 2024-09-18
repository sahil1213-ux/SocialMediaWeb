import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { useToast } from "@/components/ui/use-toast";
// import { Loader, PostCard, UserCard } from "@/components/shared";
PostCard;
import { useGetRecentPosts, useGetUsers, } from "@/react-query/queriesAndMutations";
import { PostCard, Loader, UserCard } from "@/components/Shared";
// import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
const Home = () => {
    // const { toast } = useToast();
    const { data: posts, isLoading: isPostLoading, isError: isErrorPosts, } = useGetRecentPosts();
    const { data: creators, isLoading: isUserLoading, isError: isErrorCreators, } = useGetUsers(10);
    if (isErrorPosts || isErrorCreators) {
        return (_jsxs("div", { className: "flex flex-1", children: [_jsx("div", { className: "home-container", children: _jsx("p", { className: "body-medium text-light-1", children: "Something bad happened" }) }), _jsx("div", { className: "home-creators", children: _jsx("p", { className: "body-medium text-light-1", children: "Something bad happened" }) })] }));
    }
    return (_jsxs("div", { className: "flex flex-1", children: [_jsx("div", { className: "home-container", children: _jsxs("div", { className: "home-posts", children: [_jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Home Feed" }), isPostLoading && !posts ? (_jsx(Loader, {})) : (_jsx("ul", { className: "flex flex-col flex-1 gap-9 w-full ", children: posts?.documents.map((post) => (_jsx("li", { className: "flex justify-center w-full", children: _jsx(PostCard, { post: post }) }, post.$id))) }))] }) }), _jsxs("div", { className: "home-creators", children: [_jsx("h3", { className: "h3-bold text-light-1", children: "Top Creators" }), isUserLoading && !creators ? (_jsx(Loader, {})) : (_jsx("ul", { className: "grid 2xl:grid-cols-2 gap-6", children: creators?.documents.map((creator) => (_jsx("li", { children: _jsx(UserCard, { user: creator }) }, creator?.$id))) }))] })] }));
};
export default Home;
