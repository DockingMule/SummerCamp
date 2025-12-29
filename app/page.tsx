import Image from "next/image";
import Map from "../components/Map";
export default function Home() {
  return (
  <div className='content'>
    <div className="headerSection">
      <img src="/group_pic_header.png" alt="Franchise Sports Camp Logo" width={'100%'} height={200} className="headerImage" />
      <img src="/franchiseLogo.png" alt="Franchise Sports Camp Logo" width={200} height={200} className="logo" />
      <div className="announcement greenBG">
        <h2>Registration Open Now!</h2>
        <p>Registration Open March 1st to July 20th</p>
        <p>Camp Runs rom July 24th to August 21st </p>
        <a href="/register" className="registrationButton">Click here to Register!</a>
      </div>
    </div>
    <div className="sideBySide blueBG">
      <div className="textSection">
        <h2>Welcome to Franchise Sports Camp!</h2>
        <p>Our summer camp offers a fun and engaging experience for children.</p>
        <p>4 Week Summer camp for children aged 5 - 13</p>
      </div>
      <Image 
        src="/dribble.png" 
        alt="Children playing with a parachute"
        width={450}
        height={300}
        className="responsiveImage"
      />
    </div>
    <div className="sideBySide orangeBG">
      <Image 
        src="/basketball.png" 
        alt="Children playing with a parachute"
        width={400}
        height={300}
        className="responsiveImage"
      />
      <div className="textSection">
        <h2>Welcome to Franchise Sports Camp!</h2>
        <p>Our summer camp offers a fun and engaging experience for children.</p>
        <p>4 Week Summer camp for children aged 5 - 13</p>
      </div>
    </div>
    <div className="sideBySide redBG">
      <div className="textSection">
        <h2>Exercise over summer break</h2>
        <p>Our camp provides a variety of physical activities to keep children active and healthy during the summer months.</p>
        <p>From team sports to individual challenges, there's something for everyone!</p>
      </div>
      <Image 
        src="/soccer_smile.png" 
        alt="Children playing tug of war"
        width={400}
        height={300}
        className="responsiveImage"
      />
    </div>
    <div className="locationContainer greenBG">
      <div className="sideBySide">
        <div className="textSection">
          <p><strong>June 29th - July 2nd,<br/> July 6th - July 9th</strong></p>
          <p>James G. Atkinson Memorial Park</p>
          <p>Sewell, NJ</p>
          <p>Park featuring a jogging/biking trail, picnic areas, playgrounds & various athletic fields & courts.</p>
        </div>
        <div className="mapContainer">
          <Map url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.766974676367!2d-75.11876872835424!3d39.75119731582053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6d72cc8ea629d%3A0xccdc602effe7b7d3!2sJames%20G.%20Atkinson%20Memorial%20Park!5e0!3m2!1sen!2sus!4v1766960628286!5m2!1sen!2sus"/>
        </div>
      </div>
      <div className="sideBySide">
        <div className="textSection">
          <p><strong>July 13th - July 16th,<br/>July 20th - July 23rd</strong></p>
          <p>Conveniently located in Woodbury, NJ</p>
          <p>30 minutes from Philadelphia</p>
          <p>Close to the NJ Turnpike, RT. 295, RT. 55, and RT. 42</p>
        </div>
        <div className="mapContainer">
          <Map url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42430.69895269954!2d-75.16165625474238!3d39.831629158504214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ce350ce638bf%3A0xf91346f84eada73b!2sDeptford%20Sports%20Complex!5e0!3m2!1sen!2sus!4v1766961802190!5m2!1sen!2sus"/>
        </div>
      </div>
      </div>
      <div className="sideBySide orangeBG">
        <div className="textSection">
          <p><strong>Who are we?</strong></p>
          <p>Frank has 20+ years of experience teaching Physical education. And the same amount of years coaching various sports and running camps. Over the years he has developed the most effective and fun way to run a camp. His sports camps have more of a summer camp vibe where kids make new friends, enjoy playing in fun activities while still practicing the basic fundamentals and skills of each sport.</p>
          <p>You could be a beginner or an avid player, one thing his camps do is make it possible for both to participate in the games and activities together and not have to fear they won't be good enough.</p>
        </div>
<img src="/group_pic.png" alt="Frank Pic" width={400} height={300} className="responsiveImage" />
      </div>
    </div>
  );
}
