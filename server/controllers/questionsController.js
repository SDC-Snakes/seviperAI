const axios = require('axios');

module.exports = {
  get: (req, res) => {
    // Finding a way to add query params in axios config would be cleaner
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    if (req.query.product_id) {
      axios.get(`${process.env.ATLIER_API_ROUTE}/qa/questions/?product_id=${req.query.product_id}&page=${req.query.page}&count=${req.query.count}`, {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    } else {
      axios.get(`${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.question_id}/answers?page=${page}&count=${count}`, {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      })
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    }
  },
  postQuestion: (req, res) => {
    axios.post(
      `${process.env.ATLIER_API_ROUTE}/qa/questions`,
      req.body,
      {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      },
    )
      .then(() => {
        res.status(201).send('Question created');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  postAnswer: (req, res) => {
    axios.post(
      `${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.question_id}/answers`,
      req.body,
      {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      },
    )
      .then(() => {
        res.status(201).send('Answer created');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  putQuestionHelpful: (req, res) => {
    console.log(req);
    axios.put(
      `${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.question_id}/helpful`,
      null,
      {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      },
    )
      .then(() => {
        res.status(204).send('Marked as helpful');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  putAnswerHelpful: (req, res) => {
    console.log(req.params);
    axios.put(
      `${process.env.ATLIER_API_ROUTE}/qa/answers/${req.params.answer_id}/helpful`,
      null,
      {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      },
    )
      .then(() => {
        res.status(204).send('Marked as helpful');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  putAnswerReport: (req, res) => {
    axios.put(
      `${process.env.ATLIER_API_ROUTE}/qa/answers/${req.params.answer_id}/report`,
      null,
      {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
        },
      },
    )
      .then(() => {
        res.status(204).send('Marked as helpful');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
};
