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
            Two players take turns to place mark in a grid cell with their
            symbol (X or O)
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
      <li>
        <h3>Game Modes</h3>
        <ul>
          <li>
            Normal Mode - This is the default mode and can be turn back on by
            disabling both infinity & chaos mode
          </li>
          <li>
            Infinity mode - In this mode you are only allowed to draw 3 marks of
            your own in the grid cells. In total there can be only three X and
            three O in total. If no one wins one of the your mark will be
            randomly selected and you have to place it somewhere else in the
            empty grid cells until either player wins by getting 3 in a row
            horizontally, vertically or diagonally.
          </li>
          <li>
            Chaos mode - This mode is similar to normal mode but the difference
            is after drawing your mark in a grid cell, one of the empty grid
            cells will be randomly selected to draw your second mark randomly.
            Instead of making one move you will make 2 moves. The fun part is
            you will never know where the random move is going to be in the grid
            cells.
          </li>
        </ul>
      </li>
    </ul>
  </>
);

const about = (
  <>
    <h2>About</h2>
    <ul>
      <li>
        Creator - This game is created with love by&nbsp;
        <a href='https://linkedin.com/in/wasimapinjari'>Wasim A Pinjari</a>
      </li>
      <li>
        Source code -&nbsp;
        <a href='https://github.com/wasimapinjari/tic-tac-toe'>
          github.com/wasimapinjari/tic-tac-toe
        </a>
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
        <Modal.Content tabName='About'>{about}</Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
}
