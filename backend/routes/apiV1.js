var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');

router.post('/members', function(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  models.member.create(req.body, {
    fields: ['username', 'nickname', 'email', 'password'],
  })
  .then(() => res.status(201).end())
  .catch(() => res.status(400).end());
});

router.get('/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({
      member_id: req.user.member_id,
      username: req.user.username,
      nickname: req.user.nickname,
      email: req.user.email,
      created: req.user.created,
      is_admin: Boolean(req.user.is_admin),
      is_prime: Boolean(req.user.is_prime),
    });
  } else {
    res.status(401).end();
  }
});

router.put('/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.member.update(req.body, {
      fields: ['nickname', 'password'],
      where: {
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/members/:member_id', function(req, res, next) {
  models.member.findByPk(req.params.member_id, {
    attributes: ['member_id', 'username', 'nickname', 'email', 'created',
      'is_admin', 'is_prime'],
  })
  .then(member => {
    if (member) {
      member.is_admin = Boolean(member.is_admin);
      member.is_prime = Boolean(member.is_prime);
      res.json(member);
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.post('/classes', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.class.create(req.body, {
      fields: ['name', 'description'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/classes', function(req, res, next) {
  models.class.findAll()
  .then(classes => {
    for (let i in classes) {
      classes[i].is_default = Boolean(classes[i].is_default);
      classes[i].is_admin = Boolean(classes[i].is_admin);
      classes[i].is_prime = Boolean(classes[i].is_prime);
    }
    res.json({
      results: classes,
    });
  })
  .catch(() => res.status(400).end());
});

router.put('/classes/:class_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.class_member.count({
      where: {
        class_id: req.params.class_id,
        member_id: req.user.member_id,
      },
    })
    .then(count => {
      if (count >= 1) {
        models.class.update(req.body, {
          fields: ['description'],
          where: {
            class_id: req.params.class_id,
          },
        })
        .then(() => res.end())
        .catch(() => res.status(400).end());
      } else {
        res.status(401).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/classes/:class_id/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.class_member.create({
      class_id: req.params.class_id,
      member_id: req.user.member_id,
    }, {
      fields: ['class_id', 'member_id'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/classes/:class_id/members', function(req, res, next) {
  models.class_member.findAll({
    attributes: ['class_member_id', 'class_id', 'member_id', 'created'],
    where: {
      class_id: req.params.class_id,
    },
  })
  .then(class_members => {
    res.json({
      results: class_members,
    });
  })
  .catch(() => res.status(400).end());
});

router.post('/problems', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.problem.create(req.body, {
      fields: ['category_id', 'title', 'content', 'time_limit', 'reference', 'hint'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/problems', function(req, res, next) {
  const page = Number(req.query.page) - 1 || 0;
  const per_page = Number(req.query.per_page) || 10;
  const order = req.query.order || 'created';
  const direction = req.query.direction || 'DESC';

  models.problem.findAndCountAll({
    order: [[order, direction]],
    attributes: ['problem_id', 'category_id', 'member_id',
      'title', 'time_limit', 'reference', 'hint', 'created'],
    offset: page,
    limit: per_page,
  })
  .then(problems => {
    res.json({
      results: problems.rows,
      total_count: problems.count,
    });
  })
  .catch(() => res.status(400).end());
});

router.get('/problems/categories', function(req, res, next) {
  models.problem_category.findAll({
    attributes: ['category_id', 'parent_id', 'name', 'description'],
  })
  .then(categories => {
    res.json({
      results: categories,
    });
  })
  .catch(() => res.status(400).end());
});

router.get('/problems/:problem_id', function(req, res, next) {
  models.problem.findByPk(req.params.problem_id, {
    attributes: ['problem_id', 'category_id', 'member_id',
      'title', 'time_limit', 'created'],
  })
  .then(problem => {
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.put('/problems/:problem_id', function(req, res, next) {
  if (req.isAuthenticated() && req.user.member_id == req.params.problem_id) {
    models.problem.update(req.body, {
      fields: ['category_id', 'title', 'content', 'time_limit', 'reference', 'hint'],
      where: {
        problem_id: req.params.problem_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/problems/:problem_id', function(req, res, next) {
  if (req.isAuthenticated() && req.user.member_id == req.params.problem_id) {
    models.problem.destroy({
      where: {
        problem_id: req.params.problem_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/answers', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.answer.create(req.body, {
      fields: ['problem_id', 'content', 'reference'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/answers', function(req, res, next) {
  const page = Number(req.query.page) - 1 || 0;
  const per_page = Number(req.query.per_page) || 5;
  const order = req.query.order || 'created';
  const direction = req.query.direction || 'DESC';

  models.answer.findAndCountAll({
    order: [[order, direction]],
    attributes: ['answer_id', 'problem_id', 'member_id',
      'content', 'reference', 'created'],
    offset: page,
    limit: per_page,
  })
  .then(answers => {
    res.json({
      results: answers.rows,
      total_count: answers.count,
    });
  })
  .catch(() => res.status(400).end());
});

router.put('/answers/:answer_id', function(req, res, next) {
  if (req.isAuthenticated() && req.user.member_id == req.params.answer_id) {
    models.answer.update(req.body, {
      fields: ['content', 'reference'],
      where: {
        answer_id: req.params.answer_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/answers/:answer_id', function(req, res, next) {
  if (req.isAuthenticated() && req.user.member_id == req.params.answer_id) {
    models.answer.destroy({
      where: {
        answer_id: req.params.answer_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/solve', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.solve.create(req.body, {
      fields: ['problem_id', 'content', 'duration'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/solve', function(req, res, next) {
  models.solve.findAll({
    attributes: ['solve_id', 'problem_id', 'member_id', 'content', 'date', 'duration'],
  })
  .then(solve => {
    res.json({
      success: 'ok',
      solve: solve,
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
  .then(solve => {
    res.json({
      success: 'ok',
      solve: solve,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/comments', function(req, res, next) {
  models.comment.create(req.body, {
    fields: ['parent_id', 'member_id', 'problem_id', 'answer_id', 'document_id', 'content'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/comments/:comment_id', function(req, res, next) {
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

router.put('/comments/:comment_id', function(req, res, next) {
  models.comment.update(req.body, {
    fields: ['content', 'reference'],
    where: {
      comment_id: req.params.comment_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.delete('/comments/:comment_id', function(req, res, next) {
  models.comment.destroy({
    where: {
      comment_id: req.params.comment_id,
    },
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/votes', function(req, res, next) {
  models.vote.create(req.body, {
    fields: ['member_id', 'problem_id', 'answer_id', 'document_id', 'comment_id', 'type'],
  })
  .then(() => res.json({ success: 'ok' }))
  .catch(() => res.json({ success: 'fail' }));
});

router.get('/votes/:vote_id', function(req, res, next) {
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

router.delete('/votes/:vote_id', function(req, res, next) {
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
