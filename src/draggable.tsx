import { createSignal, onCleanup, type Component, Show } from 'solid-js';

interface DraggableProps {
    data: string;
  }
  
const Draggable: Component<DraggableProps> = (props) => {
    const [pos, setPos] = createSignal({ x: 0, y: 0 });
    const [size, setSize] = createSignal({ width: 200, height: 200 });
    const [isOpen, setIsOpen] = createSignal(true);
    let dragging = false;
    let resizing = false;
    let offset = { x: 0, y: 0 };
    let sizeOffset = { width: 0, height: 0 };

    const onMouseDown = (e: MouseEvent) => {
        dragging = true;
        offset = { x: e.clientX - pos().x, y: e.clientY - pos().y };
    };

    const onResizeMouseDown = (e: MouseEvent) => {
        e.stopPropagation();
        resizing = true;
        sizeOffset = { width: e.clientX - size().width, height: e.clientY - size().height };
    };

    const onMouseMove = (e: MouseEvent) => {
        if (dragging) {
            setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        }
        if (resizing) {
            setSize({ width: e.clientX - sizeOffset.width, height: e.clientY - sizeOffset.height });
        }
    };

    const onMouseUp = () => {
        dragging = false;
        resizing = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    onCleanup(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    });

    return (
        <Show when={isOpen()}>
          <div
            style={`position: absolute; left: ${pos().x}px; top: ${pos().y}px; width: ${size().width}px; height: ${size().height}px; background-color: lightblue;`}
            onmousedown={onMouseDown}
          >
            <button style="position: absolute; right: 0; top: 0;" onClick={() => setIsOpen(false)}>❌</button>
            <div
              style="position: absolute; right: 0; bottom: 0; width: 10px; height: 10px; background-color: darkblue; cursor: se-resize;"
              onmousedown={onResizeMouseDown}
            />
            <div>{props.data}</div>
          </div>
        </Show>
      );
};

export default Draggable;