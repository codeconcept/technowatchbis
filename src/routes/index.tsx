import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Hero from '~/components/starter/hero/hero';

export default component$(() => {
  return (
    <>
      <Hero />

      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>  

    </>
  );
});

export const head: DocumentHead = {
  title: 'Veille Techno',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
