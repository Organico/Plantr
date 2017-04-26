Plantr

### Tech Stack

1. React & Redux
2. Node.js & Express
3. MongoDB & Mongoose
4. Webpack (bundling)
5. BootStrap for Styling
6. Three.JS for Three-D Rendering

### Instructions to setup
##### Prerequisites
1. Node version > 4
2. mongodb installed
3. Chrome or Firefox Compatible

##### Steps
1. `npm install`
2. `mongod` (to start up mongodb instance) <-- is this still necessary??
3. `npm run dev`
4. Goto `http://localhost:3000`

Plantr is an online gardening and outdoor decor service, enabling people to create and plan their seasonal gardens based on regional variations and personal needs. Plantr combines the openweather API (https://openweathermap.org/api) and the tedious work of Frostline (https://github.com/waldoj/frostline) in order to give users real-time updates on their crops, while offering users suggestions on what to plant based on their location. In addition, we have created a useful database for individuals seeking specific open-sourced plant information since we could not find any that suited our needs.

Note that the site requires auth0 login via a google account to verify user information.

Run It Yourself

##### Steps
1. `npm install`
2. `npm run dev`
3. Goto `http://localhost:3000`

##### Logging In
Currently, auth0 is used to verify users through google accounts. Once users have logged onto the website, they will be able to access the rest of the site.

##### Profile Page
Users can access their profile page by simply clicking on their google profile picture in the top-left corner of the nav bar. The Profile Page will display the users picture, and brief snippets on the posts they've made in the forums, and the gardens they have created

##### Forum Page <--- FIX
Forum posts can be searched, added, and read on the Forum tab. As it stands currently, our Forum is a single-page with users being able to make posts onto the forum, comment and reply to other posts, as well as edit and delete their own posts and replies. Creating a post starts by clicking the *****'BLANK'***** button.

##### Create Gardens Page <--- FIX
The Create Gardens page allows users to create their own custom-gardens. Users simply drag their preferred garden dimensions, select the type of tiles and plants they want, and drag and drop each in the desired location. The app will also warn users based on their location weather the produce they are trying to grow is suitable to their location or not. This information is based on the USDA Plant Hardiness Zone*. ****NOT SURE ABOUT*** With every plant added to the garden, an overall estimated cost will be generated for the user that they may access by inspecting the seed packet. (It should be noted that these prices are based on the average cost of a seed packet - costs are therefore only estimated once per-plant). The app will automatically generate a BLANK ANALYTICS. Once the gardens have been submitted, users will receive an email confirming their submission, as well as a screenshot of their 2-D garden as a reference. We were able to achieve this functionality by integrating NodeMailer (https://nodemailer.com/about/). It is through NodeMailer that we are currently notifying users in the event of inclement weather that may require them to care for their crops more attentively.

Plant Hardiness Zones*
Plant Hardiness Zones are the national for knowing which plants will grow where. It’s determined based on the average annual minimum temperature over the prior 30 years, with each zone comprising a 10°F band. There are 26 zones in all. The standard was developed by the U.S., but other countries have adopted the same standard. Companies that sell plants, seeds, roots, and bulbs (e.g., Burpee) use these zones to help customers understand what will thrive in their area, and to decide when to ship orders to help them to thrive. For more information, see the Wikipedia entry(https://en.wikipedia.org/wiki/Hardiness_zone) or the USDA’s explanation(http://planthardiness.ars.usda.gov/PHZMWeb/About.aspx).

##### My Gardens Page <--- FIX
The My Gardens page allows users to view the gardens they've created. While the default view is the 2-D view, our team has integrated a 3-D view that is available to desktop as well as VR users. By toggling the 3-D view, users can see how their gardens will look once they've matured - giving the client a more realistic view on how the finish product will look.

##### TODO:
- Setup warning system for users about weather
- Add Tests
