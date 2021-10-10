import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

// checks whether an element with the class name city exists within the CitySearchWrapper component
describe('<CitySearch /> component', () => {
  // locations passed as a prop to CitySearch component
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  // test for an element with className 'suggestions'
  test('renders a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  // query element from the CitySearch state
  /* Sets it to the query that the user types into the textbox. It 
  Then compares the value prop of each element that has the class city found within the CitySearch component and checks if the input field's value prop is equal to what’s in the CitySearch query state, only passing if the two match
  */
  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  /* The query state has been set to be “Munich”. 
  eventObject is telling it to change its value to Berlin once the change event is called. 
  The simulate() function is being run on the city element found within CitySearch. 
  The simulate() function takes two parameters: 'change', and eventObject. 
  IT simulateS a change on the city—changing it into the target value: 'Berlin'. 
  The value of query in the expect() is compared with the string 'Berlin'. 
  If city now has the value 'Berlin', the test will pass
  */
  test('change state when text input changes', () => {
    CitySearchWrapper.setState({
      query: 'Munich'
    });
    const eventObject = { target: { value: 'Berlin' }};
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  })

  test('render list of suggestions correctly', () => {
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });

  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    // test whether the state of suggestions only has cities that match the locations after filtering the locations prop against what’s in the state of query.
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    // use toEqual to compare two arrays
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });

  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({
      query: 'Berlin'  });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

  test('selecting CitySearch input reveals the suggstions list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
  });

  test("selecting a suggestion should hide the suggestions list", () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
  });
});