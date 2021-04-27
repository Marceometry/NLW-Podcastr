import { episodes } from '../episodes'

export default function FindProjects(req, res) {
  res.status(200).json(episodes)
}