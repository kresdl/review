import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import store from 'lib/store'

export const useLogout = (path: string, redirect: string) => {
    const history = useHistory()
    const { pathname } = useLocation()
    const queryClient = useQueryClient()
  
    useEffect(() => {
      if (pathname === path) {
        sessionStorage.removeItem('token')
        store.setAuth(null)
        queryClient.clear()
        history.push(redirect)
      }
    }, [path, redirect, history, pathname])
  }
  