export const CpuDeck = ({ cpuScore, deck }) => {
  return (
    <div className="flex wrap">
      <p>{cpuScore} : CPU SCORE</p>
      {deck.map((card, id) => {
        return <button key={card.id}>{card.answer}</button>;
      })}
    </div>
  );
};
