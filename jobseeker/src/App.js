// import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './firebase/Auth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <p>
            APP
          </p>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
