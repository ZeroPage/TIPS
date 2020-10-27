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
    fields: ['category_id', 'member_id', 'title', 'content',
      'time_limit', 'reference'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/problem', function(req, res, next) {
  models.problem.findAll({
    attributes: ['problem_id', 'category_id', 'member_id', 'title', 'created',
      'vote', 'difficulty']
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
        created: problem.created,
        reference: problem.reference,
        vote: problem.vote,
        difficulty: problem.difficulty
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
    attributes: ['solve_id', 'problem_id', 'member_id', 'content',
      'date', 'duration'],
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
        date: solve.date,
        duration: solve.duration,
      });
    } else {
      res.json({ success: 'fail' });
    }
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/solve/member/:member_id', function(req, res, next) {
  models.solve.findAll({
    attributes: ['solve_id', 'problem_id', 'content', 'date', 'duration'],
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

module.exports = router;
