import Image from "next/image";
import Map from "../components/Map";
export default function Home() {
  return (
  <div className='content'>
    <img src="/franchiseLogo.png" alt="Franchise Sports Camp Logo" width={200} height={200} />
    <h1 className="title">Franchise Sports Camp</h1>
    <div className="announcement greenBG">
      <h2>Registration Open Now!</h2>
      <p>Registration Open March 1st to July 20th</p>
      <p>Camp Runs rom July 24th to August 21st </p>
    </div>
    <div className="sideBySide blueBG">
      <div className="textSection">
        <h2>Welcome to Franchise Sports Camp!</h2>
        <p>Our summer camp offers a fun and engaging experience for children.</p>
        <p>4 Week Summer camp for children aged 5 - 13</p>
      </div>
      <Image 
        src="/parachute.jpg" 
        alt="Children playing with a parachute"
        width={400}
        height={300}
        className="responsiveImage"
      />
    </div>
    <div className="sideBySide redBG">
      <Image 
        src="/tug-of-war.jpg" 
        alt="Children playing tug of war"
        width={400}
        height={300}
        className="responsiveImage"
      />
      <div className="textSection">
        <h2>Exercise over summer break</h2>
        <p>Our camp provides a variety of physical activities to keep children active and healthy during the summer months.</p>
        <p>From team sports to individual challenges, there's something for everyone!</p>
      </div>
    </div>
    <div className="sideBySide locationContainer orangeBG">
      <div className="textSection">
        <p><strong>Location:</strong></p>
        <p>Conveniently located in Woodbury, NJ</p>
        <p>30 minutes from Philadelphia</p>
        <p>Close to the NJ Turnpike, RT. 295, RT. 55, and RT. 42</p>
      </div>
      <div className="mapContainer">
        <Map />
      </div>
    </div>
  </div>
  );
}
