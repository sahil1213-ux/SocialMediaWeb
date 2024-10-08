import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/@/components/ui/button";
import { convertFileToUrl } from "@/utils/PostHelpingFunctions";
Button;
const FileUploader = ({ fieldChange, mediaUrl }) => {
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
    return (_jsxs("div", { ...getRootProps(), className: "flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer", children: [_jsx("input", { ...getInputProps(), className: "cursor-pointer" }), fileUrl ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex flex-1 justify-center w-full p-5 lg:p-10", children: _jsx("img", { src: fileUrl, alt: "image", className: "file_uploader-img" }) }), _jsx("p", { className: "file_uploader-label", children: "Click or drag photo to replace" })] })) : (_jsxs("div", { className: "file_uploader-box ", children: [_jsx("img", { src: "/assets/icons/file-upload.svg", width: 96, height: 77, alt: "file upload" }), _jsx("h3", { className: "base-medium text-light-2 mb-2 mt-6", children: "Drag photo here" }), _jsx("p", { className: "text-light-4 small-regular mb-6", children: "SVG, PNG, JPG" }), _jsx(Button, { type: "button", className: "shad-button_dark_4", children: "Select from computer" })] }))] }));
};
export default FileUploader;
