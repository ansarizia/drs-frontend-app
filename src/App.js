import logo from './logo.svg';
import './css/App.css';
import { useState,createContext } from "react";
import { BrowserRouter as Router, Routes, Route , Link } from 'react-router-dom';
import SystemSummary from './pages/SystemSummary';
import JobSummary from './pages/JobSummary';
import Navbar from './pages/Navbar';
import JobDetails from './pages/JobDetails';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8000/app/api" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export const AppContext = createContext();

function App() {
  

  const [systemName, setSystemName] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");

  return (
    <ApolloProvider client={client}>
      <div >

        <AppContext.Provider value={{ systemName, setSystemName ,selectedSystem , setSelectedSystem}}>
          <Router>
            <Navbar className="App-header" />
            <Routes>
              <Route path='/' element={<SystemSummary />} />
              <Route path='/jobsummary' element={<JobSummary />} />
              <Route path='/jobdetails' element={<JobDetails />} />
              <Route path='*' element=<h3> Page Not Found </h3> />
            </Routes>
          </Router>
        </AppContext.Provider>

      </div>
    </ApolloProvider>


  );
}





export default App;
