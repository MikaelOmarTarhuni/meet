import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('user has not selected show details', () => {
    });
    let AppWrapper;
    when('they see a list of upcoming events', () => {
      AppWrapper = mount(<App />);
    });

    then('the details will be hidden by default', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    });
});

test('User can expand an event to see its details.', ({ given, when, then }) => {
    let AppWrapper;
    given('the list of upcoming events are displayed.', async () => {
      AppWrapper = mount(<App />);
    });

    when('the user expands an event.', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    then('the details of the event will be displayed.', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(1);
    });
});


test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let AppWrapper;
    given('the details for upcoming events are displayed', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    when('the user collapses the event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    then('the details of the event will be hidden', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0);
    });
  });
});