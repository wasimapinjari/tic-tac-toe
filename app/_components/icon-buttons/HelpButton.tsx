import Close from '../icons/Close';
import Help from '../icons/Help';
import Modal from '../Modal';

const gt = <span className='gt'>-&gt;</span>;

const shortcuts = (
  <>
    <h2>Shortcuts</h2>
    <ul>
      <li>1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 {gt} Draw (X or O) on board</li>
      <li>Enter / Space / Escape {gt} Reset Board</li>
      <li>Backspace / ~ / 0 {gt} Reset Score</li>
      <li>Right Click / Z / - {gt} Undo Board</li>
      <li>Middle Mouse Button / X / + {gt} Redo Board</li>
      <li>
        CapsLock / T / <span className='star'>*</span> {gt} Toggle Theme
      </li>
      <li>
        O / <span className='period'>.</span> {gt} Toggle Game Options
      </li>
      <li>H {gt} Toggle Help</li>
      <li>M {gt} Toggle Music</li>
      <li>S {gt} Toggle Select Player</li>
      <li>P {gt} Toggle Play With</li>
      <li>D {gt} Toggle Difficulty</li>
      <li>I {gt} Toggle Infinity Mode</li>
      <li>C {gt} Toggle Chaos Mode</li>
    </ul>
  </>
);

const gameplay = (
  <>
    <h2>How to Play Tic Tac Toe</h2>
    <ul>
      <li>
        <h3>Objective</h3>
        <ul>
          <li>
            Be the first player to get three of your marks (X or O) in a row
            (horizontally, vertically, or diagonally)
          </li>
        </ul>
      </li>
      <li>
        <h3>Gameplay</h3>
        <ul>
          <li>The game is played on a 3x3 grid</li>
          <li>
            Two players take turns to mark a cell in the grid with their symbol
            (X or O)
          </li>
          <li>
            Player 1 typically uses &apos;X&apos;, and Player 2 uses
            &apos;O&apos;
          </li>
        </ul>
      </li>
      <li>
        <h3>Winning the Game</h3>
        <ul>
          <li>
            A player wins by placing three of their marks in a horizontal,
            vertical, or diagonal row
          </li>
          <li>
            If all 9 cells are filled and no player has three marks in a row,
            the game is a draw
          </li>
        </ul>
      </li>
      <li>
        <h3>Start a New Game</h3>
        <ul>
          <li>
            Once the game is over, you can start a new game by resetting the
            grid
          </li>
        </ul>
      </li>
    </ul>
  </>
);

export default function HelpButton() {
  return (
    <Modal>
      <Modal.OpenIcon ariaLabel={'Open Help'}>
        <Help />
      </Modal.OpenIcon>
      <Modal.Overlay>
        <Modal.CloseIcon ariaLabel={'Close Help'}>
          <div className='close'>
            <Close /> Escape
          </div>
        </Modal.CloseIcon>
        <Modal.Content tabName='Shortcuts'>{shortcuts}</Modal.Content>
        <Modal.Content tabName='Gameplay'>{gameplay}</Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
}
