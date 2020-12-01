var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var models = require('../models');
var Op = models.Sequelize.Op

router.post('/members', function(req, res, next) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  models.member.create(req.body, {
    fields: ['username', 'nickname', 'email', 'password'],
  })
  .then(() => res.status(201).end())
  .catch(error => {
    if (error instanceof models.Sequelize.UniqueConstraintError) {
      res.status(409).end();
    } else {
      res.status(400).end();
    }
  });
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
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    models.member.update(req.body, {
      fields: ['nickname', 'password'],
      where: { member_id: req.user.member_id },
    })
    .then(() => res.end())
    .catch(error => {
      if (error instanceof models.Sequelize.UniqueConstraintError) {
        res.status(409).end();
      } else {
        res.status(400).end();
      }
    });
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

router.get('/members-check', function(req, res, next) {
  models.member.count({
    where: {
      [Op.or]: [
        { username: req.query.username || null },
        { nickname: req.query.nickname || null },
        { email: req.query.email || null },
      ],
    },
  })
  .then(count => {
    if (count) {
      res.status(409).end();
    } else {
      res.end();
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
    .catch(error => {
      if (error instanceof models.Sequelize.UniqueConstraintError) {
        res.status(409).end();
      } else {
        res.status(400).end();
      }
    });
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
    models.class.count({
      where: { class_id: req.params.class_id },
    })
    .then(count => {
      if (count) {
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
              where: { class_id: req.params.class_id },
            })
            .then(() => res.end())
            .catch(() => res.status(400).end());
          } else {
            res.status(401).end();
          }
        })
        .catch(() => res.status(400).end());
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/classes/:class_id/members', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.class.count({
      where: { class_id: req.params.class_id },
    })
    .then(count => {
      if (count) {
        models.class_member.create({
          class_id: req.params.class_id,
          member_id: req.user.member_id,
        }, {
          fields: ['class_id', 'member_id'],
        })
        .then(() => res.status(201).end())
        .catch(error => {
          if (error instanceof models.Sequelize.UniqueConstraintError) {
            res.status(409).end();
          } else {
            res.status(400).end();
          }
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/classes/:class_id/members', function(req, res, next) {
  models.class.count({
    where: { class_id: req.params.class_id },
  })
  .then(count => {
    if (count) {
      models.class_member.findAll({
        attributes: ['class_member_id', 'class_id', 'member_id', 'created'],
        where: { class_id: req.params.class_id },
      })
      .then(class_members => {
        res.json({ results: class_members });
      })
      .catch(() => res.status(400).end());
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.post('/problems', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.problem_category.count({
      where: { category_id: req.body.category_id },
    })
    .then(count => {
      if (count) {
        req.body.member_id = req.user.member_id;
        models.problem.create(req.body, {
          fields: ['category_id', 'member_id', 'title', 'content',
            'time_limit', 'reference', 'hint'],
        })
        .then(() => res.status(201).end())
        .catch(() => res.status(400).end());
      } else {
        res.status(404).end();
      }
    })
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
  let where = {};

  if (req.query.category_id) {
    where.category_id = req.query.category_id;
  }
  if (req.query.title) {
    where.title = { [Op.like]: '%' + req.query.title + '%' };
  }
  if (req.query.content) {
    where.content = { [Op.like]: '%' + req.query.content + '%' };
  }
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.like]: '%' + req.query.search + '%' } },
      { content: { [Op.like]: '%' + req.query.search + '%' } },
      { reference: { [Op.like]: '%' + req.query.search + '%' } },
      { hint: { [Op.like]: '%' + req.query.search + '%' } },
    ];
  }

  models.problem.findAndCountAll({
    order: [[order, direction]],
    attributes: ['problem_id', 'category_id', 'member_id',
      'title', 'time_limit', 'created'],
    where: where,
    offset: page * per_page,
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
      'title', 'content', 'time_limit', 'reference', 'hint', 'created'],
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
  if (req.isAuthenticated()) {
    models.problem.findOne({
      where: { problem_id: req.params.problem_id },
    })
    .then(problem => {
      if (problem) {
        if (problem.member_id === req.user.member_id) {
          models.problem.update(req.body, {
            fields: ['category_id', 'title', 'content', 'time_limit', 'reference', 'hint'],
            where: {
              problem_id: req.params.problem_id,
              member_id: req.user.member_id,
            },
          })
          .then(() => res.end())
          .catch(() => res.status(400).end());
        } else {
          res.status(401).end();
        }
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/problems/:problem_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.problem.findOne({
      where: { problem_id: req.params.problem_id },
    })
    .then(problem => {
      if (problem) {
        if (problem.member_id === req.user.member_id) {
          models.problem.destroy({
            where: {
              problem_id: req.params.problem_id,
              member_id: req.user.member_id,
            },
          })
          .then(() => res.end())
          .catch(() => res.status(400).end());
        } else {
          res.status(401).end();
        }
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/answers', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.problem.count({
      where: { problem_id: req.body.problem_id },
    })
    .then(count => {
      if (count) {
        req.body.member_id = req.user.member_id;
        models.answer.create(req.body, {
          fields: ['problem_id', 'member_id', 'content', 'reference'],
        })
        .then(() => res.status(201).end())
        .catch(() => res.status(400).end());
      } else {
        res.status(404).end();
      }
    })
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

  models.problem.count({
    where: { problem_id: req.query.problem_id },
  })
  .then(count => {
    if (count) {
      models.answer.findAndCountAll({
        order: [[order, direction]],
        attributes: ['answer_id', 'problem_id', 'member_id',
          'content', 'reference', 'created'],
        where: { problem_id: req.query.problem_id },
        offset: page * per_page,
        limit: per_page,
      })
      .then(answers => {
        res.json({
          results: answers.rows,
          total_count: answers.count,
        });
      })
      .catch(() => res.status(400).end());
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.put('/answers/:answer_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.answer.findOne({
      where: { answer_id: req.params.answer_id },
    })
    .then(answer => {
      if (answer) {
        if (answer.member_id === req.user.member_id) {
          models.answer.update(req.body, {
            fields: ['content', 'reference'],
            where: {
              answer_id: req.params.answer_id,
              member_id: req.user.member_id,
            },
          })
          .then(() => res.end())
          .catch(() => res.status(400).end());
        } else {
          res.status(401).end();
        }
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/answers/:answer_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.answer.findOne({
      where: { answer_id: req.params.answer_id },
    })
    .then(answer => {
      if (answer) {
        if (answer.member_id === req.user.member_id) {
          models.answer.destroy({
            where: {
              answer_id: req.params.answer_id,
              member_id: req.user.member_id,
            },
          })
          .then(() => res.end())
          .catch(() => res.status(400).end());
        } else {
          res.status(401).end();
        }
      } else {
        res.status(404).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/solve', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.solve.create(req.body, {
      fields: ['problem_id', 'member_id', 'content', 'duration'],
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

router.get('/solve/members/:member_id', function(req, res, next) {
  models.solve.findAll({
    attributes: ['solve_id', 'problem_id', 'content', 'duration', 'created'],
    where: { member_id: req.params.member_id },
  })
  .then(solve => {
    res.json({
      success: 'ok',
      solve: solve,
    });
  })
  .catch(() => res.json({ success: 'fail' }));
});

router.post('/difficulty', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.difficulty.create(req.body, {
      fields: ['member_id', 'problem_id', 'score', 'description'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/difficulty', function(req, res, next) {
  const page = Number(req.query.page) - 1 || 0;
  const per_page = Number(req.query.per_page) || 5;
  const order = req.query.order || 'created';
  const direction = req.query.direction || 'DESC';

  models.difficulty.findAndCountAll({
    order: [[order, direction]],
    where: { problem_id: req.query.problem_id },
    offset: page * per_page,
    limit: per_page,
  })
  .then(difficulty => {
    if (difficulty) {
      models.difficulty.findOne({
        attributes: [[models.sequelize.fn('AVG', models.sequelize.col('score')), 'score']],
        where: { problem_id: req.query.problem_id },
      })
      .then(avg => res.json({
        results: difficulty.rows,
        average: avg.score,
        total_count: difficulty.count,
      }))
      .catch(() => res.status(400).end())
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.put('/difficulty', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.answer.update(req.body, {
      fields: ['score', 'description'],
      where: {
        member_id: req.user.member_id,
        problem_id: req.body.problem_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/votes', function(req, res, next) {
  req.query.type = 'u';
  models.vote.count({
    where: req.query,
  })
  .then(up_count => {
    req.query.type = 'd';
    models.vote.count({
      where: req.query,
    })
    .then(down_count => res.json({ u: up_count, d: down_count }))
    .catch(() => res.status(400).end());
  })
  .catch(() => res.status(400).end());
});

router.put('/votes', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.body.member_id = req.user.member_id;
    const where = Object.assign({}, req.body);
    delete where.type;

    models.vote.findOrCreate({
      where: where,
      defaults: req.body,
    })
    .then(vote => {
      if (!vote[1]) {
        vote[0].type = req.body.type;
        vote[0].save()
        .then(() => res.end())
        .catch(() => res.status(400).end());
      } else {
        res.status(201).end();
      }
    })
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/boards', function(req, res, next) {
  models.board.findAll({
    attributes: ['board_id', 'name', 'description'],
  })
  .then(boards => {
    res.json({ results: boards });
  })
  .catch(() => res.status(400).end());
});

router.get('/boards/:board_id/categories', function(req, res, next) {
  models.document_category.findAll({
    where: { board_id: req.params.board_id },
    attributes: ['category_id', 'parent_id', 'board_id', 'name', 'description'],
  })
  .then(categories => {
    res.json({ results: categories });
  })
  .catch(() => res.status(400).end());
});

router.post('/documents', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.body.member_id = req.user.member_id;
    models.document.create(req.body, {
      fields: ['board_id', 'category_id', 'member_id',
        'title', 'content', 'reference'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/documents', function(req, res, next) {
  const page = Number(req.query.page) - 1 || 0;
  const per_page = Number(req.query.per_page) || 10;
  const order = req.query.order || 'created';
  const direction = req.query.direction || 'DESC';
  let where = {};

  if (req.query.board_id) {
    where.board_id = req.query.board_id;
    if (req.query.category_id) {
      where.category_id = req.query.category_id;
    }
  }
  if (req.query.title) {
    where.title = { [Op.like]: '%' + req.query.title + '%' };
  }
  if (req.query.content) {
    where.content = { [Op.like]: '%' + req.query.content + '%' };
  }
  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.like]: '%' + req.query.search + '%' } },
      { content: { [Op.like]: '%' + req.query.search + '%' } },
      { reference: { [Op.like]: '%' + req.query.search + '%' } },
    ];
  }

  models.document.findAndCountAll({
    order: [[order, direction]],
    attributes: ['document_id', 'board_id', 'category_id', 'member_id',
      'title', 'created'],
    where: where,
    offset: page * per_page,
    limit: per_page,
  })
  .then(documents => {
    res.json({
      results: documents.rows,
      total_count: documents.count,
    });
  })
  .catch(() => res.status(400).end());
});

router.get('/documents/:document_id', function(req, res, next) {
  models.document.findByPk(req.params.document_id, {
    attributes: ['document_id', 'board_id', 'category_id', 'member_id',
      'title', 'content', 'reference', 'created'],
  })
  .then(document => {
    if (document) {
      res.json(document);
    } else {
      res.status(404).end();
    }
  })
  .catch(() => res.status(400).end());
});

router.put('/documents/:document_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.document.update(req.body, {
      fields: ['category_id', 'title', 'content', 'reference'],
      where: {
        document_id: req.params.document_id,
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/documents/:document_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.document.destroy({
      where: {
        document_id: req.params.document_id,
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.post('/comments', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.body.member_id = req.user.member_id;
    models.comment.create(req.body, {
      fields: ['parent_id', 'member_id', 'problem_id', 'answer_id', 'document_id', 'content'],
    })
    .then(() => res.status(201).end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.get('/comments', function(req, res, next) {
  const page = Number(req.query.page) - 1 || 0;
  const per_page = Number(req.query.per_page) || 10;
  const order = req.query.order || 'created';
  const direction = req.query.direction || 'ASC';

  models.comment.findAndCountAll({
    order: [[order, direction]],
    attributes: ['comment_id', 'parent_id', 'member_id',
      'problem_id', 'answer_id', 'document_id', 'content', 'created'],
    where: req.query,
    offset: page * per_page,
    limit: per_page,
  })
  .then(comments => {
    res.json({
      results: comments.rows,
      total_count: comments.count,
    });
  })
  .catch(() => res.status(400).end());
});

router.put('/comments/:comment_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.comment.update(req.body, {
      fields: ['content'],
      where: {
        comment_id: req.params.comment_id,
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

router.delete('/comments/:comment_id', function(req, res, next) {
  if (req.isAuthenticated()) {
    models.comment.destroy({
      where: {
        comment_id: req.params.comment_id,
        member_id: req.user.member_id,
      },
    })
    .then(() => res.end())
    .catch(() => res.status(400).end());
  } else {
    res.status(401).end();
  }
});

module.exports = router;
