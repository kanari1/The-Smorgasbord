import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { order, menuItem, quantity } = req.body
  try {
    if (!order || !menuItem || !quantity) {
      return res
        .status(400)
        .json({ message: '`order`, `menuItem`, and `quantity` are all required' })
    }

    const results = await query(
      'INSERT INTO LineItems (`order`, menuItem, quantity) VALUES (?, ?, ?)',
      [order, menuItem, quantity]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    return res.json(true)
}

export default handler
