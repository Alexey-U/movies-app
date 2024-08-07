import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <section className="error-page" style={{ textAlign : 'center' }}>
      <div className="error-container">
        <h1 style={{ color : 'white' }}>oops! it's a dead end</h1>
        <Link to="/" className="btn btn-primary" style={{ color : 'white' }}>
          back home
        </Link>
      </div>
    </section>
  );
}
