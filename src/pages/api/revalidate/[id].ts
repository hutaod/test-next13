import { NextApiHandler } from 'next';

const MY_SECRET_TOKEN = "MY_SECRET_TOKEN";

const revalidateHandler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  // 指令密钥校验
  if (req.query.secret !== MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // 更新 demo3
    await res.revalidate(`/isr/demo3/${id}`)
    // 返回说明更新指令已发出，并不能说明一定更新成功
    return res.json({ revalidated: true })
  } catch (err) {
    // 更新失败
    return res.status(500).send('Error revalidating')
  }
}

export default revalidateHandler