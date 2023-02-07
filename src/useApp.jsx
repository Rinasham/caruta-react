import { useEffect, useState } from "react";
import { useInterval } from "./useInterval";

export const useApp = () => {
  //まずはカルタを用意
  const karutaLists = [
    {
      id: "1",
      kaminoku: "問題1",
      simonoku: "git 1",
      answer: "../1.png"
    },
    {
      id: "2",
      kaminoku: "問題2",
      simonoku: "git 2",
      answer: "../2.png"
    },
    {
      id: "3",
      kaminoku: "問題3",
      simonoku: "git 3",
      answer: "../3.png"
    },
    {
      id: "4",
      kaminoku: "問題4",
      simonoku: "git 4",
      answer: "../4.png"
    },
    {
      id: "5",
      kaminoku: "問題5",
      simonoku: "git 5",
      answer: "../5.png"
    },
    {
      id: "6",
      kaminoku: "問題6",
      simonoku: "git 6",
      answer: "../6.png"
    },
    {
      id: "7",
      kaminoku: "問題7",
      simonoku: "git 7",
      answer: "../7.png"
    },
    {
      id: "8",
      kaminoku: "問題8",
      simonoku: "git 8",
      answer: "../8.png"
    },
    {
      id: "9",
      kaminoku: "問題9",
      simonoku: "git 9",
      answer: "../9.png"
    }
  ];

  //useState
  const [yomiLists, setYomiLists] = useState(karutaLists); //読み札管理
  const [efudaLists, setEfudaLists] = useState(yomiLists); //絵札管理
  const [userScore, setUserScore] = useState(0); //ユーザーのスコア管理
  const [cpuScore, setCpuScore] = useState(0); //CPUのスコア管理
  const [userDeck, setUserDeck] = useState([]);
  const [cpuDeck, setCpuDeck] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //正誤判定後のモーダル管理
  const [isStarted, setIsStarted] = useState(false); //ゲーム開始ボタンの管理
  const [isKaruta, setIsKaruta] = useState(false); //絵札一覧の表示・非表示の管理
  const [isAnswered, setIsAnswered] = useState([]); //既に終了している絵札を管理
  const [currentTurn, setCurrentTurn] = useState(0); //ターンカウント

  const [kaminoku, setKaminoku] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const [kaminokuRef, setKaminokuRef] = useState("");

  //ゲームスタート
  const startGame = () => {
    setCards();
    setIsStarted(true);
    setIsRunning(true);
  };

  // 初期化
  const initGame = () => {
    setUserDeck([]);
    setCpuDeck([]);
    setUserScore(0);
    setCpuScore(0);
    setIsAnswered([]);
    setCurrentTurn(0);
    setIsKaruta(false);
  };

  //ローディング画面
  //ゲーム画面に移る

  //絵札のシャッフル
  const setCards = () => {
    shuffle(yomiLists);
    const result = shuffle([...yomiLists]);
    setEfudaLists(result);
  };
  //絵札の配置
  // ゲームをスタートして3秒後にカードを表示
  useEffect(() => {
    if (!isStarted || currentTurn >= 9) return;
    setTimeout(() => {
      setIsKaruta(true);
      setKaminokuRef(yomiLists[currentTurn].kaminoku);
      setIsRunning(true);
    }, 1000);
  }, [isStarted, currentTurn]);

  //場に対応した読み札を表示（一文字ずつ表示）
  const updateKaminoku = () => {
    if (kaminokuRef === "" || isModalOpen) {
      setIsRunning(false);
    } else {
      const letter = kaminokuRef.charAt(0);
      const newKaminoku = kaminokuRef.slice(1);
      setKaminokuRef(newKaminoku);
      setKaminoku(kaminoku + letter);
    }
  };

  useInterval(
    () => {
      if (!isKaruta) return;
      updateKaminoku();
    },
    isRunning ? 100 : null
  );

  // ユーザーが絵札を押した時
  const efudaClick = (e) => {
    judge(e.target);
    setModalOpen(true);
  };

  // useEffect(() => {
  //   if (!isModalOpen) return;
  //   setTimeout(() => {
  //     setModalOpen(false);
  //     setCurrentTurn(currentTurn + 1);
  //     setKaminoku("");
  //     if (currentTurn < 8) setKaminokuRef(yomiLists[currentTurn + 1].kaminoku);
  //   }, 2000);
  // }, [isModalOpen]);

  //ユーザーがクリックした札に対する正誤判定
  const judge = (clickedAnswer) => {
    const correctEfudaIndex = efudaLists.findIndex(
      (el) => el.id === yomiLists[currentTurn].id
    );
    if (correctEfudaIndex !== -1) {
      const newArr = [...isAnswered];
      newArr.push(efudaLists[correctEfudaIndex].id);
      setIsAnswered(newArr);
    }
    // 選んだチョイスが正解の場合
    if (clickedAnswer.id === yomiLists[currentTurn].id) {
      console.log("正解");
      // ユーザーのデッキに入れる
      const newUserDeck = userDeck.slice();
      newUserDeck.push(efudaLists[correctEfudaIndex]);
      setUserDeck(newUserDeck);
      //スコアの更新
      setUserScore(userScore + 1);
    } else {
      // 選んだチョイスが不正解の場合
      console.log("不正解");
      // CPUのデッキに入れる
      const newCpuDeck = cpuDeck.slice();
      newCpuDeck.push(efudaLists[correctEfudaIndex]);
      setCpuDeck(newCpuDeck);
      //スコアの更新
      setCpuScore(cpuScore + 1);
    }
  };

  //正誤判定に対応したモーダルの表示
  const modalClose = () => {
    setKaminoku("");
    if (currentTurn < 8) {
      setModalOpen(false);
      setCurrentTurn(currentTurn + 1);
      setKaminokuRef(yomiLists[currentTurn + 1].kaminoku);
    } else if (currentTurn === 8) {
      finishGame();
    }
  };
  //スコア表示
  //取得した（された）絵札を非表示にする
  //モーダルは2秒後に消える
  //次の問題へ移る
  //次の読み札を表示する
  //最終問題までループする
  //勝敗とスコア、ホーム画面へ飛ぶボタンが表示してあるのモーダル表示
  const finishGame = () => {
    setCurrentTurn(currentTurn + 1);
    setModalOpen(true);
  };
  //関数
  //シャッフル関数
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  };

  const nextGame = () => {
    setIsStarted(false);
    setModalOpen(false);
    // 次のゲームへ（初期化）
    initGame();
  };

  console.log(currentTurn + "ターン目", "modal " + isModalOpen);
  return {
    isStarted,
    isKaruta,
    startGame,
    currentTurn,
    kaminoku,
    cpuScore,
    cpuDeck,
    userScore,
    userDeck,
    efudaLists,
    isAnswered,
    efudaClick,
    isModalOpen,
    modalClose,
    nextGame
  };
};
