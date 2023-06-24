import { component$ } from '@builder.io/qwik';
import styles from './hero.module.css';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class={['container', styles.hero]}>
      <h1>
        Il est <span class="highlight">temps</span>
        <br />
        d'apprendre<span class="highlight">Qwik</span>
      </h1>
      <p><Link href="/start">Commencer ici</Link></p>
    </div>
  );
});
