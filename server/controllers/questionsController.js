const axios = require('axios');

module.exports = {
  get: (req, res) => {
    // Finding a way to add query params in axios config would be cleaner
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    if (req.query.product_id) {
      axios.get(`${process.env.ATLIER_API_ROUTE}/qa/questions?product_id=${req.query.product_id}`, {
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
    axios.post(`${process.env.ATLIER_API_ROUTE}/qa/questions`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
      data: req.body,
    })
      .then(() => {
        res.status(201).send('Question created');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  postAnswer: (req, res) => {
    axios.post(`${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.question_id}/answers`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
      data: req.body,
    })
      .then(() => {
        res.status(201).send('Answer created');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  putHelpful: (req, res) => {
    axios.put(`${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.answerOrQuestion_id}/helpful`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
    })
      .then(() => {
        res.status(204).send('Marked as helpful');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
  putReport: (req, res) => {
    axios.put(`${process.env.ATLIER_API_ROUTE}/qa/questions/${req.params.answerOrQuestion_id}/report`, {
      headers: {
        Authorization: process.env.GITHUB_API_KEY,
      },
    })
      .then(() => {
        res.status(204).send('Marked as helpful');
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  },
};
