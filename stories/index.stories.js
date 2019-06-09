import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import CommonSignUp from '../src/CommonSignUp.js';
import '../src/common-sign-up.js';

import readme from '../README.md';

storiesOf('common-sign-up', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(CommonSignUp), { notes: { markdown: readme } })
  .add(
    'Alternative Header',
    () => html`
      <common-sign-up></common-sign-up>
    `,
  );
