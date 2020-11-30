import React from "react";

const DATA = {
  title:
    "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
  list: [
    "Tellus eget condimentum rhoncus.",
    "Sem quam semper libero.",
    "Sit amet adipiscing sem neque sed ipsum.",
    "Nam quam nunc, blandit vel, luctus pulvinar.",
    "Maecenas nec odio et ante tincidunt tempus.",
    "Donec vitae sapien ut libero ventenatis faucibus.",
  ],
};
const DailyMenu = (props) => {
  return (
    <div>
      <section className="tm-section">
        <div className="row">
          <div className="col-lg-12 tm-section-header-container">
            <h2 className="tm-section-header gold-text tm-handwriting-font">
              <img src="img/logo.png" alt="Logo" className="tm-site-logo" />{" "}
              Daily Menu
            </h2>
            <div className="tm-hr-container">
              <hr className="tm-hr" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="tm-daily-menu-container margin-top-60">
            <div className="col-lg-4 col-md-4">
              <img
                src="img/menu-board.png"
                alt="Menu board"
                className="tm-daily-menu-img"
              />
            </div>
            <div className="col-lg-8 col-md-8">
              <p>
                {DATA.title}
              </p>
              <ol className="margin-top-30">
                {DATA?DATA.list.map((item, index) => {
                    return <li>{item}</li>
                }):(
                    <div></div>
                )}
              </ol>
              <a href="#" className="tm-more-button margin-top-30">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DailyMenu;
