import { PopoverThread, usePopoverThread } from '@collabkit/react';

export function App() {
  const { openPopover, open } = usePopoverThread({
    objectId: 'cellA12',
  });

  // name="Q4 P&L"
  return (
    <PopoverThread objectId="cellA12">
      <TableCell onClick={() => openPopover()} open={open} />
    </PopoverThread>
  );
}

function TableCell(props: { onClick: () => void; open: boolean }) {
  return (
    <div
      onClick={props.onClick}
      style={{
        padding: 20,
        background: 'white',
        cursor: 'pointer',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: props.open ? '#ccc' : 'transparent',
      }}
    >
      Component
    </div>
  );
}
