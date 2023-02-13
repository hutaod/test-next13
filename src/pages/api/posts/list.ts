import { NextApiHandler } from 'next';

const postsListHandler: NextApiHandler = async (req, res) => {
  res.json([{ id: "1", name: "文章1" }, { id: "2", name: "文章2" }])
}

export default postsListHandler