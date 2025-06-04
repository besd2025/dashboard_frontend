"use client";
import React from "react";
import FileInput from "../input/FileInput";
import Label from "../Label";
import ComponentCard from "../../../common/ComponentCard";

const FileInputExample = () => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label
          htmlFor="file-upload"
          className="text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Upload file
        </Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
  );
};

export default FileInputExample;
