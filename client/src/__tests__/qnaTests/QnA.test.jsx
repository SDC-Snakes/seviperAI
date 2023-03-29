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
  rest.put('/qa/answers/:answerId/report', (req, res, ctx) => res(
    ctx.status(204),
    ctx.delay(150),
  )),
  rest.put('/qa/:questionOrAnswer/:itemId/helpful', (req, res, ctx) => res(
    ctx.status(204),
    ctx.delay(150),
  )),
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
  // check if main div is loaded
  expect(await screen.findByText('Questions & Answers')).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
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
  const reportAnswer = (await screen.findAllByRole('button', { name: /report-button/i }))[0];
  expect(reportAnswer).toBeInTheDocument();
  fireEvent.click(reportAnswer);
  await waitFor(() => {
    expect(reportAnswer).toBeDisabled();
  });
});

test('A customer can mark a question helpful', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );

  // report button is rendered
  const helpfulQuestion= (await screen.findAllByLabelText('helpful-button'))[0];
  expect(helpfulQuestion).toBeInTheDocument();
  // before: helpful count is 27
  expect(helpfulQuestion.textContent).toBe('Yes(27)');
  // button is clicked
  fireEvent.click(helpfulQuestion);
  await waitFor(() => {
    // helpful count changes from 27 to 28
    expect(helpfulQuestion.textContent).toBe('Yes(28)');
  });
});

test('A customer can search questions by keywords', async () => {
  renderWithProviders(
    <Router>
      <QuestionsAnswers />
    </Router>,
  );

  // search bar is rendered
  const searchBar = await screen.findByLabelText('search-bar');
  expect(searchBar).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
  // before: show the first question and Not show a question that is behind
  expect(await screen.queryByText('Maiores dolor quam soluta.')).toBeInTheDocument();
  expect(await screen.queryByText('Testing Search bar: Keyword XYZXYZ')).toBeNull();
  // search query is set;
  fireEvent.change(searchBar, { target: {value: 'XYZ'} });


  await waitFor(() => {
    // helpful count changes from 27 to 28
    expect(screen.queryByText('Maiores dolor quam soluta.')).toBeNull();
    expect(screen.queryByText('Testing Search bar: Keyword XYZXYZ')).toBeInTheDocument();
  });
});

