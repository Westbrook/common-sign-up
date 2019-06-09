import { html, fixture, expect } from '@open-wc/testing';

import '../src/common-sign-up.js';

describe('<common-sign-up>', () => {
  it('has a default property heading', async () => {
    const el = await fixture('<common-sign-up></common-sign-up>');

    expect(el.heading).to.equal('Hello world!');
  });

  it('allows property heading to be overwritten', async () => {
    const el = await fixture(html`
      <common-sign-up heading="different heading"></common-sign-up>
    `);

    expect(el.heading).to.equal('different heading');
  });
});
