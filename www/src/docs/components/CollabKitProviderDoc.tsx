import { renderCodeSnippet } from '../CodeEditor';
import { DocLink } from '../Doc';

export function CollabKitProviderDoc() {
  return (
    <>
      <h2>
        Handles user authentication and realtime comments syncing. Required to use other components.
      </h2>
      <blockquote>
        <h4 style={{ marginTop: 0 }}>Secure Mode</h4>
        By default CollabKitProvider requires you to pass in your <code>apiKey</code> and{' '}
        <code>appId</code> as props. For Production environments we recommend turning on{' '}
        <DocLink href="/docs/secureMode">Secure Mode</DocLink>.
      </blockquote>

      <div>
        <h3>Usage</h3>
        <p>
          <code>CollabKitProvider</code> is the React context provider that handles authentication
          with CollabKit's servers and all other components fetch data from it.
        </p>
        {renderCodeSnippet(`import { CollabKitProvider } from '@collabkit/react';

export const App() {
  return <CollabKitProvider 
    appId={APP_ID} 
    apiKey={API_KEY} 
    theme={'light'}
    workspace={{ 
      id: 'acme', 
      name: 'ACME Corporation' 
    }} 
    user={{ 
      id: 'jane', 
      name: 'Jane Doe', 
      email: 'jane@acme.com' 
  }}>
    {'your app code here'}
  </CollabKitProvider>
}`)}
      </div>
    </>
  );
}
