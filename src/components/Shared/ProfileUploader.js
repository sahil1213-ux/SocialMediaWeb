import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { convertFileToUrl } from "@/utils/PostHelpingFunctions";
// import { useCallback, useState } from "react";
// import { FileWithPath, useDropzone } from "react-dropzone";
// type ProfileUploaderProps = {
//   fieldChange: (files: File[]) => void;
//   mediaUrl: string;
// };
// const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       setFileUrl(convertFileToUrl(acceptedFiles[0]));
//     },
//     [fieldChange]
//   );
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg"],
//     },
//   });
//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} className="cursor-pointer" />
//       <div className="cursor-pointer flex-center gap-4">
//         <img
//           src={fileUrl || "/assets/icons/profile-placeholder.svg"}
//           alt="image"
//           className="h-24 w-24 rounded-full object-cover object-top"
//         />
//         <p className="text-primary-500 small-regular md:bbase-semibold">
//           Change profile photo
//         </p>
//       </div>
//     </div>
//   );
// };
// export default ProfileUploader;
import { convertFileToUrl } from "@/utils/PostHelpingFunctions";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
const ProfileUploader = ({ fieldChange, mediaUrl }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(convertFileToUrl(acceptedFiles[0]));
    }, [fieldChange]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });
    return (_jsxs("div", { ...getRootProps(), children: [_jsx("input", { ...getInputProps(), className: "cursor-pointer" }), _jsxs("div", { className: "cursor-pointer flex-center gap-4", children: [_jsx("img", { src: fileUrl || "/assets/icons/profile-placeholder.svg", alt: "profile", className: "h-24 w-24 rounded-full object-cover object-top" }), _jsx("p", { className: "text-primary-500 small-regular md:bbase-semibold", children: "Change profile photo" })] })] }));
};
export default ProfileUploader;
