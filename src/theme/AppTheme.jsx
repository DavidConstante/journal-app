import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'

import { purpleTheme } from './purpleTheme'

const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export { AppTheme }
