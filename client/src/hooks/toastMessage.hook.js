import { useCallback } from "react";

export const useToastMessage = () => {
  return useCallback((text) => {
    try {
      if (window.M && text) {
        window.M.toast({ html: text });
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error("Error: M.toast not defined");
    }
  });
};
