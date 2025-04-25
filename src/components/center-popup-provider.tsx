"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CenterPopup } from "@/components/ui/center-popup";

interface CenterPopupProps {
  type: 'login' | 'signout';
  message: string;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

interface CenterPopupContextType {
  showCenterPopup: (props: Omit<CenterPopupProps, 'visible' | 'onClose'>) => void;
  hideCenterPopup: () => void;
}

const CenterPopupContext = createContext<CenterPopupContextType | undefined>(undefined);

export const useCenterPopup = () => {
  const context = useContext(CenterPopupContext);
  if (!context) {
    throw new Error("useCenterPopup must be used within a CenterPopupProvider");
  }
  return context;
};

export const CenterPopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [popup, setPopup] = useState<CenterPopupProps | null>(null);

  const showCenterPopup = useCallback(
    (props: Omit<CenterPopupProps, 'visible' | 'onClose'>) => {
      setPopup({
        ...props,
        visible: true,
        onClose: () => setPopup(null),
        duration: props.duration || 5000,
      });
    },
    []
  );

  const hideCenterPopup = useCallback(() => {
    setPopup(null);
  }, []);

  return (
    <CenterPopupContext.Provider value={{ showCenterPopup, hideCenterPopup }}>
      {children}
      {popup && (
        <CenterPopup
          type={popup.type}
          message={popup.message}
          duration={popup.duration}
          onClose={popup.onClose}
          visible={popup.visible}
        />
      )}
    </CenterPopupContext.Provider>
  );
}; 