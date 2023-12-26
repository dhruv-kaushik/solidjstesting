import { createSignal, For, type Component } from 'solid-js';
import Draggable from './draggable';

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <>
    <button onClick={() => setCount(count() + 1)}>Create Window</button>
    <For each={Array(count()).fill(0)}>{(item, index) => <Draggable data={`Window ${index()}`} />}</For>
  </>
  );
};

export default App;