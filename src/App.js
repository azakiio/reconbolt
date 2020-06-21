import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./App.css";
import data from "./data.json";
import bmac from "./bmac.svg";

function importAll(r) {
  let images = {};
  r.keys().forEach(element => {
    images[element.replace("./", "").replace(".png", "")] = r(element); //refactor this shit
  });
  return images;
}

const images = importAll(require.context("./arrows", false, /\.(png|jpe?g|svg)$/));

function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

function Toggle(props) {
  var style = props.checked ? "default selected" : "default";

  return (
    <button className={style} onClick={() => props.change()}>
      {props.name}
    </button>
  );
}

function ToggleGroup(props) {
  const listItems = props.items.map(item => (
    <Toggle key={item} name={item} change={props.change} checked={props.tags.has(item)} />
  ));

  return (
    <div>
      <span style={{ fontWeight: "bold" }}> {props.name}: </span> {listItems}
    </div>
  );
}

function Output(props) {
  const [stage, setStage] = useState("Lineup");

  var arrow = props.arrow;
  var image, notes, bounce1, bounce2;

  function handleToggle() {
    setStage(this.name);
  }

  if (stage === "Destination") {
    image = arrow.ID + "d";
    notes = arrow.NotesD;
  } else if (stage === "Lineup") {
    image = arrow.ID + "l";
    notes = arrow.NotesL;
  } else {
    image = arrow.ID + "s";
    notes = arrow.NotesS;
  }

  if (arrow.Bounce === "0") {
    bounce1 = bounce2 = "bounce";
  } else if (arrow.Bounce === "1") {
    bounce1 = "bounce filled";
    bounce2 = "bounce";
  } else {
    bounce1 = bounce2 = "bounce filled";
  }

  return (
    <div className="arrow_container">
      <div className="arrow_image">
        <Zoom>
          <img className="arrow" src={images[image]} alt={image} />
        </Zoom>
        <div className="arrow_settings">
          <img className="charge" src={images[arrow.Charge]} alt={arrow.Charge}></img>
          <div className={bounce1}></div>
          <div className={bounce2}></div>
        </div>
        {notes && <div className="notes">{notes}</div>}
      </div>
      <StageSelect change={handleToggle} stage={stage} />
    </div>
  );
}

function StageSelect(props) {
  return (
    <div>
      <Toggle name="Setup" change={props.change} checked={true ? props.stage === "Setup" : false} />
      <Toggle name="Lineup" change={props.change} checked={true ? props.stage === "Lineup" : false} />
      <Toggle name="Destination" change={props.change} checked={true ? props.stage === "Destination" : false} />
    </div>
  );
}

const MoreInfo = (
  <div className="about">
    <div className="about-section">
      <h2>AnOthEr sOvA gUidE?</h2>
      <p>
        Yes, there are many Sova arrow guides all over the internet, especially in the form of videos. However, my issue
        with videos is lookup time. If I forget a lineup during a match and want to look it up, I would have to find the
        video that it came from and scrub through (or check comments) to find the lineup I’m looking for.
      </p>
      <p>
        My goal is to collect a bunch of lineups and label them based on their use-cases. If I’m defending A on Haven, I
        can alt-tab to this guide, pick the appropriate filters and Voila! I get all the arrows I need for that
        situation without the unnecessary stuff and in between rounds I can come back and adjust the filters for any new
        situations that come up (I have to defend a different site or we swap sides).
      </p>
      <p>I’ve tried to make the website and lineups as easy to use and clear to understand as possible.</p>
      <ul>
        <li>
          Each Arrow is divided into three stages: <i>Setup</i>, <i>Lineup</i>, and <i>Destination</i>. I’ve added
          notes, annotations, and tips where I thought it made sense (more on this later)
        </li>
        <li>
          I’ve tried to keep the labels flexible. If there is an arrow that could be used by Attackers and Defenders,
          then that arrow will appear if you select either filter
        </li>
        <li>Clearly indicated charge level and bounces for every shot</li>
        <li>Click on any image to full screen it</li>
      </ul>
    </div>

    <div className="about-section">
      <h2>Why did/didn't you do _____?</h2>
      <p>
        For example, I initially planned to have <i>Destination</i> be the default view for arrows as it provides the
        most information when deciding what arrow to choose but I’ve decided to switch the default view to <i>Lineup</i>{" "}
        as I believe it’s more recognizable to players (you don’t often get to see arrows at their destination).
      </p>
      <p>
        This example is meant to illustrate that the design decisions made on this website are based on what made sense
        to me. If anyone has feedback or suggestions (maybe a lineup is unclear or a useful filter is missing), I’d love
        to hear about it.
      </p>
      <p>
        For now, you can provide feedback through{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/azakiio">
          Github
        </a>{" "}
        or{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/azakiio">
          Twitter
        </a>
        .
      </p>
    </div>

    <div className="about-section">
      <h2>Possible next steps?</h2>
      <p>
        I initially began developing this with personal use in mind, so I didn’t really build this thing to scale very
        well. All the arrows are stored client-side and the metadata (arrow charge, bounces, and notes) is just an excel
        file converted to JSON (also served to the client).
      </p>
      <p>
        If there is enough interest, I’d like to get all that stored in some database to speed up load times and
        possibly facilitate user submitted arrows in the future. If you’d like to help make that happen, please consider{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/zaki">
          Buying me a Coffee.
        </a>
      </p>
    </div>

    <div className="about-section">
      <h2>Credits</h2>
      <p>
        Some of the arrows you can find here are lineups that I’ve been labbing in custom games but the vast majority of
        arrows are ones that I found on YouTube, mostly from <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/dafran">@dafran</a>. Here is a list of all the videos I’ve used to
        create this collection.
      </p>
      <ul>
        <li>https://www.youtube.com/watch?v=FUa4vsH-0jU</li>
        <li>https://www.youtube.com/watch?v=t7c7I6hpMSQ</li>
        <li>https://www.youtube.com/watch?v=suUuxs3waHI</li>
        <li>https://www.youtube.com/watch?v=-1oWzKZ-A9A</li>
      </ul>
    </div>
  </div>
);

function Container(props) {
  const [tags, setTags] = useState(new Set());
  const [showAbout, setAbout] = useState(false);

  function handleToggle() {
    let newTags = new Set(tags);

    if (newTags.has(this.name)) {
      newTags.delete(this.name);
    } else {
      newTags.add(this.name);
    }

    setTags(newTags);
    setAbout(false);
  }

  function resetTags() {
    setTags(new Set());
    setAbout(false);
  }

  function filterTags(element) {
    var elementTags = new Set(element.Tags.split(" "));

    if (tags.size === 0) {
      return false;
    }

    for (let test of tags) {
      if (!elementTags.has(test)) {
        return false;
      }
    }
    return true;
  }

  const arrows = data.arrows.filter(filterTags).map((element, index) => <Output key={index} arrow={element} />);

  const noTags = (
    <div className="no-tags">
      <h2>Welcome to ReconBolt!</h2>
      <p>Your Alt-Tab guide for Sova Arrows</p>
      <p>Pick filters to get started</p>
      <p>
        <span className="about-button" onClick={() => setAbout(!showAbout)}>
          Read Me {showAbout ? <i class="fas fa-minus"></i> : <i class="fas fa-plus"></i>}
        </span>
      </p>
      {showAbout && MoreInfo}
    </div>
  );

  const footer = (
    <div className="footer">
      <p>
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/azakiio">
          Adham Zaki
        </a>
      </p>

      <p>
        Check out the{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/azakiio">
          Project Repo
        </a>
      </p>

      <p>
        <a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/zaki">
          <img src={bmac} alt="Buy Me a Coffee"></img>
        </a>
      </p>
    </div>
  );

  return (
    <React.Fragment>
      <div className="container">
        <h1>ReconBolt</h1>
        <div>
          <ToggleGroup name="Map" items={["Haven", "Bind", "Split", "Ascent"]} change={handleToggle} tags={tags} />
          <ToggleGroup name="Side" items={["Attack", "Defense"]} change={handleToggle} tags={tags} />
          <ToggleGroup name="Target" items={["A", "Mid", "B", "C"]} change={handleToggle} tags={tags} />
          <button className="reset" onClick={resetTags}>
            Reset Tags
          </button>
        </div>
        {!tags.size && noTags}
        {arrows}
      </div>
      {footer}
    </React.Fragment>
  );
}

export default App;
