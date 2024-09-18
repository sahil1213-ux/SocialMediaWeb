import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader, UserCard } from "@/components/Shared";
import { useToast } from "@/components/ui/use-toast";
// import { Loader, UserCard } from "@/components/shared";
import { useGetUsers } from "@/react-query/queriesAndMutations";
// import { useGetUsers } from "@/lib/react-query/queries";
const AllUsers = () => {
    const { toast } = useToast();
    const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
    if (isErrorCreators) {
        toast({ title: "Something went wrong." });
        return;
    }
    return (_jsx("div", { className: "common-container", children: _jsxs("div", { className: "user-container", children: [_jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "All Users" }), isLoading && !creators ? (_jsx(Loader, {})) : (_jsx("ul", { className: "user-grid", children: creators?.documents.map((creator) => (_jsx("li", { className: "flex-1 min-w-[200px] w-full  ", children: _jsx(UserCard, { user: creator }) }, creator?.$id))) }))] }) }));
};
export default AllUsers;
