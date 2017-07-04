### rekognotify

A CLI tool that emails an image if it contains a specific Rekognition label.  The tool takes a set of image recognition labels via stdin, a set of labels to match on specified via an environment variable, and an image to send in case of a match specified via cli arg.  Email settings are also specified via environment variables.

#### usage
```
npm install -g https://github.com/jritsema/rekognotify.git
```
```
export REKOGNOTIFY_MATCH='Human,People,Person,Animal,Mammal'
export REKOGNOTIFY_HOST=smtp.server.net
export REKOGNOTIFY_USER=user@server.net
export REKOGNOTIFY_PASS=xyz
export REKOGNOTIFY_SENDER_ADDRESS='User <user@server.net>'
export REKOGNOTIFY_RECEIVER_ADDRESS=user2@server.net

rekognize foo.jpg | rekognotify foo.jpg
```
