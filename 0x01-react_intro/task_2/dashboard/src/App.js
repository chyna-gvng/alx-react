import logo from "./logo.jpg";
import "./App.css";
import { getFooterCopy, getFullYear } from "./utils";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1> School dashboard</h1>
      </header>
      <body>
        <div className="App-body">
          <p>Login to access the full dashboard</p>
          <label>
            Email: <input type="text" name="Email" />
          </label>
          <label>
            Password: <input type="text" name="Password" />
          </label>
          <button>OK</button>
        </div>
      </body>
      <footer>
        <div className="App-footer">
          <p>
            Copyright {getFullYear()}, {getFooterCopy(true)}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
