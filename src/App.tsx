import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import {setupStore} from "./store/store.ts";

function App() {
  const store = setupStore()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App
