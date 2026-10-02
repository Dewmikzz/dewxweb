import React, { useState } from "react";
import "./index.css";
import "./components/extra.css";

import { SmoothScroll }  from "./components/SmoothScroll";
import { GrainOverlay }  from "./components/GrainOverlay";
import { CustomCursor }  from "./components/CustomCursor";
import { Loader }        from "./components/Loader";
import { Navigation }    from "./components/Navigation";
import { Hero }          from "./components/Hero";
import { Marquee }       from "./components/Marquee";
import { About }         from "./components/About";
import { BrandMoment }   from "./components/BrandMoment";
import { Projects }      from "./components/Projects";
import { Experience }    from "./components/Experience";
import { Skills }        from "./components/Skills";
import { Capabilities }  from "./components/Capabilities";
import { Process }       from "./components/Process";
import { Contact }       from "./components/Contact";
import { Footer }        from "./components/Footer";

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {/* Grain texture — always on top, non-interactive */}
      <GrainOverlay />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Loading overlay curtain */}
      {!loaderDone && (
        <Loader onComplete={() => setLoaderDone(true)} />
      )}

      {/* Main site rendered under preloader curtain */}
      <SmoothScroll>
          <div className="site-wrapper">
            <Navigation />

            <main id="main-content">
              {/* ① HERO — dark, cinematic, canvas animated */}
              <Hero />

              {/* ② MARQUEE — brand identity band (dark) */}
              <div className="marquee-band">
                <Marquee direction={-1} />
                <Marquee
                  direction={1}
                  text="INNOVATIVE SOLUTIONS • SCALABLE ARCHITECTURE • SEAMLESS EXPERIENCES • MODERN TECHNOLOGIES • "
                  gold
                />
              </div>

              {/* ③ STATEMENT + ABOUT — warm light → dark editorial */}
              <About />

              {/* ④ BRAND MOMENT — DewX scroll signature (warm light) */}
              <BrandMoment />

              {/* ⑤ SELECTED WORK — dark, full-screen panels */}
              <Projects />

              {/* ⑥ CAPABILITIES — warm ivory, accordion */}
              <Capabilities />

              {/* ⑦ EXPERIENCE — dark, timeline */}
              <Experience />

              {/* ⑧ PROCESS — warm */}
              <Process />

              {/* ⑨ TECHNOLOGY STACK — ivory */}
              <Skills />

              {/* ⑩ CONTACT — dark, cinematic */}
              <Contact />
            </main>

            {/* ⑪ FOOTER — deep dark */}
            <Footer />
          </div>
        </SmoothScroll>
    </>
  );
}

export default App;
