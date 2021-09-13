import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { orderId, status } = req.body
  const { courier } = req.body || {}
  try {
    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: '`orderId` and `status` are both required' })
    }
    if (req.body.hasOwnProperty('courier')) {
        const results = await query(
            `
                UPDATE Orders
                SET status = ?, courier = ?
                WHERE orderId = ?
            `,
            [status, courier, orderId]
        )
        return res.json(results)
    } else {
        const results = await query(
            `
                UPDATE Orders
                SET status = ?
                WHERE orderId = ?
            `,
            [status, orderId]
        )
        return res.json(results)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    return res.json(true)
}

export default handler
