import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { orderId } = req.query
  try {
    if (!orderId) {
      return res.json({ message: '`orderId` required' })
    }
    if (typeof parseInt(orderId.toString()) !== 'number') {
      return res.status(400).json({ message: '`orderId` must be a number' })
    }
    const results = await query(
      `
      SELECT o.orderId AS orderId, cu.name AS customer, rb.name AS location, co.name AS courier, o.status AS status FROM Orders o
      JOIN Customers cu ON cu.customerId = o.customer
      JOIN RestaurantLocations rl ON rl.locationId = o.location
      JOIN RestaurantBrands rb ON rb.brandId = rl.brand
      LEFT JOIN Couriers co ON co.courierId = o.courier
      WHERE o.orderId = (?)
    `,
      orderId
    )
    const order = results?.[0] || results
    return res.json(order)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { customerId, locationId } = req.query
    const results = {
        orderId: 322,
        customer: 9999,
        location: 34,
        courier: 666,
        status: 'working',
    }
    return res.json(results);
}

export default handler
