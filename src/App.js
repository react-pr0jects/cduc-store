import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

import ProductFeature from './features/Product';
import CartFeature from "./features/Cart";
import Footer from "./components/Footer";
import { Box } from "@material-ui/core";

function App() {
  return (
    <div className="App" >
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header/>

        <Box pt={7} pb={10} minHeight="50vh">
          <Switch>
            <Route path="/" component={ProductFeature} exact/>
            <Route path="/products" component={ProductFeature} />
            <Route path="/cart" component={CartFeature} />
            <Route component={NotFound}/>
          </Switch>
        </Box>

        <Footer/>
      </Box>
    </div>
  );
}

export default App;
