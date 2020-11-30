import React from "react";

const DATA = [
  {
    title: "Americano",
    content:
      "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque. sed ipsum.",
    img: "img/popular-1.jpg",
  },
  {
    title: "Cappuccino",
    content:
      "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque. sed ipsum.",
    img: "img/popular-2.jpg",
  },
  {
    title: "Mocha",
    content:
      "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque. sed ipsum.",
    img: "img/popular-3.jpg",
  },
];
const Items = (props) => {
  return (
    <div>
      <section className="tm-section tm-section-margin-bottom-0 row">
        <div className="col-lg-12 tm-section-header-container">
          <h2 className="tm-section-header gold-text tm-handwriting-font">
            <img src="img/logo.png" alt="Logo" className="tm-site-logo" />{" "}
            Popular Items
          </h2>
          <div className="tm-hr-container">
            <hr className="tm-hr" />
          </div>
        </div>
        <div className="col-lg-12 tm-popular-items-container">
          {DATA ? (
            DATA.map((item, index) => {
              return (
                <div className="tm-popular-item" key={index}>
                  <img
                    src= {item.img}
                    alt="Popular"
                    className="tm-popular-item-img"
                  />
                  <div className="tm-popular-item-description">
                    <h3 className="tm-handwriting-font tm-popular-item-title">
                      {item.title}
                    </h3>
                    <hr className="tm-popular-item-hr" />
                    <p>
                      {item.content}
                    </p>
                    <div className="order-now-container">
                      <a
                        href="#"
                        className="order-now-link tm-handwriting-font"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Items;
