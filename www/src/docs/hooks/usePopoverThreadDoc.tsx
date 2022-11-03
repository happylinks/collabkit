import { AdvancedProps } from '../advanced/AdvancedCommon';
import { renderCodeSnippet } from '../CodeEditor';

export function UsePopoverThreadDoc() {
  return (
    <>
      <h2>Preview, open or close a popover thread.</h2>
      <div>
        <h3>Usage</h3>
        <p>
          <code>usePopoverThreadState</code> lets you open, close or show the preview by calling the{' '}
          <code>setPopoverState</code> function it returns.
        </p>
        <p>
          Must be called within a <code>CollabKit.Provider</code>
        </p>

        {renderCodeSnippet(`import { usePopoverThreadState, Popover } from '@collabkit/react';

export function App() {
  const { context, setPopoverState } = usePopoverThread({ threadId: 'unique-thread-id' });

  return <div>
    <button onClick={() => setPopoverState('open')}>Open Sesame</button>
    <PopoverTrigger context={context}>
      Hello world
    </PopoverTrigger>
  </div>
}`)}
      </div>

      <div>
        <h3>Props</h3>
        <AdvancedProps
          rows={[['threadId', 'string', 'A unique ID that represents this thread.']]}
        />
        <br />
        <h3>Returns</h3>
        <AdvancedProps
          hideHeader={true}
          rows={[
            [
              'setPopoverState',
              `(state: 'open' | 'close' | 'preview') => void`,
              'Sets the popover state.',
            ],
            ['context', 'PopoverThreadContext', ''],
          ]}
        />
      </div>
    </>
  );
}
