import React from "react";

function ContactPage(props) {
  return (
    
      <div className="container" id="main">
      <div>
      <section className="tm-section row">
        <h2 className="col-lg-12 margin-bottom-30">Send us a message</h2>
        <form className="tm-contact-form" >
          <div className="col-lg-6 col-md-6">
            <div className="form-group">
              <input
                type="text"
                id="contact_name"
                className="form-control"
                placeholder="NAME"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="contact_email"
                className="form-control"
                placeholder="EMAIL"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="contact_subject"
                className="form-control"
                placeholder="SUBJECT"
              />
            </div>
            <div className="form-group">
              <textarea
                id="contact_message"
                className="form-control"
                rows="6"
                placeholder="MESSAGE"
              ></textarea>
            </div>
            <div className="form-group">
              <button className="tm-more-button" type="submit" name="submit">
                Send message
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.676323152816!2d105.84126381472433!3d21.005607993944672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1605607679748!5m2!1svi!2s"
              width="600"
              height="450"
              frameBorder="0"
              style={{border:0}}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </form>
      </section>
    </div>
      </div>
    
  );
}

export default ContactPage;
