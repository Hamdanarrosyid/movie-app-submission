import { render, screen } from '@testing-library/react';
import Card from '../components/Card'

test('check poster', () => {
    render(<Card movie={{ Poster: 'dsadasd', Title: 'asdas', Year: 'dsad' }} />);
    const posterUrl = screen.getByTestId('image-test')
    // console.log(posterUrl)
    expect(posterUrl).toHaveAttribute('src')
});
