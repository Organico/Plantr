import React, { Component } from 'react';

import ReactDOM from 'react-dom'

class AboutUs extends Component {
  render() {

    return (
        <div className="row topAbout">
          <div className="col-md-6">
            <div className="row">
              <a target="_blank" href="https://www.linkedin.com/in/ariel-salem-43199412a">
              <div className="profiles">
                <p className="name">Ariel Salem</p>
                <img src="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAh_AAAAJGY5YTM4MzJkLTcxNWMtNDU2Yy04NjNlLTZkODFkMzZkNzYwZA.jpg" />
                <br />
                <br />
                <br />
                <br />
                <div className="row profile-description">
                  <p className="about-me-description">I'm a full-stack engineer with a strong background in JavaScript (ES6) that is passionate about design, development and building innovative products and systems that empower individuals and companies to succeed. I love working autonomously and in groups to take on challenges and solve problems that require cutting-edge technology and creativity.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <a target="_blank" href="https://www.linkedin.com/in/nathan-brewer-davis-604a36112">
             <div className="profiles">
               <p className="name">Nathan Brewer-Davis</p>
               <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAmHAAAAJGVjNmU3MmJmLWI4ZTItNDFiMC05OWZjLWVlODI5NWY0Y2QwYg.jpg" />
               <br />
               <br />
               <br />
               <br />
               <div className="row profile-description">
                 <p className="about-me-description">I believe in solving real world problems using technical skills. Being able to provide easy solutions to every day problems while providing a pleasant user experience is a wonderful thing. In technology, things are constantly changing, so I aim to be ready for that change as much as possible. I enjoy keeping up with new technologies, as well as diving into current ones.
                 </p>
               </div>
             </div>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <a target="_blank" href="https://www.linkedin.com/in/ryanaperry/">
            <div className="profiles">
              <p className="name">Ryan Perry</p>
              <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/05c/3b3/0de3dc3.jpg" />
               <br />
               <br />
               <br />
               <br />
               <div className="row profile-description">
                 <p className="about-me-description">I'm a full-stack software engineer from Indiana currently living in San Francisco. I constantly find myself exploring new topics, products, and technologies to learn and I have an interest in trying to understand the philosophy behind what makes companies run the way they do. I pride myself on my ability to draw on my past experiences and connections to add value to whatever team with which I'm working.
                 </p>
               </div>
             </div>
            </a>
          </div>
        </div>
          <div className="col-md-6">
          <div className="row">
            <a target="_blank" href="https://www.linkedin.com/in/samykebaish">
              <div className="profiles">
                <p className="name">Samy Kebaish</p>
                <img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAQUAAAAJDExZTYyY2YzLTNmNTUtNGJkZi05ZTkzLTQ1OTk5ZDM2ZTY1Mw.jpg" />
                <br />
                <br />
                <br />
                <br />
                <div className="row profile-description">
                  <p className="about-me-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        </div>
    )
  }
}
export default AboutUs;

