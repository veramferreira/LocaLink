import React, { createContext, useState } from "react";

interface MyContextType {
  userContext: string;
  setUserContext: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export { MyContext };
