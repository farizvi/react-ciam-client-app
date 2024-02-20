import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import SignUpForm from './components/signup-form';
import { loginRequest } from './authConfig';
import { msalInstance } from './main';

const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create',
        scopes: ['User.read']
      })
      .catch((error) => console.log(error))
  };

  return (
    <div className="app">
        <AuthenticatedTemplate>
          {activeAccount ? (
            <div>User is authenticated</div>
          ): null
          }
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <SignUpForm />
          {/* <button className='button' onClick={handleRedirect}>Login</button> */}
        </UnauthenticatedTemplate>
    </div>
  )

}

function App() { 

  return (
    <MsalProvider instance={msalInstance}>
      <MainContent />
    </MsalProvider>
  )
}

export default App
