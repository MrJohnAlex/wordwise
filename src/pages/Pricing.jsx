import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <PageNav />
      <section>
        {/* image */}
        <div className="desc">
          <h1>Simple pricing. Just $9/month.</h1>
          <p>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </p>
        </div>
        <img src="product.jpg" alt="Product image" />
      </section>
    </main>
  );
}
