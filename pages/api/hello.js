// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectMongoose from "@/dadbase/conn"

export default function handler(req, res) {
  connectMongoose()
  res.status(200).json({ name: 'John Doe' })
}
