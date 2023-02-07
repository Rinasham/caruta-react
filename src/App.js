import React, { useEffect, useState } from "react";
import { useRef } from "react";
// import { CpuDeck } from "./CpuDeck";
// import { Field } from "./Field";
// import { useInterval } from "./useInterval";
// import { UserDeck } from "./UserDeck";

const CommandKaruta = () => {
  //まずはカルタを用意
  const karutaLists = [
    {
      id: 1,
      kaminoku: "問題1",
      simonoku: "git 1",
      answer: "../1.png"
    },
    {
      id: 2,
      kaminoku: "問題2",
      simonoku: "git 2",
      answer: "../2.png"
    },
    {
      id: 3,
      kaminoku: "問題3",
      simonoku: "git 3",
      answer: "../3.png"
    },
    {
      id: 4,
      kaminoku: "問題4",
      simonoku: "git 4",
      answer: "../4.png"
    },
    {
      id: 5,
      kaminoku: "問題5",
      simonoku: "git 5",
      answer: "../5.png"
    },
    {
      id: 6,
      kaminoku: "問題6",
      simonoku: "git 6",
      answer: "../6.png"
    },
    {
      id: 7,
      kaminoku: "問題7",
      simonoku: "git 7",
      answer: "../7.png"
    },
    {
      id: 8,
      kaminoku: "問題8",
      simonoku: "git 8",
      answer: "../8.png"
    },
    {
      id: 9,
      kaminoku: "問題9",
      simonoku: "git 9",
      answer: "../9.png"
    }
  ];

  //useState
  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理
  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理
  // const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  // const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  // const [showModal, setShowModal] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理
  const [currentTurn, setCurrentTurn] = useState(0); //turnカウント
  const [userDeck, setUserDeck] = useState([]);
  const [cpuDeck, setCpuDeck] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [kaminoku, setKaminoku] = useState("");
  const kaminokuRef = useRef(null);

  // useEffect(() => {
  //   console.log(kaminokuRef.current);
  //   const interval = setInterval(() => {
  //     if (!kaminokuRef.current) {
  //       console.log("止める");
  //       clearInterval(interval);
  //       return;
  //     }
  //     const letter = kaminokuRef.current.charAt(0);
  //     console.log(letter + " letter");
  //     console.log(kaminokuRef.current + " ref");
  //     kaminokuRef.current = kaminokuRef.current.slice(1);
  //     console.log(kaminoku + " kaminoku");
  //     console.log(kaminokuRef.current);
  //     const updatedKaminoku = kaminoku + letter;
  //     console.log(updatedKaminoku + " updated");
  //     setKaminoku(updatedKaminoku);
  //   }, 5000);
  // }, [kaminoku]);

  //ゲームスタート
  const startGame = () => {
    // setCards();
    setIsStarted(true);
    // showKaminoku(0);
    // readYomifuda(currentTurn);
  };
  console.log(currentTurn);
  // console.log(yomiLists);
  // console.log(efudaLists);
  //ローディング画面
  //ゲーム画面に移る
  //データ（カルタオブジェクト）の取得
  //データのランダム選択（問題数分）

  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists);
    const result = shuffle([...yomiLists]);
    setEfudaLists(result);
  };
  useEffect(() => {
    setCards();
    kaminokuRef.current = yomiLists[0].kaminoku;
  }, []);

  //絵札の配置
  useEffect(() => {
    if (currentTurn < 9) {
      setCorrectAnswer(yomiLists[0].answer);
    }
  }, [currentTurn]);

  //3秒待つ
  //場に対応した読み札を表示（一文字ずつ表示）
  //とりあえず一問ずつ取得する
  let showYomifuda = "";
  const readYomifuda = (currentNum) => {
    if (currentNum < yomiLists.length - 1) showYomifuda = yomiLists[currentNum];
    console.log(showYomifuda + "読み札");
  };
  //ユーザーがクリックした札に対する正誤判定

  //スコアの更新

  //正誤判定に対応したモーダルの表示

  //スコア表示

  //取得した（された）絵札を非表示にする

  //モーダルは2秒後に消える

  //次の問題へ移る

  //次の読み札を表示する

  //最終問題までループする

  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示

  //関数
  //シャッフル関数
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  const efudaClick = (e, answer, id) => {
    // 読み札を選択しから消す
    console.log("読み札消す");
    const newYomiList = yomiLists.slice();
    newYomiList.splice(0, 1);
    setYomiLists(newYomiList);

    // 絵札を場から消す
    const correctEfudaIndex = efudaLists.findIndex(
      (efuda) => efuda.answer === correctAnswer
    );
    if (correctEfudaIndex !== -1) {
      console.log("絵札消す");
      const newEfudaList = efudaLists.slice();
      newEfudaList.splice(correctEfudaIndex, 1);
      setEfudaLists(newEfudaList);
    }
    // 選んだチョイスが正解の場合
    if (answer === correctAnswer) {
      console.log("正解");
      // ユーザーのデッキに入れる
      const newUserDeck = userDeck.slice();
      newUserDeck.push(efudaLists[correctEfudaIndex]);
      setUserDeck(newUserDeck);
      console.log(newUserDeck);
    } else {
      // 選んだチョイスが不正解の場合
      console.log("不正解");
      // CPUのデッキに入れる
      const newCpuDeck = cpuDeck.slice();
      newCpuDeck.push(efudaLists[correctEfudaIndex]);
      setCpuDeck(newCpuDeck);
      console.log(newCpuDeck);
    }
    // 次の問題へ行く
    setCurrentTurn(currentTurn + 1);
  };

  //問題文の表示

  // let kaminokuRef = useRef(yomiLists[currentTurn].kaminoku);
  // const kaminoku = yomiLists.length > 0 && yomiLists[0].kaminoku;

  return (
    <div>
      <p>{kaminoku}</p>
      <div>
        {isStarted ? (
          <>
            <button>ゲーム中</button>
            <h3>{currentTurn >= 9 && "終わり"}</h3>
            <p>{kaminoku}</p>

            <div>
              <p>CPU deck</p>
              {cpuDeck.map((card, id) => {
                return <button key={card.id}>{card.answer}</button>;
              })}
            </div>
            <ul>
              {efudaLists.map((card) => {
                return (
                  <button
                    key={card.id}
                    onClick={(e) => {
                      efudaClick(e, card.answer, card.id);
                    }}
                  >
                    {card.answer}
                  </button>
                );
              })}
            </ul>
            <div>
              <p>User deck</p>
              {userDeck.map((card, id) => {
                return <button key={card.id}>{card.answer}</button>;
              })}
            </div>
          </>
        ) : (
          <button onClick={() => startGame()}>ゲーム開始</button>
        )}
      </div>
    </div>
  );
};

export default CommandKaruta;
