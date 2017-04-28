import React, { Component } from 'react';

import ReactDOM from 'react-dom'

class AboutUs extends Component {
  constructor() {
    super()
  }
  render() {

    return (
        <div>

          <a target="_blank" href="https://www.linkedin.com/in/ariel-salem-43199412a">
            <div className="profiles">
              <p className="name">Ariel Salem</p>
              <img src="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAh_AAAAJGY5YTM4MzJkLTcxNWMtNDU2Yy04NjNlLTZkODFkMzZkNzYwZA.jpg" />
            </div>
          </a>

          <a target="_blank" href="https://www.linkedin.com/in/nathan-brewer-davis-604a36112">
            <div className="profiles">
              <p className="name">Nathan Brewer-Davis</p>
              <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAmHAAAAJGVjNmU3MmJmLWI4ZTItNDFiMC05OWZjLWVlODI5NWY0Y2QwYg.jpg" />
            </div>
          </a>

          <a target="_blank" href="https://www.linkedin.com/in/ryanaperry/">
            <div className="profiles">
              <p className="name">Ryan Perry</p>
              <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/05c/3b3/0de3dc3.jpg" />
            </div>
          </a>


          <a target="_blank" href="https://www.linkedin.com/in/samykebaish">
            <div className="profiles">
              <p className="name">Samy Kebaish</p>
              <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAQUAAAAJDExZTYyY2YzLTNmNTUtNGJkZi05ZTkzLTQ1OTk5ZDM2ZTY1Mw.jpg" />
            </div>
          </a>

        </div>
    )
  }
}
export default AboutUs;

