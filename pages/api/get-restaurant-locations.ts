import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { brand } = req.query
    try {
        if (brand) {
            if (typeof parseInt(brand.toString()) !== 'number') {
                return res.status(400).json({ message: '`brand` must be a number' })
            }
            const results = await query(
                `
                    SELECT rl.locationId AS locationId, rl.brand AS brandId, rb.name AS name, rb.logo AS logo,
                           rl.openTime AS openTime, rl.closeTime AS closeTime, rl.address AS address
                    FROM RestaurantLocations rl
                    JOIN RestaurantBrands rb on rl.brand = rb.brandId
                    WHERE brandId = ?
                    ORDER BY rl.locationId DESC
                `,
                brand
            )
            return res.json(results)
        } else {
            const results = await query(
                `
                    SELECT rl.locationId AS locationId, rl.brand AS brandId, rb.name AS name, rb.logo AS logo,
                           rl.openTime AS openTime, rl.closeTime AS closeTime, rl.address AS address
                    FROM RestaurantLocations rl
                    JOIN RestaurantBrands rb on rl.brand = rb.brandId
                    ORDER BY rl.locationId DESC
                `
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { name } = req.query
    const results = [
        {
            locationId: 7777,
            brandId: 23,
            openTime: 9,
            closeTime: 20,
            address: '1322 Plaza Drive',
        },
    ]
    return res.json(results);
}

export default handler
