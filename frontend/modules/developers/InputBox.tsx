export const DeveloperInputBox = ({ title, desc, footer, maxLength }) => {
  return (
    <section className="inputbox">
      <div className="inputboxInner">
        <div className="content">
          <h4 className="title"> {title} </h4>
          <p className="desc"> {desc} </p>
          <div className="input">
            <div className="wrapper">
                <div className="input-wrapper">
                    <input 
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    maxLength={maxLength}
                    type="text"
                    className="input-255"                    
                    />
                    </div>
            </div>
          </div>
        </div>
        <footer className="footer">{footer}</footer>
      </div>
    </section>
  );
};
