export const UserDeck = ({ userScore, deck }) => {
  return (
    <div className="flex wrap">
      <p>{userScore} : USER SCORE</p>
      {deck.map((card, id) => {
        return <button key={card.id}>{card.answer}</button>;
      })}
    </div>
  );
};
