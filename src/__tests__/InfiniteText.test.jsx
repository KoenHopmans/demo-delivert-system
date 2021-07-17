import { render, screen } from '@testing-library/react';
import InfiniteText from '../components/ReusableComponents/InfiniteTextAnnimation/InfiniteText';

test('should render InfiniteText component', () => {
  render(<InfiniteText />);
  const headerElement = screen.getByTestId('infinite-text');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('Soundport RemixHexagon RadioDon Diablo 2021housedancetechnoLet the Music SpeakEDC FestivalBalaton SoundAirbeat One FestivalDon Diablo Forever XLAMFLollapalooza BerlinAirbeat One FestivalPinkpopThe Flying DutchKingsland FestivalTomorrowlandSziget FestivalNew Horizons');
});
