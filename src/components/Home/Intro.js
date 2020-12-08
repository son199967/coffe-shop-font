import React from "react";
import Carousel from 'react-bootstrap/Carousel'
const Intro = (props) => {
  return (
    <div>
      <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/HCO-7605-FESTIVE-2020-WEB-FB-2000X639_1.png"
        alt="First slide"
      />
     
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/HCO-7548-PHIN-SUA-DA-2019-TALENT-WEB_1.jpg"
        alt="Third slide"
      />
  
     
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/web_1.png"
        alt="Third slide"
      />
  
   
    </Carousel.Item>
  </Carousel>
      <section className="tm-welcome-section">
        <div className="container tm-position-relative">
        
          <div className="tm-lights-container">
          
          </div>
          <div className="row tm-welcome-content">
            <h2 className="white-text tm-handwriting-font tm-welcome-header">
              <img
                src="img/header-line.png"
                alt="Line"
                className="tm-header-line"
              />
              &nbsp;Welcome To&nbsp;&nbsp;
              <img
                src="img/header-line.png"
                alt="Line"
                className="tm-header-line"
              />
            </h2>
            <h2 className="gold-text tm-welcome-header-2">Cafe House</h2>
            <p className="gray-text tm-welcome-description">
              Cafe House template is a mobile-friendly responsive{" "}
              <span className="gold-text">Bootstrap v3.3.5</span> layout by{" "}
              <span className="gold-text">templatemo</span>. Lorem ipsum dolor sit
              amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
              parturient montes, nascetur ridiculusnec quam felis, ultricies
              nec, pellentesque eu, pretium quis, sem.
            </p>
            <a href="#main" className="tm-more-button tm-more-button-welcome">
              Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;
