var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../models');

router.post('/member', function(req, res, next) {
  // Password validation?
  models.member.create(req.body, {
    fields: ['username', 'nickname', 'email', 'password'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/member/:member_id', function(req, res, next) {
  models.member.findByPk(req.params.member_id)
  .then(member => {
    if (member) {
      res.json({
        success: 'ok',
        username: member.username,
        nickname: member.nickname,
        email: member.email,
        create: member.created,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.put('/member/:member_id', function(req, res, next) {
  models.member.update(req.body, {
    fields: ['nickname', 'email', 'password'],
    where: {
      member_id: req.params.member_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/member/:member_id', function(req, res, next) {
  models.member.destroy({
    where: {
      member_id: req.params.member_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/problem/category', function(req, res, next) {
  models.problem_category.findAll({
    attributes: ['category_id', 'parent_id', 'name'],
  })
  .then(categories => {
    res.json({
      success: 'ok',
      category: categories,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/problem', function(req, res, next) {
  models.problem.create(req.body, {
    fields: ['category_id', 'member_id', 'title', 'content', 'time_limit', 'reference'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/problem', function(req, res, next) {
  models.problem.findAll({
    attributes: ['problem_id', 'category_id', 'member_id', 'title', 'created', 'vote', 'difficulty'],
  })
  .then(problems => {
    res.json({
      success: 'ok',
      problem: problems,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/problem/:problem_id', function(req, res, next) {
  models.problem.findByPk(req.params.problem_id)
  .then(problem => {
    if (problem) {
      res.json({
        success: 'ok',
        category_id: problem.category_id,
        member_id: problem.member_id,
        title: problem.title,
        content: problem.content,
        time_limit: problem.time_limit,
        reference: problem.reference,
        created: problem.created,
        vote: problem.vote,
        difficulty: problem.difficulty,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.put('/problem/:problem_id', function(req, res, next) {
  models.problem.update(req.body, {
    fields: ['category_id', 'title', 'content', 'time_limit', 'reference'],
    where: {
      problem_id: req.params.problem_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/problem/:problem_id', function(req, res, next) {
  models.problem.destroy({
    where: {
      problem_id: req.params.problem_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/solve', function(req, res, next) {
  models.solve.create(req.body, {
    fields: ['problem_id', 'member_id', 'content', 'duration'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/solve', function(req, res, next) {
  models.solve.findAll({
    attributes: ['solve_id', 'problem_id', 'member_id', 'content', 'date', 'duration'],
  })
  .then(solves => {
    res.json({
      success: 'ok',
      solve: solves,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/solve/:solve_id', function(req, res, next) {
  models.solve.findByPk(req.params.solve_id)
  .then(solve => {
    if (solve) {
      res.json({
        success: 'ok',
        problem_id: solve.problem_id,
        member_id: solve.member_id,
        content: solve.content,
        duration: solve.duration,
        created: solve.created,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/solve/member/:member_id', function(req, res, next) {
  models.solve.findAll({
    attributes: ['solve_id', 'problem_id', 'content', 'duration', 'created'],
    where: {
      member_id: req.params.member_id,
    },
  })
  .then(solves => {
    res.json({
      success: 'ok',
      solve: solves,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/answer', function(req, res, next) {
  models.answer.create(req.body, {
    fields: ['problem_id', 'member_id', 'content', 'reference'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/answer/:answer_id', function(req, res, next) {
  models.answer.findByPk(req.params.answer_id)
  .then(answer => {
    if (answer) {
      res.json({
        success: 'ok',
        problem_id: answer.problem_id,
        member_id: answer.member_id,
        content: answer.content,
        reference: answer.reference,
        created: answer.created,
        vote: answer.vote,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.put('/answer/:answer_id', function(req, res, next) {
  models.answer.update(req.body, {
    fields: ['content', 'reference'],
    where: {
      answer_id: req.params.answer_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/answer/:answer_id', function(req, res, next) {
  models.answer.destroy({
    where: {
      answer_id: req.params.answer_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/comment', function(req, res, next) {
  models.comment.create(req.body, {
    fields: ['parent_id', 'member_id', 'problem_id', 'answer_id', 'document_id', 'content'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/comment/:comment_id', function(req, res, next) {
  models.comment.findByPk(req.params.comment_id)
  .then(comment => {
    if (comment) {
      res.json({
        success: 'ok',
        parent_id: comment.parent_id,
        member_id: comment.member_id,
        problem_id: comment.problem_id,
        answer_id: comment.answer_id,
        document_id: comment.document_id,
        content: comment.content,
        created: comment.created,
        vote: comment.vote,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.put('/comment/:comment_id', function(req, res, next) {
  models.comment.update(req.body, {
    fields: ['content', 'reference'],
    where: {
      comment_id: req.params.comment_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/comment/:comment_id', function(req, res, next) {
  models.comment.destroy({
    where: {
      comment_id: req.params.comment_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/vote', function(req, res, next) {
  models.vote.create(req.body, {
    fields: ['member_id', 'problem_id', 'answer_id', 'document_id', 'comment_id', 'type'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/vote/:vote_id', function(req, res, next) {
  models.vote.findByPk(req.params.vote_id)
  .then(vote => {
    if (vote) {
      res.json({
        success: 'ok',
        member_id: vote.member_id,
        problem_id: vote.problem_id,
        answer_id: vote.answer_id,
        document_id: vote.document_id,
        comment_id: vote.comment_id,
        type: vote.type,
        created: vote.created,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/vote/:vote_id', function(req, res, next) {
  models.vote.destroy({
    where: {
      vote_id: req.params.vote_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/difficulty', function(req, res, next) {
  models.difficulty.create(req.body, {
    fields: ['problem_id', 'member_id', 'difficulty'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/difficulty/:difficulty_id', function(req, res, next) {
  models.difficulty.findByPk(req.params.difficulty_id)
  .then(difficulty => {
    if (difficulty) {
      res.json({
        success: 'ok',
        problem_id: difficulty.problem_id,
        member_id: difficulty.member_id,
        difficulty: difficulty.difficulty,
        created: difficulty.created,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/difficulty/:difficulty_id', function(req, res, next) {
  models.difficulty.destroy({
    where: {
      difficulty_id: req.params.difficulty_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

module.exports = router;
