const myJSONnew = ('./resources/user-parsed.json')
const fs = require('fs-extra')

try {
    fs.unlinkSync(myJSONnew)
    //file removed
} catch (err) {
    console.error(err)
}