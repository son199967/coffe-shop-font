import React from "react";

const DATA = {
  title: "The Best Coffee for you",
  content:
    "This is free HTML5 website template from templatemo. Fndimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Ettiam sit amet orci eget eros faucibus tincidunt.",
  img: "img/1.jpg",
};
const BestCoffee = (props) => {
  return (
    <div>
      <section className="tm-section row">
        <div className="col-lg-9 col-md-9 col-sm-8">
          <h2 className="tm-section-header gold-text tm-handwriting-font">
            {DATA.title}
          </h2>
          <h2>Cafe House</h2>
          <p className="tm-welcome-description">
            {DATA.content}
          </p>
          <a href="#" className="tm-more-button margin-top-30">
            Read More
          </a>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-4 tm-welcome-img-container">
          <div className="inline-block shadow-img">
            <img
              src={DATA.img}
              alt="Image"
              className="img-circle img-thumbnail"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestCoffee;
