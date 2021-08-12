import {render, screen} from '../test-utils'
import React from 'react'

import '@testing-library/jest-dom/extend-expect'

import Movies from '../pages/Movies'
import Card from '../components/Card'


test('Check element with Movie text', () => {
  render(
    <Movies/>
  )

  expect(screen.getByText(/Movie/i)).toBeInTheDocument()
})

test('check card', () => {
  render(<Card movie={{ Poster: 'test', Title: 'test', Year: 'test' }} />);
  const posterUrl = screen.getByTestId('image-test')
  expect(posterUrl).toHaveAttribute('src')
});