export const Field = ({ efuda, efudaClick }) => {
  return (
    <button onClick={(e) => efudaClick(e)} id={efuda.id}>
      {efuda.answer}
    </button>
  );
};
