import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer class="bg-dark text-center text-white mt-4">
      <div class="container p-4">
        <section class="mb-4">
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com/becemJuventus"
            role="button"
            target="_blanc" 
          >
            <i class="fab fa-facebook-f"></i>
          </a>

        
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://https://gmail.com/becemtube"
            role="button"
            target="_blanc"
          >
            <i class="fab fa-google"></i>
          </a>

          
          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/mobile-legende-pro-live-34229b288/"
            role="button"
            target="_blanc"
          >
            <i class="fab fa-linkedin-in"></i>
          </a>

          <a
            class="btn btn-outline-light btn-floating m-1"
            href="https://github.com/becemjuve"
            role="button"
            target="_blanc"
          >
            <i class="fab fa-github"></i>
          </a>
        </section>

        <section class="">
          <form action="">
            <div class="row d-flex justify-content-center">
              <div class="col-auto">
                <p class="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div class="col-md-5 col-12">
                <div class="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    class="form-control"
                  />
                  <label class="form-label" for="form5Example21">
                    Email address
                  </label>
                </div>
              </div>

              <div class="col-auto">
                <button type="submit" class="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section class="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam, commodi
            optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section class="">
          <div class="row">
            <div class="">
              <h5 class="text-uppercase">
                <Link to="/about" className="text-white">About us</Link>
              </h5>
            </div>
          </div>
        </section>
      </div>

      <div
        class="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2);" }}
      >
        © 2023 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/">
          Game-shop.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
