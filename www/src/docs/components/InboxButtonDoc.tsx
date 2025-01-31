import { InboxButton } from '@collabkit/react';
import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';
import { ComponentDemo } from '../ComponentDemo';

export function InboxButtonDoc() {
  return (
    <>
      <h2>A button with an unread indicator.</h2>
      <ComponentDemo
        style={{
          padding: 0,
          height: '500px',
          display: 'flex',
          flex: 'unset',
          clipPath: 'inset(0px round 6px 6px 6px 6px)',
        }}
      >
        <div style={{ background: 'white', borderRadius: '8px' }}>
          <InboxButton />
        </div>
      </ComponentDemo>
      <div>
        <h3>Usage</h3>
        <p>
          A button that displays the number of unread comments in the users inbox. Handle{' '}
          <code>onClick</code> to show the user's inbox yourself by rendering the
          <code className="ReactNode">{'<Inbox>'}</code> component.
        </p>
        {renderCodeSnippet(`import { InboxButton } from '@collabkit/react';

export function App() {
  return <div>
    <InboxButton 
      onClick={/* handle showing the users inbox here */} 
    />
  </div>;
}`)}
      </div>
      <div>
        <h3>Props</h3>
        <AdvancedProps
          props={[
            [
              'onClick',
              <>
                (e: React.MouseEvent)
                <br /> {'=> void'}
              </>,
              'Called when the user clicks the button.',
            ],
            [
              'children',
              <>
                React.ReactNode <br />| undefined
              </>,
              'Optional children to render inside the button and replace default contents.',
            ],
          ]}
        />
      </div>
    </>
  );
}
