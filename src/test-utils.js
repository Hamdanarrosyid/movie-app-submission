import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import store from "./store";

const AllTheProviders = ({ children, initialRoutes }) => {
  return (
    <Provider store={store}>
      <BrowserRouter initialEntries={initialRoutes}>
        {children}
      </BrowserRouter>
    </Provider>
  )
}



const customRender = (ui, options) => {
  const initialRoutes = options && options.initialRoutes ? options.initialRoutes : ["/jnhbjhcgur6fysd"];
  return render(ui, { wrapper: (args) => AllTheProviders({...args, initialRoutes}), ...options });
}

export * from "@testing-library/react";

export { customRender as render };