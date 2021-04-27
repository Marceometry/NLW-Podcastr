import { NextApiRequest, NextApiResponse } from "next";
import { episodes } from '../episodes'

export default function FindProject(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    const episode = episodes.find(episode => episode.id === id)

    if (episode) {
        res.status(200).json(episode)
    } else {
        res.status(404).json({ error: "page not found" })
    }
}