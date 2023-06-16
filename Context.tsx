import React, { createContext, useState } from "react";

interface MyContextType {
  userContext: object;
  setUserContext: React.Dispatch<React.SetStateAction<object>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export { MyContext };
