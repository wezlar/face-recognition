import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import DrawBox from './DrawBox';

afterEach(cleanup);

describe(`Test DrawBox`, () => {
  test(`Test snapshot`, () => {
    const match = [
      {
        _label: 'Test Label 1',
      },
      {
        _label: 'Test Label 2',
      }
    ];

    const detections = [
      {
        box: {
          height: 100,
          width: 200,
          _x: 300,
          _y: 400,
        },
      },
    ];

    const { container, getByTestId, debug } = render(
      <DrawBox 
        match={match} 
        detections={detections} />
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('draw-box').children.length).toBe(1);
    expect(getByTestId('draw-box').style.height).toBe('100px');
    expect(getByTestId('draw-box').style.width).toBe('200px');
    expect(getByTestId('draw-box').style.transform).toBe('translate(300px, 400px)');
  });
});