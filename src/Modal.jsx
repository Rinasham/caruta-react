export const Modal = ({ modalClose, children }) => {
  return (
    <>
      <section className="modalArea" onClick={modalClose}>
        <div className="modalBg"></div>
        <div className="modalWrapper">
          <div className="modalContents">
            <h1>Here are modal contents!</h1>
            <p>{children}</p>
          </div>
          <div className="closeModal" onClick={modalClose}>
            ×
          </div>
        </div>
      </section>
    </>
  );
};
