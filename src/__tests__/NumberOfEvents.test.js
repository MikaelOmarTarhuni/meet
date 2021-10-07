import { shallow } from 'enzyme';
import React from 'react';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEventsInput')).toHaveLength(1);
  });

  test('redner text input correcty', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      query: '5'
    });
    const eventObject = { target: { value: '2' }};
    NumberOfEventsWrapper.find('.numberOfEventsInput').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('query')).toBe('2');
  });

});