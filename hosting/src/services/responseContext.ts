import React, { useContext } from 'react';
import { ResponseDocContextValue } from '../index.d';

export const ResponseContext = React.createContext<ResponseDocContextValue>(
  null,
);

export const useResponseContext = () => useContext(ResponseContext);
