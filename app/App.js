import { Provider } from "react-redux";
import Navigator from "./utils/Navigator";
import Store from "./redux/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
}
