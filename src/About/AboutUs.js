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
                  <p className="about-me-description">Ariel is a full-stack engineer with a strong background in JavaScript (ES6) that is passionate about design, development and building innovative products and systems that empower individuals and companies to succeed. He loves working autonomously and in groups to take on challenges and solve problems that require cutting-edge technology and creativity.
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
                 <p className="about-me-description">Nathan believes in solving real world problems using technical skills. Being able to provide easy solutions to every day problems while providing a pleasant user experience is a wonderful thing. In technology, things are constantly changing, so his aim is to be ready for that change as much as possible. He enjoys keeping up with new technologies, as well as diving into current ones.
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
                 <p className="about-me-description">Ryan Perry is a full-stack software engineer from Indiana currently living in San Francisco. Ryan enjoys exploring new topics, products, and technologies to learn and has an interest in trying to understand the philosophy behind what makes companies run the way they do. He prides himself on his ability to draw on his past experiences and connections to add value to whatever team with which he's working.
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
                  <p className="about-me-description">Samy Kebaish is a driven software engineer with a background in Biochemistry and Cognitive Neuroscience. He has a particular passion in solving challenging problems and delivering well-crafted code in both individual and group settings. Samy hopes to one day integrate his knowledge of science and technology and go into the bio-tech field.
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

