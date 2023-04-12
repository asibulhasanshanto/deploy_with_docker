import React, { createContext, useContext, useReducer } from "react";

const AccountContext = createContext();

const AccountDispatchContext = createContext();

const initialState = {
  account: null,
};

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  return (
    <AccountContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
}

export function useAccountDispatch() {
  const context = useContext(AccountDispatchContext);
  if (context === undefined) {
    throw new Error("useAccountDispatch must be used within a AccountProvider");
  }
  return context;
}

function accountReducer(state, action) {
  switch (action.type) {
    case "SET_ACCOUNT": {
      // save to local storage
      localStorage.setItem("user", action.payload);
      return {
        ...state,
        account: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
