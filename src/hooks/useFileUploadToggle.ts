import { useState } from "react";

export interface FileUploadToggleState {
  isFileUploadEnabled: boolean;
}

export function useFileUploadToggle(initialEnabled: boolean = false) {
  const [isFileUploadEnabled, setIsFileUploadEnabled] =
    useState<boolean>(initialEnabled);

  const toggleFileUpload = (enabled: boolean) => {
    setIsFileUploadEnabled(enabled);
  };

  return {
    isFileUploadEnabled,
    toggleFileUpload,
  };
}
