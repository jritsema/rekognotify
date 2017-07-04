const nodemailer = require('nodemailer')

//read bits from stdin
let labelsString = ''
process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
  let chunk = process.stdin.read()
  if (chunk !== null) labelsString += chunk
})
process.stdin.on('end', work)

function work() {
  //parse labels json
  let labels
  try {
    labels = JSON.parse(labelsString)
  } catch (e) {
    console.error(e)
  }

  let match = true
  const rawMatchList = process.env.REKOGNOTIFY_MATCH
  if (rawMatchList && rawMatchList.length > 0) {
    const matchList = rawMatchList.split(',')
    if (matchList && matchList.length > 0)
      match = labelsMatch(labels, matchList)
  }

  //proceed to email if there's a match
  if (match) {
    //path to image to be emailed is passed as a cli arg
    const imageFile = process.argv[2]
    if (!imageFile) {
      console.error('missing image file argument')
      process.exit(1)
    }

    //format labels as CSV
    labelList = []
    labels.Labels.forEach(l => labelList.push(l.Name))
    const labelsCsv = labelList.join(', ')

    //now finally send the email
    sendEmail(labelsCsv, imageFile)
  }
}

function labelsMatch(labels, matchList) {
  for (label of matchList) {
    if (labels.Labels.find(l => l.Name === label)) {
      return true
    }
  }
  return false
}

function sendEmail(body, file) {
  const transporter = nodemailer.createTransport({
    host: process.env.REKOGNOTIFY_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.REKOGNOTIFY_USER,
      pass: process.env.REKOGNOTIFY_PASS
    }
  })

  const mailOptions = {
    from: process.env.REKOGNOTIFY_SENDER_ADDRESS,
    to: process.env.REKOGNOTIFY_RECEIVER_ADDRESS,
    text: body,
    attachments: [
      {
        filename: 'file1',
        path: file
      }
    ]
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error)
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
}

module.exports = labelsMatch
