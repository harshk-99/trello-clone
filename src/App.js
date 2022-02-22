import Board from "./components/Board";

function App() {
  return (
    <div
      className="App p-4"
      style={{
        background: "linear-gradient(to right, #0062cc, #007bff)",
      }}
    >
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      />
      <Board />
    </div>
  );
}

export default App;
