import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>NEW INVESTIGATION / 001
          </div>
          <h1>
            Tell us what happened <em>first.</em>
          </h1>
          <p className="hero-intro">
            Start with the story you can't stop thinking about. We'll build the case around it.
          </p>
          <Link to="/create" className="button button-primary">
            <span>Prepare the case</span>
            <span>↗</span>
          </Link>
          <div className="microcopy">AI Mystery Room engine is online and ready.</div>
        </div>
      </section>
    </div>
  );
}