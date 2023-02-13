import { NextApiHandler } from 'next';

const postsDetailHandler: NextApiHandler = async (req, res) => {
  res.json({
    id: req.query.id,
    name: `文章${req.query.id}`,
    content: `
      <p>this is a content with id: ${req.query.id}</p>
    `
  })
}

export default postsDetailHandler