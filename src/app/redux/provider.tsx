"use client"
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import React from "react"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
export const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={{}}>
                {children}
            </ThemeProvider>
        </PersistGate>
    </Provider>
) 