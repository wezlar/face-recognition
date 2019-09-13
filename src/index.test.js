import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

// import index from './index';

afterEach(cleanup);

describe('Test ImageInput', () => {
  test.skip('Test snapshot', async () => {
    const { container, debug } = render(index);
    debug();
    expect(container.firstChild).toMatchSnapshot();
  });
});
