import { Modal } from "./Modal";
import { UserDeck } from "./UserDeck";
import { CpuDeck } from "./CpuDeck";
import { Field } from "./Field";

import "./App.css";
import { useApp } from "./useApp";

const CommandKaruta = () => {
  const {
    isStarted,
    isKaruta,
    startGame,
    currentTurn,
    cpuScore,
    cpuDeck,
    userScore,
    userDeck,
    efudaLists,
    kaminoku,
    isAnswered,
    efudaClick,
    isModalOpen,
    modalClose,
    nextGame
  } = useApp();

  //問題文の表示
  return (
    <div>
      <div>
        {isStarted ? (
          <button>ゲーム中</button>
        ) : (
          <button onClick={() => startGame()}>ゲーム開始</button>
        )}
      </div>

      <div>
        {isKaruta && (
          <div>
            <CpuDeck cpuScore={cpuScore} deck={cpuDeck} />
            <ul className="flex wrap">
              {currentTurn < 9 &&
                efudaLists
                  .filter((answeredElm) => !isAnswered.includes(answeredElm.id))
                  .map((efuda) => (
                    <div key={efuda.id}>
                      <Field efuda={efuda} efudaClick={efudaClick} />
                    </div>
                  ))}
            </ul>
            <UserDeck userScore={userScore} deck={userDeck} />
            <div className="flex">
              <p>{currentTurn < 9 && kaminoku} </p>
            </div>
          </div>
        )}
        {isModalOpen ? (
          currentTurn < 9 ? (
            <Modal modalClose={modalClose}>問題の解説</Modal>
          ) : (
            <Modal modalClose={nextGame}>終わり</Modal>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default CommandKaruta;
