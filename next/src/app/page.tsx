import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Willkommen bei Bloxie</h1>
        <p className={styles.description}>
          Ihre Terminbuchungs-Plattform
        </p>
        <div className={styles.info}>
          <p>Um einen Termin zu buchen, besuchen Sie:</p>
          <code className={styles.code}>bloxie.ch/[firmenname]</code>
        </div>
      </main>
    </div>
  );
}

