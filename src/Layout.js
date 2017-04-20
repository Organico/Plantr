import React from "react";
import AuthService from './config/AuthService.js';
import { connect } from 'react-redux';
import NewsFeed from './Home/NewsFeed';

export default class Layout extends React.Component {
    render() {

    let background = {
      marginTop: '10px',
      marginLeft: '10px',
      backgroundImage: 'url(https://static.pexels.com/photos/132957/pexels-photo-132957.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'fixed',
      backgroundSize: 'cover',
      borderRadius: '10px'
    };

    let font = {
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    };
    let color = {
      color: 'white',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    }
    return (
      <div className="container login">
        <div className="row">
          <div className="col-xs-6 col-md-6" style={background}>
            <h1 className="display-3" style={color}>Welcome to Plantr!</h1>
            <p className="lead" style={font}>Plantr is an online gardening and outdoor decor service, enabling people to create and plan their seasonal gardens based on regional variations and personal needs. Plantr was started by a group of passionate urban farmers looking to maximize their lots while incorporating the tech they use to help connect with their garden. It is through the passion of our users that Plantr is able to tell the story of who we are and how we connect with one another.</p>
            <hr className="my-2"/>
            <p style={font}>From customization to cost and weather integration, Plantr gives you the tools to make gardening quick and easy. Sign up to join our community of local growers to find out how you can take your gardening skills to the next level! </p>
            <p className="lead">
            </p>
          </div>
        </div>
        <NewsFeed />
      </div>
    )
  }
 /* render(){
    return(
  <div>

    <div className="blog-masthead">
      <div className="container">
       <h1 className="blog-title">Welcome to Plantr!</h1>
      </div>
    </div>

    <div className="blog-header">
      <div className="container">

        <p className="lead blog-description">.</p>
      </div>
    </div>

    <div className="container">

      <div className="row">
      <div className="col-sm-4">
          <div>
            <h4>Welcome Back Ariel!</h4>
            <img src={'http://media.independent.com/img/photos/2009/07/29/Arial-Salem-TOC_t479.jpg?ad14627618f647f3902aa65ed5ac8237c798b1ef'} alt="boohoo" className="img-responsive"/>
          </div><br></br>
          <div className="sidebar-module">
            <h4>Garden of the Day</h4>
             <img src={'http://www.motherearthnews.com/-/media/Images/MEN/Editorial/Articles/Magazine-Articles/2011/06-01/Get-the-Most-From-Vegetable-Garden-Mulches/mulched-garden.jpg'} alt="boohoo" className="img-responsive"/>
          </div>
          <div>
            <h4>Deal-of-the-Day!</h4>
            <img src={'https://faa81132b7.site.internapcdn.net/products/Miracle-Gro/US-Miracle-Gro-Water-Soluble-All-Purpose-Plant-Food-1000283-Extra01-Lrg.png'} alt="boohoo" className="img-responsive"/>
          </div><br></br>


          <div className="sidebar-module">
            <h4>Elsewhere</h4>
            <ol className="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </div>
        </div>


        <div className="col-sm-8 main">

          <div className="blog-post">
            <h2 className="blog-post-title">Sample blog post</h2>
            <p className="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>

            <p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>
            <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            <blockquote>
              <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </blockquote>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
            <h2>Heading</h2>
            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <h3>Sub-heading</h3>
            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
            <pre><code>Example code block</code></pre>
            <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
            <h3>Sub-heading</h3>
            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <ul>
              <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
              <li>Donec id elit non mi porta gravida at eget metus.</li>
              <li>Nulla vitae elit libero, a pharetra augue.</li>
            </ul>
            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
            <ol>
              <li>Vestibulum id ligula porta felis euismod semper.</li>
              <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
              <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>
            </ol>
            <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>
          </div>

          <div className="blog-post">
            <h2 className="blog-post-title">Another blog post</h2>
            <p className="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>

            <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            <blockquote>
              <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </blockquote>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          </div>

          <div className="blog-post">
            <h2 className="blog-post-title">New feature</h2>
            <p className="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></p>

            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <ul>
              <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
              <li>Donec id elit non mi porta gravida at eget metus.</li>
              <li>Nulla vitae elit libero, a pharetra augue.</li>
            </ul>
            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
            <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
          </div>

          <nav className="blog-pagination">
            <a className="btn btn-outline-primary" href="#">Older</a>
            <a className="btn btn-outline-secondary disabled" href="#">Newer</a>
          </nav>

        </div>
      </div>

    </div>

    <footer className="blog-footer">
      <p>Blog template built for <a href="https://getbootstrap.com">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>
    </div>
    )
  }*/
}