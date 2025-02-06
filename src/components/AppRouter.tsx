import {Navigate, Route, Routes} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {authRoutes, publicRoutes} from "../utils/routes.tsx";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {authSlice, Instance} from "../store/reducers/authSlice.ts";

const renderRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return authRoutes.map(({path, Component}) => <Route key={path} path={path} element={Component} />)
  }
  return publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={Component} />)
}

const renderUnknownRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return <Route path='*' element={<Navigate to={'/chat'}/>}/>
  }
  return <Route path='*' element={<Navigate to={'/auth'}/>}/>
}

const AppRouter = () => {
  const {isAuth} = useAppSelector(state => state.authReducer)
  const dispatch = useAppDispatch()
  const {setAuth, setInstance} = authSlice.actions
  console.log(isAuth)
  useEffect(() => {
    const instance: Instance = JSON.parse(localStorage.getItem('instance') as string)

    if (localStorage.getItem('instance')) {
      dispatch(setInstance({apiTokenInstance: instance.apiTokenInstance, idInstance: +instance.idInstance}))
      dispatch(setAuth(true))
    }
  }, [])

  return (
    <Routes>
      {renderRoutes(isAuth)}
      {renderUnknownRoutes(isAuth)}
    </Routes>
  );
};

export default AppRouter;