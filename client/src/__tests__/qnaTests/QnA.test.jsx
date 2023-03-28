import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../utils/test-utils';
import getQuestionsStub from '../proxies/getQuestionsProxy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/qa/questions', (req, res, ctx) => res(
    ctx.json(getQuestionsStub),
    ctx.delay(150),
  )),
  // PUT request: report an answer
  rest.put('/qa/answers/', (req, res, ctx) => res(
    ctx.json(getQuestionsStub),
    ctx.delay(150),
  ))
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('QnA shows loading message while it\'s loading', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );
  // check loading state
  expect(screen.queryByText('Loading...')).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});
test('QnA shows renders when correct data is received', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );
  // check loading state
  expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // check if all the components load
  // search bar
  expect(await screen.getByPlaceholderText('Have a question? Search for answers…')).toBeInTheDocument();
  // questions list
  /// buttons
  /// qna set
  //// question entry
  //// answer list
  ///// answer entry
  // expect(await screen.findByClass('Questions & Answers')).toBeInTheDocument();
  // expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
  // expect(screen.getByText('Some other string')).toBeInTheDocument();
});

test('A customer can post a question', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );
  // a button to add-question renders
  const addQuestion = await screen.findByRole('button', { name:'add-question' });
  expect(addQuestion).toBeInTheDocument();
  // when a button is clicked
  fireEvent.click(addQuestion);
  expect(await screen.findByText('Ask Your Question')).toBeInTheDocument(1);
});

test('A customer can post an answer', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );
  // add a question
  // a button to add-question renders
  const addAnswer = await screen.findAllByRole('button', { name:'add-answer' });
  expect(addAnswer[0]).toBeInTheDocument();
  // when a button is clicked
  fireEvent.click(addAnswer[0]);
  expect(await screen.findByText('Submit your Answer')).toBeInTheDocument(1);
  // submitting a question
  // a button to submit renders
  const submitAnswer = await screen.findByRole('button', { name: /submit/i });
  expect(submitAnswer).toBeInTheDocument();

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  // when a button is clicked
  const form = await screen.findByLabelText('window-form');

  expect(form).toBeInTheDocument();
  fireEvent.click(submitAnswer);
  // expect(await alertSpy).toHaveBeenCalled();
  // screen.logTestingPlaygroundURL();

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
  // Clean up the spy
  alertSpy.mockRestore();
});

test('A customer can report an answer', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );

  // report button is rendered
  const reportAnswer = await screen.findAllByRole('button', { name: /report-button/i });
  expect(reportAnswer[0]).toBeInTheDocument();


});